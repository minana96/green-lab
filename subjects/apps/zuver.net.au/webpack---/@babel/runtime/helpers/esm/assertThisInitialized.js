export default function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}


//////////////////
// WEBPACK FOOTER
// ./~/@babel/runtime/helpers/esm/assertThisInitialized.js
// module id = 201
// module chunks = 0 1