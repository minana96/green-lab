var createHasSubmitSucceeded = function createHasSubmitSucceeded(_ref) {
  var getIn = _ref.getIn;
  return function (form, getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      return !!getIn(nonNullGetFormState(state), form + '.submitSucceeded');
    };
  };
};

export default createHasSubmitSucceeded;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/selectors/hasSubmitSucceeded.js
// module id = 373
// module chunks = 0 1