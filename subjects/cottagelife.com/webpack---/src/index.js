// @flow
import { merge, of } from 'rxjs';
import { mergeMap, scan, tap } from 'rxjs/operators';

import upgradeActivationRule from '@unbounce/ub-emb-core/lib/utils/upgradeActivationRule';
import scriptVersion from 'scriptVersion';
import {browserSupportsLive, browserSupportsPreview} from 'browserSupport';
import onDocumentReady from 'onDocumentReady';
import createErrorReporter from 'createErrorReporter';
import createDispatcher from 'createDispatcher';
import createTrigger from 'createTrigger';
import createKeyboardEscape from 'createKeyboardEscape';
import createViewportChanges from 'createViewportChanges';
import { createScrollPositionChanges } from 'createScrollPositionChanges';
import createLocationHrefChanges from 'createLocationHrefChanges';
import createInitialState from 'createInitialState';
import createSubscriber from 'createSubscriber';
import { getVisitorData } from 'visitorTracking';
import { getVisitorId } from 'visitorId';
import handleSideEffects from 'handleSideEffects';
import singleExecutable from 'singleExecutable';
import actions from 'actions';
import reducer from 'reducer';
import createLogger from 'logger';

import type {OriginServerInputs, PreviewInputs} from 'types';

const ACTIVATION_RULE_VERSION = 17;
const UPGRADER = upgradeActivationRule(ACTIVATION_RULE_VERSION);

function processRules(activationRules, stateInputs, setRulesAction, logger, errorReporter): void {
  const initialState = createInitialState(stateInputs);
  const { dispatch, dispatchedAction$ } = createDispatcher();
  const subscriber = createSubscriber(handleSideEffects(dispatch), errorReporter);

  merge(
    dispatchedAction$,
    createViewportChanges(),
    createScrollPositionChanges(),
    createLocationHrefChanges(),
    createKeyboardEscape(),
    of(actions.setVisitorId({visitorId: getVisitorId(window.localStorage)})),
    of(setRulesAction),
    of(...activationRules).pipe(mergeMap(createTrigger(initialState))),
  )
    .pipe(
      scan((acc, action) => ({
        action,
        prev: acc.next,
        next: reducer(acc.next, action),
      }), { next: initialState }),
      tap(logger.logAction)
    )
    .subscribe(subscriber);
}

export function init(inputs: OriginServerInputs): void {
  const { environment, geoData, ubCode, matchingRules } = inputs;
  const logger = createLogger(environment, window.location.search);

  logger.log(`Unbounce Universal Script ${scriptVersion} (${environment})`);

  if (!browserSupportsLive()) {
    logger.log('Browser not supported. Aborting...');
    return;
  }

  const errorReporter =
    createErrorReporter(environment, ubCode, matchingRules, window.location.search);

  onDocumentReady(() => {
    try {
      const activationRules = matchingRules.map(UPGRADER);

      const action = actions.setActivationRules({
        ruleData: activationRules.map(activationRule => ({
          activationRule,
          randomSeed: Math.random(),
          visitorData: getVisitorData(window.localStorage, activationRule.embUuid),
        })),
      });

      const stateInputs = { environment, geoData, previewMode: false, ubCode };

      processRules(activationRules, stateInputs, action, logger, errorReporter);
    } catch (error) {
      errorReporter(error);
    }
  });
}

export function preview({ environment, ruleSrcPairs }: PreviewInputs): void {
  const logger = createLogger(environment, window.location.search);

  logger.log(`Unbounce Universal Script ${scriptVersion} (${environment} - preview)`);

  if (!browserSupportsPreview()) {
    logger.log('Browser not supported. Aborting...');
    return;
  }

  // eslint-disable-next-line no-console
  const errorReporter = console.error;
  const upgradedPairs = ruleSrcPairs.map(([rule, src]) => [UPGRADER(rule), src]);

  const stateInputs = {
    environment,
    geoData: null, // unused in preview
    previewMode: true,
    ubCode: '',
  };

  const activationRules = upgradedPairs.map(p => p[0]);
  const action = actions.setActivationRulesPreview({ ruleSrcPairs: upgradedPairs });

  processRules(activationRules, stateInputs, action, logger, errorReporter);
}

// Expose globally to the host page
window.ube = window.ube || {
  init: singleExecutable(init),
  preview,
};
