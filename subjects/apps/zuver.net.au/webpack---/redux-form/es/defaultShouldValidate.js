

var defaultShouldValidate = function defaultShouldValidate(_ref) {
  var values = _ref.values,
      nextProps = _ref.nextProps,
      initialRender = _ref.initialRender,
      lastFieldValidatorKeys = _ref.lastFieldValidatorKeys,
      fieldValidatorKeys = _ref.fieldValidatorKeys,
      structure = _ref.structure;

  if (initialRender) {
    return true;
  }
  return !structure.deepEqual(values, nextProps && nextProps.values) || !structure.deepEqual(lastFieldValidatorKeys, fieldValidatorKeys);
};


export default defaultShouldValidate;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/defaultShouldValidate.js
// module id = 180
// module chunks = 0 1