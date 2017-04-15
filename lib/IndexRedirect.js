'use strict';

exports.__esModule = true;

var _react = require('react');

var _propTypes = require('prop-types');

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Redirect = require('./Redirect');

var _Redirect2 = _interopRequireDefault(_Redirect);

var _InternalPropTypes = require('./InternalPropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An <IndexRedirect> is used to redirect from an indexRoute.
 */
/* eslint-disable react/require-render-return */
var IndexRedirect = function (_Component) {
  _inherits(IndexRedirect, _Component);

  function IndexRedirect() {
    _classCallCheck(this, IndexRedirect);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  IndexRedirect.createRouteFromReactElement = function createRouteFromReactElement(element, parentRoute) {
    /* istanbul ignore else: sanity check */
    if (parentRoute) {
      parentRoute.indexRoute = _Redirect2.default.createRouteFromReactElement(element);
    } else {
      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'An <IndexRedirect> does not make sense at the root of your route config') : void 0;
    }
  };

  /* istanbul ignore next: sanity check */
  IndexRedirect.prototype.render = function render() {
    !false ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
  };

  return IndexRedirect;
}(_react.Component);

IndexRedirect.displayName = 'IndexRedirect';
IndexRedirect.propTypes = {
  to: _propTypes.string.isRequired,
  query: _propTypes.object,
  state: _propTypes.object,
  onEnter: _InternalPropTypes.falsy,
  children: _InternalPropTypes.falsy
};
exports.default = IndexRedirect;
module.exports = exports['default'];