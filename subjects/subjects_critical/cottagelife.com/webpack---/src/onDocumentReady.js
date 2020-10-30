// @flow

export default function onDocumentReady(callback: () => void) {
  const {readyState, documentElement} = document;

  const callbackWithCleanup = () => {
    document.removeEventListener('DOMContentLoaded', callbackWithCleanup);
    window.removeEventListener('load', callbackWithCleanup);
    callback();
  };

  if (readyState !== 'loading' && documentElement && !documentElement.doScroll) {
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callbackWithCleanup);
    window.addEventListener('load', callbackWithCleanup);
  }
}
