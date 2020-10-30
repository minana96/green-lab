// @flow
import createUuid from 'createUuid';

import type { StorageObj } from 'types';

export const STORAGE_KEY = 'ub-emb-id';

export function getVisitorId(storage: StorageObj): string {
  try {
    const id = storage.getItem(STORAGE_KEY);
    return id && id.length === 32 ? id : createUuid();
  } catch (ex) {
    return createUuid();
  }
}

export function setVisitorId(storage: StorageObj, visitorId: string): void {
  try {
    storage.setItem(STORAGE_KEY, visitorId);
  } catch (ex) {
    // noop
  }
}
