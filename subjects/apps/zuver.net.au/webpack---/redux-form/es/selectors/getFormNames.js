function createGetFormNames(_ref) {
  var getIn = _ref.getIn,
      keys = _ref.keys;

  return function (getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      return keys(nonNullGetFormState(state));
    };
  };
}

export default createGetFormNames;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/selectors/getFormNames.js
// module id = 367
// module chunks = 0 1