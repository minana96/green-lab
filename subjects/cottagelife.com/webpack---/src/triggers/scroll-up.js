// @flow
import { throttleTime, map, pairwise, filter, mapTo, startWith } from 'rxjs/operators';

import { scroll$ } from 'domEvents';
import { getDocumentHeight, getScrollPosition, getViewport } from 'screen';

import type { Observable } from 'rxjs';

export default (): Observable<true> =>
  scroll$.pipe(
    throttleTime(50),
    map(getScrollPosition),
    startWith(getScrollPosition()),
    pairwise(),
    filter(([previous, current]) => current.top < previous.top),
    filter(([, current]) =>
      // Safari momentum scrolling allows the scroll position to temporarily be above the top or
      // below the bottom of the page – for example when the user scrolls to the bottom of the page,
      // the scroll continues past the bottom and then 'bounces' back up. We want to ensure this
      // bounce does not fire the trigger.
      current.top >= 0 && current.top + getViewport().height < getDocumentHeight()
    ),
    throttleTime(2000),
    mapTo(true)
  );
