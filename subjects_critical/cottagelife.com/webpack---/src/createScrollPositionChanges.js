// @flow
import { concat, of } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

import { scroll$ } from 'domEvents';
import { getScrollPosition } from 'screen';
import actions from 'actions';

export function createCurrentScrollPosition() {
  return of(
    actions.setScrollPosition({
      fromScrollEvent: false,
      scrollPosition: getScrollPosition(),
    }),
  );
}

export function createScrollPositionChanges() {
  return concat(
    createCurrentScrollPosition(),
    scroll$.pipe(
      throttleTime(200),
      map(() =>
        actions.setScrollPosition({
          fromScrollEvent: true,
          scrollPosition: getScrollPosition(),
        }),
      ),
    ),
  );
}
