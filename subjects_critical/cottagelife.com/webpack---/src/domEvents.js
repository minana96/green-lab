// @flow
import { fromEvent, merge, timer, type Observable } from 'rxjs';
import { distinctUntilChanged, map, share, skip } from 'rxjs/operators';

export const keyDown$: Observable<KeyboardEvent> =
  fromEvent(window, 'keydown')
    .pipe(share());

export const scroll$: Observable<Event> =
  fromEvent(window, 'scroll')
    .pipe(share());

export const resize$: Observable<Event> =
  merge(
    fromEvent(window, 'resize'),
    fromEvent(window, 'orientationchange')
  )
    .pipe(share());

export const mouseMove$ =
  fromEvent(document, 'mousemove')
    .pipe(share());

export const click$: Observable<MouseEvent | TouchEvent> =
  fromEvent(document, 'click')
    .pipe(share());

// The mouseleave event only seems to work with document.documentElement in Safari and Firefox.
// To be safe, we listen to document mouseleave events too.
export const mouseLeave$: Observable<MouseEvent> =
  merge(
    fromEvent(document, 'mouseleave'),
    fromEvent(document.documentElement, 'mouseleave')
  ).pipe(share());

export const mouseEnter$: Observable<MouseEvent> =
  merge(
    fromEvent(document, 'mouseenter'),
    fromEvent(document.documentElement, 'mouseenter')
  ).pipe(share());

export const hrefChange$: Observable<string> =
  merge(
    fromEvent(window, 'hashchange'),
    fromEvent(window, 'popstate'),

    // No event is fired when history.pushstate is called so we need to poll to detect these changes
    timer(0, 250),
  )
    .pipe(
      map(() => window.location.href),
      distinctUntilChanged(),
      skip(1),
      share()
    );
