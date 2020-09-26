// @flow
import type { StorageObj, VisitorData, VisitorEvent } from 'types';

const STORAGE_KEY_PREFIX = 'ub-emb-';
const EVENT_EXPIRY_PERIOD = 1000 * 60 * 60 * 24 * 30; // 30 days

export const DEFAULT_VISITOR_DATA: VisitorData = {
  events: [],
  variantLetter: null,
};

function expireOldEvents(events: VisitorEvent[] = []): VisitorEvent[] {
  return events.filter(ev => ev.timestamp > Date.now() - EVENT_EXPIRY_PERIOD);
}

export function getStorageKey(embKey: string) {
  return `${STORAGE_KEY_PREFIX}${embKey}`;
}

export function getVisitorData(storage: StorageObj, embKey: string): VisitorData {
  const visitorDataStr = storage.getItem(getStorageKey(embKey));

  if (visitorDataStr) {
    try {
      return {
        ...DEFAULT_VISITOR_DATA,
        ...JSON.parse(visitorDataStr),
      };
    } catch (e) {
      return DEFAULT_VISITOR_DATA;
    }
  } else {
    return DEFAULT_VISITOR_DATA;
  }
}

export function setVisitorData(storage: StorageObj, embKey: string, visitorData: VisitorData) {
  try {
    storage.setItem(
      getStorageKey(embKey),
      JSON.stringify({
        ...DEFAULT_VISITOR_DATA,
        ...visitorData,
        events: expireOldEvents(visitorData.events),
      })
    );
  } catch (e) {
    // No-op
  }
}
