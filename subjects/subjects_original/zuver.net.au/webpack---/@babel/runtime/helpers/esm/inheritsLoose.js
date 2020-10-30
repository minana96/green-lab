export default function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}


//////////////////
// WEBPACK FOOTER
// ./~/@babel/runtime/helpers/esm/inheritsLoose.js
// module id = 99
// module chunks = 0 1