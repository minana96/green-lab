// @flow

import uuid from 'uuid-v4';

export default function createUuid(): string {
  return uuid().replace(/-/g, '');
}
