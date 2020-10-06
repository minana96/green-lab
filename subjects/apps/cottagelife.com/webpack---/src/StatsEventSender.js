// @flow
import { ajax } from 'rxjs/ajax';

import qs from 'query-string';

import getStatsReceiverUrl from 'getStatsReceiverUrl';
import scriptVersion from 'scriptVersion';
import createUuid from 'createUuid';

import type {
  UbCode,
  Url,
  Uuid,
  StatsEventType,
  StatsParams,
  Env
} from 'types';

type LogEvent = (...messages: mixed[]) => void;
type ErrorReporter = (error: Error & {reported?: true} | string, extra: ?{}) => void;

export const EMBEDDABLE_ACTIVATED: StatsEventType = 'EMBEDDABLE_ACTIVATED';
export const EMBEDDABLE_VIEWED: StatsEventType = 'EMBEDDABLE_VIEWED';
export const FORM_SUBMITTED: StatsEventType = 'FORM_SUBMITTED';
export const LINK_CLICKED: StatsEventType = 'LINK_CLICKED';

// Relative endpoint paths for each event type
export const ENDPOINT_PATH_MAP: {[key: StatsEventType]: string} = {
  [EMBEDDABLE_ACTIVATED]: 'embeddableActivated',
  [EMBEDDABLE_VIEWED]: 'embeddableViewed',
  [FORM_SUBMITTED]: 'formSubmitted',
  [LINK_CLICKED]: 'linkClicked',
};

// Functions that return query string params specific to the event type
const QUERY_PARAM_FN_MAP: {[key: StatsEventType]: *} = {
  [EMBEDDABLE_ACTIVATED]: isFirstTime => ({
    isFirstTime,
  }),

  [EMBEDDABLE_VIEWED]: isFirstTime => ({
    isFirstTime,
  }),

  [FORM_SUBMITTED]: (isConversion, isFirstConversion) => ({
    isConversion: isConversion && isFirstConversion,
  }),

  [LINK_CLICKED]: (isConversion, isFirstConversion) => ({
    isConversion: isConversion && isFirstConversion,
  })
};

export default class StatsEventSender {
  _clientUuid: Uuid;
  _trackingId: string; // Max 32 chars
  _hostPageUrl: Url;
  _hostPageReferrerUrl: Url;
  _endpoint: Url;
  _visitorId: Uuid;
  _hostPageCorrelationId: Uuid;
  _logEvent: LogEvent;
  _reportError: ErrorReporter;

  constructor({
    ubCode,
    clientUuid = '',
    trackingId = '',
    hostPageUrl = '',
    hostPageReferrerUrl = '',
    hostPageCorrelationId = '',
    visitorId,
    env,
  }: {
    ubCode: UbCode,
    clientUuid: Uuid,
    trackingId: string,
    hostPageUrl: Url,
    hostPageReferrerUrl: Url,
    hostPageCorrelationId: string,
    visitorId: Uuid,
    env: Env,
  }, logEvent: LogEvent) {
    this._endpoint = getStatsReceiverUrl(ubCode, env);

    this._visitorId = visitorId;
    this._hostPageCorrelationId = hostPageCorrelationId;
    this._clientUuid = clientUuid;
    this._trackingId = trackingId;
    this._hostPageUrl = hostPageUrl;
    this._hostPageReferrerUrl = hostPageReferrerUrl;
    this._logEvent = logEvent;
  }

  embeddableActivated(isFirstTime: boolean): void {
    this._sendEvent(
      this._getEventProperties(EMBEDDABLE_ACTIVATED)(isFirstTime)
    );
  }

  embeddableViewed(isFirstTime: boolean): void {
    this._sendEvent(
      this._getEventProperties(EMBEDDABLE_VIEWED)(isFirstTime)
    );
  }

  formSubmitted(isConversion: boolean, isFirstConversion: boolean): void {
    this._sendEvent(
      this._getEventProperties(FORM_SUBMITTED)(isConversion, isFirstConversion)
    );
  }

  linkClicked(isConversion: boolean, isFirstConversion: boolean): void {
    this._sendEvent(
      this._getEventProperties(LINK_CLICKED)(isConversion, isFirstConversion)
    );
  }

  _getEventProperties(eventType: StatsEventType): * {
    // Returns a function for the given eventType, which takes eventType-specific arguments and
    // returns an endpoint and params object.
    return (...args: Array<*>) => ({
      eventType,
      endpoint: `${this._endpoint}/${ENDPOINT_PATH_MAP[eventType]}`,
      queryParams: {
        // The stats key that we are currently using is actually the selected variant's trackingId,
        // not activationRuleId. However, the legacy stats system is hard-coded to use
        // activationRuleIds. So until the new trackingId-based stats system is implemented, we will
        // continue submitting events using `activationRuleId`, as a workaround.
        activationRuleId: this._trackingId,
        browserTrackingId: this._visitorId,
        clientId: this._clientUuid,
        hostPageCorrelationId: this._hostPageCorrelationId,
        hostPageReferrerUrl: this._hostPageReferrerUrl,
        hostPageUrl: this._hostPageUrl,
        requestId: createUuid(),
        source: `universalscript-${scriptVersion}`,
        ...QUERY_PARAM_FN_MAP[eventType](...args)
      }
    });
  }

  _sendEvent({eventType, endpoint, queryParams}: {
    eventType: StatsEventType, endpoint: Url, queryParams: StatsParams
  }) {
    const queryString = qs.stringify(queryParams);

    ajax({
      url: `${endpoint}?${queryString}`,
      method: 'GET',
      timeout: 5000,
      crossDomain: true,
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    .subscribe(
      () => this._logEvent(`Sent stats event: ${eventType}`),
      err => this._logEvent(
        `Failed to submit stats event - response ${err.status} - ${err.message}`),
    );
  }
}
