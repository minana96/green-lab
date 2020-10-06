// @flow
import { debounceTime, map, mapTo, startWith } from 'rxjs/operators';

import { resize$ } from 'domEvents';
import { getViewport } from 'screen';
import actions from 'actions';

export default function createViewportChanges() {
  return resize$.pipe(
    mapTo(true),
    debounceTime(10),
    startWith(true),
    map(getViewport),
    map(viewport => actions.setViewport({ viewport })),
  );
}
