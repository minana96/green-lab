// @flow
import type { Embeddable } from 'types';

function getUniquenessKey(embeddable: Embeddable) {
  const { display, trigger } = embeddable;
  return [display.name, trigger.name, trigger.value].join(':');
}

// Return true if none of the precedingEmbeddables has the same combination of display type and
// trigger
export default function isUnique<E: Embeddable>(precedingEmbeddables: E[], embeddable: E): boolean {
  const uniquenessKey = getUniquenessKey(embeddable);

  return precedingEmbeddables.every(precedingEmbeddable =>
    getUniquenessKey(precedingEmbeddable) !== uniquenessKey
  );
}
