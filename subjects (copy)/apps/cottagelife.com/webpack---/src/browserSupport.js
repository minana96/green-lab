// @flow

function hasNativeRequirements(): boolean {
  const requirements = [
    global.postMessage,
    global.addEventListener,
    Array.prototype.map,
    Array.prototype.forEach,
    Array.prototype.filter,
    Element.prototype.setAttribute,
    Function.prototype.apply,
    Date.now,
    document.head,
  ];

  for (let i = 0; i < requirements.length; i++) {
    if (typeof requirements[i] === 'undefined' || requirements[i] === null) {
      return false;
    }
  }

  return true;
}

function storageIsWriteable(): boolean {
  const TEST = '_ube-test';

  try {
    window.localStorage.setItem(TEST, '1');
    window.localStorage.getItem(TEST);
    window.localStorage.removeItem(TEST);
    return true;
  } catch (err) {
    return false;
  }
}

export function browserSupportsPreview(): boolean {
  return hasNativeRequirements();
}

export function browserSupportsLive(): boolean {
  return hasNativeRequirements() && storageIsWriteable();
}
