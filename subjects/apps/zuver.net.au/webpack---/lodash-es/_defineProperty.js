import getNative from './_getNative.js';

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

export default defineProperty;



//////////////////
// WEBPACK FOOTER
// ./~/lodash-es/_defineProperty.js
// module id = 131
// module chunks = 0 1