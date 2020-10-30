// @flow
import type { Embeddable, EmbeddableDisplayType } from 'types';

export function canBeShownMultipleTimes(embeddable: Embeddable) {
  const { name } = embeddable.trigger;
  return name === 'clickClass' || name === 'clickId' || name === 'clickSelector';
}

export function isVisible(
  embeddable: Embeddable,
  visibleEmbIds: { [EmbeddableDisplayType]: ?string }
) {
  return visibleEmbIds[embeddable.display.name] === embeddable.id;
}

export function shouldRespondToViewportChanges(embeddable: Embeddable) {
  return embeddable.status !== 'cancelled' && embeddable.display.name === 'stickyBar';
}
