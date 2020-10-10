import _isEqualWith from 'lodash-es/isEqualWith';
import React from 'react';


var customizer = function customizer(obj, other) {
  if (obj === other) return true;

  if (!obj && !other) {
    var objIsEmpty = obj === null || obj === undefined || obj === '';
    var otherIsEmpty = other === null || other === undefined || other === '';
    return objIsEmpty === otherIsEmpty;
  }

  if (obj && other && obj._error !== other._error) return false;
  if (obj && other && obj._warning !== other._warning) return false;
  if (React.isValidElement(obj) || React.isValidElement(other)) return false;
};

var deepEqual = function deepEqual(a, b) {
  return _isEqualWith(a, b, customizer);
};

export default deepEqual;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/structure/plain/deepEqual.js
// module id = 378
// module chunks = 0 1