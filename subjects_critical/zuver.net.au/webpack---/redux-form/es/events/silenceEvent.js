import isEvent from './isEvent';

var silenceEvent = function silenceEvent(event) {
  var is = isEvent(event);
  if (is) {
    event.preventDefault();
  }
  return is;
};

export default silenceEvent;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/events/silenceEvent.js
// module id = 184
// module chunks = 0 1