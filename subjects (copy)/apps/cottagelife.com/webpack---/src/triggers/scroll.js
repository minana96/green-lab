// @flow
import { merge, type Observable } from 'rxjs';
import { throttleTime, filter, mapTo } from 'rxjs/operators';

import { resize$, scroll$ } from 'domEvents';
import { getDocumentHeight, getScrollPosition, getViewport } from 'screen';

import type { TriggerParameterValue } from 'types';

export default (scrollPercent: TriggerParameterValue): Observable<true> => {
  const scrollTrigger = parseInt(scrollPercent, 10);

  return merge(scroll$, resize$).pipe(
    throttleTime(100),
    filter(() => {
      // get current dimensions of the page
      const docHeight = getDocumentHeight();
      const winHeight = getViewport().height;

      // get the maximum amount that you can scroll
      const maxScroll = docHeight - winHeight;

      // get the amount of scrolled so far
      //   - at the top = 0
      //   - at the bottom = maxScroll
      const scrollTop = getScrollPosition().top;

      // get the ratio of the current scroll position relative to the max
      const scrollRatio = scrollTop / maxScroll;

      // get the "total scroll" (in px) which is the total amount scrolled
      // plus a portion of the window height
      //   - at the top = 0
      //   - at the bottom = docHeight
      const totalScroll = scrollTop + scrollRatio * winHeight;

      // get the amount scroll (in px) that will cause the
      // embeddable to fire
      const triggerScroll = docHeight * scrollTrigger / 100;

      return totalScroll >= triggerScroll;
    }),
    throttleTime(2000),
    mapTo(true)
  );
};
