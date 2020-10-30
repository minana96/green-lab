var isHotReloading = function isHotReloading() {
  return !!(typeof module !== 'undefined' && module.hot && typeof module.hot.status === 'function' && module.hot.status() === 'apply');
};

export default isHotReloading;


//////////////////
// WEBPACK FOOTER
// ./~/redux-form/es/util/isHotReloading.js
// module id = 386
// module chunks = 0 1