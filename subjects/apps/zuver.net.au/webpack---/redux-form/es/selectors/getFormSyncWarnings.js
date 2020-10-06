var createGetFormSyncWarnings = function createGetFormSyncWarnings(_ref) {
  var getIn = _ref.getIn,
      empty = _ref.empty;
  return function (form, getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      return getIn(nonNullGetFormState(state), form + '.syncWarnings') || empty;
    };
  };
};

export default createGetFormSyncWarnings;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/selectors/getFormSyncWarnings.js
// module id = 370
// module chunks = 0 1