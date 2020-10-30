// @flow
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import fetchUserApiConfig from 'fetchUserApiConfig';
import ruleToTrigger from 'ruleToTrigger';
import cookieFilter from 'ruleFilters/cookie';
import actions from 'actions';

import type { Action } from 'actions';
import type { ActivationRule, State } from 'types';

export default (state: State) => (rule: ActivationRule): Observable<Action> =>
  ruleToTrigger(rule, state).pipe(
    map(() => {
      let cookieString = '';

      try {
        cookieString = document.cookie;
      } catch (ex) {
        // noop
      }

      if (!cookieFilter(cookieString, rule)) {
        return actions.log({
          messages: [
            rule.id,
            'Not displaying due to cookie targeting rule',
            rule.cookieTargets
          ]
        });
      } else if (!fetchUserApiConfig().shouldShowOverlay(rule.id)) {
        return actions.log({
          messages: [
            rule.id,
            'Not displaying due to _ubeConfig.shouldShowOverlay() callback'
          ]
        });
      } else if (!fetchUserApiConfig().shouldShow(rule.embUuid)) {
        return actions.log({
          messages: [
            rule.embUuid,
            'Not displaying due to _ubeConfig.shouldShow() callback'
          ]
        });
      } else {
        return actions.triggerEmb({id: rule.id});
      }
    })
  );
