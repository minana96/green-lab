// @flow
import { timer, type Observable } from 'rxjs';
import { startWith, switchMapTo, mapTo } from 'rxjs/operators';

import { hrefChange$ } from 'domEvents';

import type {TriggerParameterValue} from 'types';

export default (delaySecsString: TriggerParameterValue): Observable<true> => {
  const delaySecs = parseInt(delaySecsString, 10);

  return hrefChange$.pipe(
    mapTo(true),
    startWith(true),
    switchMapTo(timer(delaySecs * 1000)),
    mapTo(true)
  );
};
