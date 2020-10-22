// @flow
import { isFunction } from 'utils';
import type { Embeddable, Integrations } from 'types';

type LogFunction = (...args: mixed[]) => void;

type IntegrationCallbacks = {
  onTrigger(emb: Embeddable, log: LogFunction): void,
  onConversion(emb: Embeddable, log: LogFunction): void,
};

function sendGoogleAnalyticsEvent(action, label, isInteraction, log) {
  const { ga } = global;
  const category = 'Unbounce Convertable';

  ga(() => {
    // Get all analytics.js trackers registered on the page and send the event to each one.
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/creating-trackers
    // -> New docs, removing the command parameter: https://developers.google.com/analytics/devguides/collection/analyticsjs/tracker-object-reference#send

    const trackers = ga
      .getAll()
      .reduce((acc, tracker) => {
        if (!acc.some(accTracker => accTracker.get('trackingId') === tracker.get('trackingId'))) {
          acc.push(tracker)
        }
        return acc
      }, []);

    trackers.forEach(tracker =>
      tracker.send('event', category, action, label, {
        nonInteraction: !isInteraction,
      })
    );

    const trackerIds = trackers.map(tracker => tracker.get('trackingId'))

    log(
      `Sent GA event to trackers '${trackerIds.join("', '")}':`,
      '\n - category:      ', category,
      '\n - action:        ', action,
      '\n - label:         ', label,
      '\n - nonInteraction:', !isInteraction
    );
  })
};


const nullCallbacks: IntegrationCallbacks = {
  onTrigger() { },
  onConversion() { },
};

function getEventLabel(emb: Embeddable) {
  const { customEventLabel, appendVariant } = emb.activationRule.integrations.googleAnalytics;
  return (customEventLabel || emb.id) + (appendVariant ? ` - variant ${emb.variantLetter}` : '');
}

function isInteractionTrigger(emb: Embeddable) {
  const { name } = emb.trigger;
  return name === 'clickClass' || name === 'clickId' || name === 'clickSelector';
}

const googleAnalytics: IntegrationCallbacks = {
  onTrigger(emb, log) {
    try {
      sendGoogleAnalyticsEvent('view', getEventLabel(emb), isInteractionTrigger(emb), log);
    } catch (err) {
      log('Failed to send GA event:', err);
    }
  },

  onConversion(emb, log) {
    try {
      sendGoogleAnalyticsEvent('conversion', getEventLabel(emb), true, log);
    } catch (err) {
      log('Failed to send GA event:', err);
    }
  },
};

export default (integrations: Integrations): IntegrationCallbacks =>
  integrations.googleAnalytics.enabled && isFunction(global.ga) ? googleAnalytics : nullCallbacks;
