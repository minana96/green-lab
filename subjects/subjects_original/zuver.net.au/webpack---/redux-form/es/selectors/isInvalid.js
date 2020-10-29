import createIsValid from './isValid';


var createIsInvalid = function createIsInvalid(structure) {
  return function (form, getFormState) {
    var isValid = createIsValid(structure)(form, getFormState);
    return function (state) {
      return !isValid(state);
    };
  };
};

export default createIsInvalid;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/selectors/isInvalid.js
// module id = 376
// module chunks = 0 1