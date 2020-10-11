// @flow
import Url from 'url-parse';

import {
  trim,
  isPresent,
  startsWith,
  endsWith,
  some,
} from 'utils';

import type {ActivationRule, ReferrerRule, ReferrerType} from 'types';

// Rule order isn't yet settable in the UI, so we don't follow it here. Instead all the "hide" rules
// should be applied at a higher priority than all the "show" rules, so we need a list of each.
const sortRules = (rules: ReferrerRule[]) => {
  const emptyBins = {
    include: [],
    exclude: []
  };

  return rules.reduce((bins, rule) => {
    const bin = rule.visibility === 'hide' ? 'exclude' : 'include';

    return {
      ...bins,
      [bin]: [...bins[bin], {
        type: rule.type,
        value: rule.value,
      }]
    };
  }, emptyBins);
};

const getFuzzyMatchableUrlString = (url0: string, token: string): string => {
  const urlObj = new Url(url0);

  if (token.indexOf('?') === -1) { // consider query iff the token includes it
    urlObj.set('query', '');
  }

  if (token.indexOf('#') === -1) { // consider hash iff the token includes it
    urlObj.set('hash', '');
  }

  let urlString = urlObj.toString();

  if (token.indexOf('http') === -1) { // consider protocol iff the token includes it
    urlString = urlString.replace(/^https?:\/\//, '');
  }

  return urlString;
};

const urlMatcher = (fullUrl: string, type: ReferrerType, token0?: string = '') => {
  const token = trim(token0);

  if (type !== 'exact' && !isPresent(token)) return true;

  const fuzzyUrl = getFuzzyMatchableUrlString(fullUrl, token);

  switch (type) {
    case 'exact':
      return fuzzyUrl === token;

    case 'contains':
      return fullUrl.indexOf(token) !== -1;

    case 'startswith':
      return startsWith(fuzzyUrl, token);

    case 'endswith':
      return endsWith(fuzzyUrl, token);

    default:
      return false;
  }
};

const urlReferrerMatch = (url: string) => (activationRule: ActivationRule) => {
  const {referrerTargets} = activationRule;

  if (!referrerTargets.enabled) return true;

  const sortedRules = sortRules(referrerTargets.rules);
  const matcher = rule => urlMatcher(url, rule.type, rule.value);

  const negativeMatch = some(sortedRules.exclude, matcher);

  if (negativeMatch) {
    return false;
  }

  return some(sortedRules.include, matcher) || sortedRules.include.length === 0;
};

export default urlReferrerMatch;
