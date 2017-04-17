'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _routerWarning = require('./routerWarning');

var _routerWarning2 = _interopRequireDefault(_routerWarning);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _RouteUtils = require('./RouteUtils');

var _InternalPropTypes = require('./InternalPropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
 * a JSX route config.
 */
/* eslint-disable react/require-render-return */
var IndexRoute = function (_Component) {
  _inherits(IndexRoute, _Component);

  function IndexRoute() {
    _classCallCheck(this, IndexRoute);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  /* istanbul ignore next: sanity check */
  IndexRoute.prototype.render = function render() {
    !false ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<IndexRoute> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
  };

  return IndexRoute;
}(_react.Component);

IndexRoute.displayName = 'IndexRoute';

IndexRoute.createRouteFromReactElement = function (element, parentRoute) {
  /* istanbul ignore else: sanity check */
  if (parentRoute) {
    parentRoute.indexRoute = (0, _RouteUtils.createRouteFromReactElement)(element);
  } else {
    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'An <IndexRoute> does not make sense at the root of your route config') : void 0;
  }
};

IndexRoute.propTypes = {
  path: _InternalPropTypes.falsy,
  component: _InternalPropTypes.component,
  components: _InternalPropTypes.components,
  getComponent: _propTypes.func,
  getComponents: _propTypes.func
};
exports.default = IndexRoute;
module.exports = exports['default'];