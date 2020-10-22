var createGetFormSyncErrors = function createGetFormSyncErrors(_ref) {
  var getIn = _ref.getIn,
      empty = _ref.empty;
  return function (form, getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      return getIn(nonNullGetFormState(state), form + '.syncErrors') || empty;
    };
  };
};

export default createGetFormSyncErrors;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/selectors/getFormSyncErrors.js
// module id = 369
// module chunks = 0 1