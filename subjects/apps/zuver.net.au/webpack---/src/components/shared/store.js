'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _reduxForm = require('redux-form');

var reducers = {
    form: _reduxForm.reducer
};

var reducer = (0, _redux.combineReducers)(reducers);
var store = (0, _redux.createStore)(reducer);
exports.default = store;


//////////////////
// WEBPACK FOOTER
// ./src/components/shared/store.js
// module id = 198
// module chunks = 0 1