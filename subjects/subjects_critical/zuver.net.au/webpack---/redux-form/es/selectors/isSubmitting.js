var createIsSubmitting = function createIsSubmitting(_ref) {
  var getIn = _ref.getIn;
  return function (form, getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      return !!getIn(nonNullGetFormState(state), form + '.submitting');
    };
  };
};

export default createIsSubmitting;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/selectors/isSubmitting.js
// module id = 377
// module chunks = 0 1