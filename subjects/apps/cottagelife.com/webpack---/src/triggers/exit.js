// @flow
import { timer, merge, type Observable } from 'rxjs';
import { filter, mapTo, mergeMapTo, scan, skip, takeUntil, throttleTime } from 'rxjs/operators';

import {mouseMove$, mouseEnter$, mouseLeave$, scroll$} from 'domEvents';
import type {TriggerParameterValue} from 'types';

const filterMouseLeaves = (event: MouseEvent): boolean => {
  // Chrome fires a mouseleave event when the user mouses over form autocomplete dropdowns, so we
  // filter out mouseleaves that occur more than [edgeBuffer]px from a window edge.

  if (!document.documentElement) { return false; }

  const edgeBuffer = 10;

  const { clientHeight, clientWidth } = document.documentElement;
  const { clientX, clientY } = event;

  return clientY < edgeBuffer || // top
    clientX > (clientWidth - edgeBuffer) || // right
    clientY > (clientHeight - edgeBuffer) || // bottom
    clientX < edgeBuffer; // left
};

const createDelayedMouseLeaveObs = (initialGracePeriodMs: number, delayMs: number) =>
  timer(initialGracePeriodMs).pipe(
    mergeMapTo(mouseLeave$),
    filter(filterMouseLeaves),
    mergeMapTo(
      timer(delayMs).pipe(
        takeUntil(
          merge(mouseEnter$, scroll$)
        )
      )
    )
  )

const createMouseMovesTowardsTopObs = (sensitivityPx: number, initialGracePeriodMs: number) =>
  timer(initialGracePeriodMs).pipe(
    mergeMapTo(mouseMove$),
    scan((acc, ev) => ({
      nextY: ev.clientY,
      prevY: acc.nextY
    }), {}),
    skip(1),
    filter(state => state.nextY < sensitivityPx && state.nextY < state.prevY)
  );


export default (sensitivityPxStr: TriggerParameterValue): Observable<true> => {
  // How close the mouse must get to the top edge of the viewport to trigger.
  const sensitivityPx = parseInt(sensitivityPxStr, 10);

  // The amount of time that has to pass before an exit can be triggered.
  const initialGracePeriodMs = 250;

  // If the mouse leaves the viewport and re-enters within this period (or there is a scroll), the
  // trigger is cancelled.
  const mouseLeaveDelayMs = 1500;

  const mouseMovesTowardsTop$ = createMouseMovesTowardsTopObs(sensitivityPx, initialGracePeriodMs);
  const mouseLeavesWithDelay$ = createDelayedMouseLeaveObs(initialGracePeriodMs, mouseLeaveDelayMs);

  return merge(mouseMovesTowardsTop$, mouseLeavesWithDelay$).pipe(
    // throttleTime causes the first exit to fire immediately but filters out subsequent exits until
    // the duration has passed.
    throttleTime(2000),
    mapTo(true)
  );
};
