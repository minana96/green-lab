// @flow
import { filter, mapTo } from 'rxjs/operators';

import {keyDown$} from 'domEvents';
import actions from 'actions';

export default function createKeyboardEscape() {
  return keyDown$.pipe(
    filter(ev => ev.key === 'Escape' || ev.keyCode === 27),
    mapTo(actions.closeEmb({displayType: 'overlay'}))
    // TODO: We should also be dispatching a closeEmbComplete event here after a 10ms delay. However
    // that action has a payload of the emb's ID and we do not know that here. This means thatif the
    // user presses 'esc', we don't reload the emb and it isn't eligible to be triggered again.
  )
}
