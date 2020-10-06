// @flow
import { getHostPageVisitCount, getEmbeddableVisitCount } from 'visitorDataHelpers';

import type { ActivationRule, FrequencyParameter, VisitorData } from 'types';

// *All* frequency parameters must match for visitorFrequencyMatch to return true

export function isFrequencyMatch(
  params: [FrequencyParameter],
  hostPageVisitCount: number,
  embeddableViewCount: number,
): boolean {
  return params
    .map(param => {
      const value = parseInt(param.value, 10);

      switch (param.name) {
        case 'visitCount':
          return hostPageVisitCount === value;

        case 'visitCountAbove':
          return hostPageVisitCount > value;

        case 'visitFrequency':
          return hostPageVisitCount % value === 0 || value < 1;

        case 'viewCountBelow':
          return embeddableViewCount < value;

        default:
          return false;
      }
    })
    .filter(match => match === false)
    .length === 0;
}

export default function frequencyFilter(visitorData: VisitorData, rule: $Shape<ActivationRule>) {
  // always show the convertable if the trigger type is click
  if (rule.trigger.name === 'click') {
    return true;
  }

  const hostPageVisitCount = getHostPageVisitCount(visitorData) + 1;
  const embeddableViewCount = getEmbeddableVisitCount(visitorData);

  return isFrequencyMatch(rule.frequency.parameters, hostPageVisitCount, embeddableViewCount);
}
