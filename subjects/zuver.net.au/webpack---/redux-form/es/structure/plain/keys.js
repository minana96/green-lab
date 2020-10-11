

function keys(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map(function (i) {
      return i.name;
    });
  }

  return Object.keys(value);
}


export default keys;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/structure/plain/keys.js
// module id = 381
// module chunks = 0 1