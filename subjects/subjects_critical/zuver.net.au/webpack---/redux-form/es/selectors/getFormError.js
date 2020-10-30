var createGetFormError = function createGetFormError(_ref) {
  var getIn = _ref.getIn;
  return function (form, getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      return getIn(nonNullGetFormState(state), form + '.error');
    };
  };
};

export default createGetFormError;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/selectors/getFormError.js
// module id = 364
// module chunks = 0 1