// @flow
/* eslint-disable no-console */
import qs from 'query-string';

import isDebugMode from 'isDebugMode';
import noop from 'noop';

import type { Env, State } from 'types';
import type { Action } from 'actions';

// Using createLogger's functions everywhere we want to log ensures the same logic is always used to
// determine whether to log or not, and that every log line conforms to a consistent format:
//  1. UB-DEBUG:
//  2. A prefix in square brackets (usually activation rule ID), if supplied
//  3. The rest of the log message

const PREFIX = 'UB-DEBUG:';

const browserSupportsConsoleMethod = (method: string) =>
  // This check allows us to avoid errors in earlier versions of IE.
  typeof window.console === 'object' && typeof window.console[method] !== 'undefined';

const wrapConsoleMethod = (method: string) => {
  if (browserSupportsConsoleMethod(method)) {
    return (...messages: mixed[]) => {
      if (messages.length > 1) {
        window.console[method](PREFIX, `[${String(messages[0])}]`, ...messages.slice(1));
      } else {
        window.console[method](PREFIX, ...messages);
      }
    };
  } else {
    return noop;
  }
};

// Redux-like action and state logger
function logAction({ action, prev, next }: { action?: Action, prev?: State, next: State }): void {
  if (!browserSupportsConsoleMethod('groupCollapsed') || !action || action.type === 'LOG') {
    return;
  }

  window.console.groupCollapsed(`action ${action.type}`);
  window.console.log('%cprev state', 'font-weight: bold; color: #9e9e9e', prev);
  window.console.log('%caction', 'font-weight: bold; color: #03a9f4', action);
  window.console.log('%cnext state', 'font-weight: bold; color: #4caf50', next);
  window.console.groupEnd();
}

export default function createLogger(environment: Env, queryString: string) {
  const loggingEnabled = isDebugMode(environment, queryString);
  const actionLoggingEnabled =
    environment === 'development' || qs.parse(queryString)['ub-debug'] === 'actions';

  return {
    log: loggingEnabled ? wrapConsoleMethod('log') : noop,
    warn: loggingEnabled ? wrapConsoleMethod('warn') : noop,
    error: loggingEnabled ? wrapConsoleMethod('error') : noop,
    logAction: actionLoggingEnabled ? logAction : noop,
  };
}
