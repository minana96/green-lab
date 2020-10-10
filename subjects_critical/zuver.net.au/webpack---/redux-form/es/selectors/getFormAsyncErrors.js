var createGetFormAsyncErrors = function createGetFormAsyncErrors(_ref) {
  var getIn = _ref.getIn;
  return function (form, getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      return getIn(nonNullGetFormState(state), form + '.asyncErrors');
    };
  };
};

export default createGetFormAsyncErrors;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/selectors/getFormAsyncErrors.js
// module id = 363
// module chunks = 0 1