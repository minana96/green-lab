var isEvent = function isEvent(candidate) {
  return !!(candidate && candidate.stopPropagation && candidate.preventDefault);
};

export default isEvent;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/events/isEvent.js
// module id = 182
// module chunks = 0 1