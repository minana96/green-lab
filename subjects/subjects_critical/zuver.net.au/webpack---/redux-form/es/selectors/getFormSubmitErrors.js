var createGetFormSubmitErrors = function createGetFormSubmitErrors(_ref) {
  var getIn = _ref.getIn,
      empty = _ref.empty;
  return function (form, getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      return getIn(nonNullGetFormState(state), form + '.submitErrors') || empty;
    };
  };
};

export default createGetFormSubmitErrors;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/selectors/getFormSubmitErrors.js
// module id = 368
// module chunks = 0 1