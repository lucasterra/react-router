'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _RouteUtils = require('./RouteUtils');

var _PatternUtils = require('./PatternUtils');

var _InternalPropTypes = require('./InternalPropTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A <Redirect> is used to declare another URL path a client should
 * be sent to when they request a given URL.
 *
 * Redirects are placed alongside routes in the route configuration
 * and are traversed in the same manner.
 */
/* eslint-disable react/require-render-return */
var Redirect = function (_Component) {
  _inherits(Redirect, _Component);

  function Redirect() {
    _classCallCheck(this, Redirect);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  /* istanbul ignore next: sanity check */
  Redirect.prototype.render = function render() {
    !false ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<Redirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
  };

  return Redirect;
}(_react.Component);

Redirect.displayName = 'Redirect';

Redirect.createRouteFromReactElement = function (element) {
  var route = (0, _RouteUtils.createRouteFromReactElement)(element);

  if (route.from) route.path = route.from;

  route.onEnter = function (nextState, replace) {
    var location = nextState.location,
        params = nextState.params;


    var pathname = void 0;
    if (route.to.charAt(0) === '/') {
      pathname = (0, _PatternUtils.formatPattern)(route.to, params);
    } else if (!route.to) {
      pathname = location.pathname;
    } else {
      var routeIndex = nextState.routes.indexOf(route);
      var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
      var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
      pathname = (0, _PatternUtils.formatPattern)(pattern, params);
    }

    replace({
      pathname: pathname,
      query: route.query || location.query,
      state: route.state || location.state
    });
  };

  return route;
};

Redirect.getRoutePattern = function (routes, routeIndex) {
  var parentPattern = '';

  for (var i = routeIndex; i >= 0; i--) {
    var route = routes[i];
    var pattern = route.path || '';

    parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;

    if (pattern.indexOf('/') === 0) break;
  }

  return '/' + parentPattern;
};

Redirect.propTypes = {
  path: _propTypes.string,
  from: _propTypes.string, // Alias for path
  to: _propTypes.string.isRequired,
  query: _propTypes.object,
  state: _propTypes.object,
  onEnter: _InternalPropTypes.falsy,
  children: _InternalPropTypes.falsy
};
exports.default = Redirect;
module.exports = exports['default'];