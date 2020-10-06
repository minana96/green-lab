// @flow
import { filter, mapTo } from 'rxjs/operators';

import {click$} from 'domEvents';
import {findIndex} from 'utils';

import type {Observable} from 'rxjs';

const matchesSelector =
  Element.prototype.matches ||
  Element.prototype.matchesSelector ||
  Element.prototype.mozMatchesSelector ||
  Element.prototype.msMatchesSelector ||
  Element.prototype.oMatchesSelector ||
  Element.prototype.webkitMatchesSelector ||
  function matchesSelectorFallback(selector) {
    const nodes = document.querySelectorAll(selector);
    const arr = Array.prototype.slice.call(nodes);
    return findIndex(arr, node => node === this) !== -1;
  };

const containsSelector = (el, selector) => {
  if (el instanceof Element) {
    return (
      matchesSelector.call(el, selector) ||
      containsSelector(el.parentElement, selector)
    );
  // intentionally use != instead of !== to match both undefined and null
  // eslint-disable-next-line eqeqeq
  } else if (el != undefined && el.parentElement != undefined) {
    return containsSelector(el.parentElement, selector);
  } else {
    return false;
  }
};

export default (selector: string, isIOS: boolean): Observable<true> => {
  // This is a workaround for an iOS bug where click events are only delegated when the target
  // element is clickable (<a>, <button>, or <input>). See
  // https://www.quirksmode.org/blog/archives/2010/09/click_event_del.html. We want to be able to
  // support click triggers on all elements. Adding `cursor: pointer` CSS to the element causes the
  // event to delegate as expected.
  if (isIOS) {
    [].forEach.call(document.querySelectorAll(selector), element => {
      if (element.tagName !== 'A' && element.tagName !== 'BUTTON' && element.tagName !== 'INPUT') {
        // eslint-disable-next-line no-param-reassign
        element.style.cursor = 'pointer';
      }
    });
  }

  return click$.pipe(
    filter(ev => containsSelector(ev.target, selector)),
    mapTo(true)
  );
};
