// @flow
import type { ActivationRule, GeoData, GeoTargetWithCity } from 'types';


const isShowRule = rule => Boolean(rule && rule.visibility === 'show');
const isRegionCode = codeString => /^([A-Z]|\d){1,3}$/.test(codeString);

const isMatch = (rule: Object, geoData, properties) => // eslint-disable-line flowtype/no-weak-types
  properties.every(property =>
    typeof rule[property] === 'string' &&
    typeof geoData[property] === 'string' &&
    rule[property].toLowerCase() === geoData[property].toLowerCase()
  );

const isCityMatch = (rule: GeoTargetWithCity, geoData) => {
  if (!isMatch(rule, geoData, ['countryCode'])) { return false; }

  const {latitude, longitude} = geoData;

  // Fastly sometimes returns a sub-city location (eg: borough), so we need to check coords/bounds
  if (rule.bounds && latitude && longitude) {
    const latMatch = latitude <= rule.bounds.north && latitude >= rule.bounds.south;
    const lngMatch = longitude <= rule.bounds.east && longitude >= rule.bounds.west;

    if (latMatch && lngMatch) { return true; }
  }

  let ruleCityRegex;
  let dataCityRegex;

  try {
    ruleCityRegex = new RegExp(`^${rule.city}\\b`, 'i');
    dataCityRegex = new RegExp(`^${geoData.city}\\b`, 'i');
  } catch (err) {
    return false; // One of the values produced an invalid regex, eg: Fastly gave '?' as the city
  }

  const gotRegionCodes = rule.regionCode && isRegionCode(geoData.regionCode);
  // The UI may generate rules without region codes if it can't resolve them
  const regionMatch = !gotRegionCodes || isMatch(rule, geoData, ['regionCode']);

  const nameMatch = ruleCityRegex.test(geoData.city) || dataCityRegex.test(rule.city);
  // Let "frankfurt am main" match "Frankfurt"

  return regionMatch && nameMatch;
};

const matchesVisitorLocation = geoData => rule => {
  if (rule.city) {
    return isCityMatch(rule, geoData);
  }

  if (rule.regionCode) {
    return isMatch(rule, geoData, ['regionCode', 'countryCode']);
  }

  if (rule.countryCode) {
    return isMatch(rule, geoData, ['countryCode']);
  }

  if (rule.continentCode) {
    return isMatch(rule, geoData, ['continentCode']);
  }

  return false;
};

const getSpecificity = rule => {
  if (rule.city) { return 4; }
  if (rule.regionCode) { return 3; }
  if (rule.countryCode) { return 2; }
  if (rule.continentCode) { return 1; }
  return 0;
};

export default function geoFilter(geoData: ?GeoData, activationRule: ActivationRule) {
  const {enabled, rules} = activationRule.geoTargets;

  if (!geoData || !enabled || rules.length === 0) {
    return true;
  }

  const showRules = rules.filter(isShowRule);
  const matchingRules = rules.filter(matchesVisitorLocation(geoData));

  // If there are no show rules, we add an implicit 'show everywhere' rule, with specificity 0.
  if (showRules.length === 0) {
    matchingRules.push({ visibility: 'show', continentCode: '', displayName: '' });
  }

  const ruleWithMaxSpecificity = matchingRules.reduce((currentMax, rule) => (
    !currentMax || getSpecificity(rule) > getSpecificity(currentMax) ? rule : currentMax
  ), null);

  return isShowRule(ruleWithMaxSpecificity);
}
