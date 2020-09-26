// @flow
import urlFilter from 'ruleFilters/url';
import referrerFilter from 'ruleFilters/referrer';
import convertedFilter from 'ruleFilters/converted';
import frequencyFilter from 'ruleFilters/frequency';
import geoFilter from 'ruleFilters/geo';
import uniqueFilter from 'ruleFilters/unique';
import dimensionsFilter from 'ruleFilters/dimensions';
import schedulingFilter from 'ruleFilters/scheduling';
import * as embeddableHelpers from 'embeddableHelpers';

import type { Device, Embeddable, EmbeddableDisplayType, GeoData } from 'types';

type Args = {|
  device: Device,
  embeddable: Embeddable,
  geoData: ?GeoData,
  locationHref: string,
  precedingEmbeddables: Embeddable[],
  referrer: string,
  timestamp: number,
  visibleEmbIds: {[EmbeddableDisplayType]: ?string},
|};

export default function resolveStatus(args: Args) {
  const {
    device,
    embeddable,
    geoData,
    locationHref,
    precedingEmbeddables,
    referrer,
    timestamp,
  } = args;

  const { activationRule } = embeddable;

  if (!urlFilter(locationHref)(activationRule)) {
    return {
      status: 'cancelled',
      logVisit: false,
      disqualifier: 'URL targeting',
    };
  }

  if (!dimensionsFilter(device, embeddable)) {
    return {
      status: 'cancelled',
      logVisit: false,
      disqualifier: 'dimensions',
    };
  }

  if (!geoFilter(geoData, activationRule)) {
    return {
      status: 'cancelled',
      logVisit: false,
      disqualifier: 'geo targeting',
    };
  }

  if (!referrerFilter(referrer)(activationRule)) {
    return {
      status: 'cancelled',
      logVisit: false,
      disqualifier: 'referrer targeting',
    };
  }

  if (embeddable.closedAt > 0 && !embeddableHelpers.canBeShownMultipleTimes(embeddable)) {
    return {
      status: 'cancelled',
      logVisit: false,
      disqualifier: 'previously shown',
    };
  }

  if (!convertedFilter(embeddable.visitorData, activationRule)) {
    return {
      status: 'cancelled',
      // This rule's Convertable won't be shown again, so there's no need to continue logging visits
      logVisit: false,
      disqualifier: 'already converted',
    };
  }

  if (!schedulingFilter(timestamp, activationRule)) {
    return {
      status: 'cancelled',
      logVisit: true,
      disqualifier: 'scheduling',
    };
  }

  if (!frequencyFilter(embeddable.visitorData, activationRule)) {
    return {
      status: 'cancelled',
      logVisit: true,
      disqualifier: 'frequency',
    };
  }

  // resolveStatus is called for each rule in order of last publish date (newer to older). So this
  // filters out rules with repeated combinations of display type and trigger, preferring rules
  // that are more newly-published.
  if (!uniqueFilter(precedingEmbeddables, embeddable)) {
    return {
      status: 'cancelled',
      logVisit: true,
      disqualifier: 'uniqueness',
    };
  }

  return {
    status: embeddable.status === 'cancelled' ? 'preloading' : embeddable.status,
    logVisit: true,
    disqualifier: null,
  };
}
