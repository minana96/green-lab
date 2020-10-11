'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _SelectSide = require('./SelectSide');

var _SelectSide2 = _interopRequireDefault(_SelectSide);

var _Quest = require('./Quest');

var _Quest2 = _interopRequireDefault(_Quest);

var _common = require('../../routes/common');

require('./_styles.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            getPageDataStatus: undefined,
            getPageDataData: undefined,
            promotionStarted: false,
            selectedCharacter: null
        };

        return _this;
    }

    _createClass(App, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _global_var = global_var,
                ajax_url = _global_var.ajax_url,
                pageID = _global_var.pageID;

            var payload = _qs2.default.stringify({
                action: "get_promotion_wow",
                pageID: pageID
            });
            this.setState({
                getPageDataStatus: 'loading'
            });
            _axios2.default.post(ajax_url, payload).then(function (response) {
                var data = response.data;

                _this2.setState({
                    getPageDataStatus: 'success',
                    getPageDataData: data
                });
                (0, _common.setGlobalCookie)('popup_shown', 'true', 14);
            }, function (error) {
                console.log(error);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var selectedCharacter = this.state.selectedCharacter;

            return _react2.default.createElement(
                _react.Fragment,
                null,
                _react2.default.createElement(_SelectSide2.default, { parent: this }),
                selectedCharacter !== null ? _react2.default.createElement(_Quest2.default, { parent: this }) : ''
            );
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;


//////////////////
// WEBPACK FOOTER
// ./src/promotion/wow/App.js
// module id = 520
// module chunks = 2