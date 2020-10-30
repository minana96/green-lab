// @flow

import {Subject} from 'rxjs';

import type {Action} from 'actions';

export type Dispatch = (action: Action) => void;

export default function createDispatcher() {
  const dispatchedAction$: Subject<Action> = new Subject();
  const dispatch: Dispatch = action => {
    dispatchedAction$.next(action);
  };

  return {dispatch, dispatchedAction$};
}
