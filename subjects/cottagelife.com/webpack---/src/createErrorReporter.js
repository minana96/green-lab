// @flow
import Raven from 'raven-js';

import createLogger from 'logger';
import scriptVersion from 'scriptVersion';

import type {UbCode, ActivationRule, AnyActivationRule, Env} from 'types';

// We don't call Raven.install() here because we don't want Raven to capture uncaught exceptions,
// since this would include any error from customers' JS on the host page, and cause a lot of
// noise. This means that we must catch exceptions ourselves and manually call reportError() with
// them. For synchronous errors, we do this by wrapping the entire Universal Script execution in a
// try/catch (see src/index.js). For asynchronous errors in RxJS callbacks, we do this by using a
// custom Observable::ubSubscribe method that wraps the 'next' and 'error' handlers in a try/catch
// (see src/rxExtensions.js).

const RAVEN_URL = 'https://13b7b4b33f0c4282b4fcc0def81662a4@sentry.io/77159';

type AnnotatedError = Error & {reported?: true};

// Reports errors to Sentry (via Raven) and logs them to the console
export default function createErrorReporter(
  environment: Env,
  ubCode: UbCode,
  activationRules: ActivationRule[] | AnyActivationRule[],
  locationSearch: string,
) {
  Raven
    .config(RAVEN_URL, {
      environment,
      release: scriptVersion,
      tags: {
        ubCode,
      },
      extra: {
        activationRules,
      },
      ignoreUrls: [
        /localhost/,
      ],
    })
    .setUserContext({
      id: ubCode,
      email: '',
    });

  const logger = createLogger(environment, locationSearch);

  return (error?: AnnotatedError | string, extra: ?{}): void => {
    if (environment !== 'development' && error && !error.reported) {
      Raven.captureException(error, {extra});
    }

    if (error instanceof Error) {
      // eslint-disable-next-line no-param-reassign
      error.reported = true;
    }

    logger.error('Error caught', error, extra || '');
  };
}
