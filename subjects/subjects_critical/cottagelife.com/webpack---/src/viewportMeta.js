// @flow

// On mobile, if the host page does not contain a responsive <meta> tag then overlays will appear
// very small and be hard to dismiss. We add a meta tag upon trigger to avoid this and to ensure
// that the overlay CSS is always operating on a viewport that matches the device width.

// If the page already has a viewport meta tag, we use whatever initial scale is defined there.

const meta = document.createElement('meta');

meta.setAttribute('name', 'viewport');

function metaContent(scale0) {
  const scale = scale0 || 1;
  return `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, ` +
    `minimum-scale=${scale}, shrink-to-fit=no`;
}

function isPresent() {
  return Boolean(meta.parentNode);
}

function getInitialScale() {
  const tags = document.head && document.head.querySelectorAll(
    'meta[name="viewport"][content*="scale"]');
  const tag = tags && tags[tags.length - 1]; // if there are multiple, the last one would be active
  const content = tag && tag.getAttribute('content');
  const match = (content || '').match(/initial-scale=((\d|\.)+)\b/);

  return match && match[1];
}

function add() {
  meta.setAttribute('content', metaContent(getInitialScale()));
  if (document.head) {
    document.head.appendChild(meta);
  }
}

function remove() {
  if (document.head && document.head.querySelectorAll('meta[name="viewport"]').length > 1) {
    // If a viewport meta tag already exists, we should revert this change so that the mobile
    // browser will fall back to the original meta tag.
    meta.removeAttribute('content');
  } else {
    // If this tag is the only viewport meta tag on the page then we should set the content to
    // an empty string so our viewport settings are removed.
    meta.setAttribute('content', '');
  }

  if (document.head) {
    document.head.removeChild(meta);
  }
}

export default {
  setEnabled(shouldBeEnabled: boolean): void {
    if (shouldBeEnabled && !isPresent()) {
      add();
    } else if (!shouldBeEnabled && isPresent()) {
      remove();
    }
  },
};
