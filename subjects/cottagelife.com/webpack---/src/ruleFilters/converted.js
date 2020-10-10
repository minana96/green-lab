// @flow
import { getConversionCount } from 'visitorDataHelpers';

import type { ActivationRule, VisitorData } from 'types';

export default function convertedFilter(visitorData: VisitorData, rule: ActivationRule) {
  // always show the convertable if the trigger type is click
  if (rule.trigger.name === 'click') {
    return true;
  }

  return getConversionCount(visitorData) === 0;
}
