// @flow
import cookie from 'cookie';

import type {ActivationRule} from 'types';

export default (
  cookieString: string = '',
  activationRule: ActivationRule
) => {
  const {enabled, rules} = activationRule.cookieTargets;
  const rule = rules[0];

  if (!enabled || !rule) {
    return true;
  }

  const cookieIsPresent = !!cookie.parse(cookieString)[rule.name];

  switch (rule.visibility) {
    case 'show':
      return cookieIsPresent || rule.name === '';

    case 'hide':
      return !cookieIsPresent;

    default:
      return false;
  }
};
