// @flow
import { throwError, type Observable } from 'rxjs';

import clickTrigger from 'triggers/click';
import delayTrigger from 'triggers/delay';
import exitTrigger from 'triggers/exit';
import scrollTrigger from 'triggers/scroll';
import scrollUpTrigger from 'triggers/scroll-up';

import type { ActivationRule, State } from 'types';

export default function ruleToTrigger(rule: ActivationRule, state: State): Observable<true> {
  const param = rule.trigger.parameters[0];

  switch (param.name) {
    case 'topMargin':
      return exitTrigger(param.value);

    case 'delay':
      return delayTrigger(param.value);

    case 'scrollPercent':
      return scrollTrigger(param.value);

    case 'scrollUp':
      return scrollUpTrigger();

    case 'clickClass':
      return clickTrigger(`.${param.value}`, state.device.isIOS);

    case 'clickId':
      return clickTrigger(`#${param.value}`, state.device.isIOS);

    case 'clickSelector':
      return clickTrigger(param.value, state.device.isIOS);

    default:
      return throwError(new Error('Unknown trigger type'));
  }
}
