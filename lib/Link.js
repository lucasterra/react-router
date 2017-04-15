'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _LinkEnhancer = require('./LinkEnhancer');

var _LinkEnhancer2 = _interopRequireDefault(_LinkEnhancer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A <Link> is used to create an <a> element that links to a route.
 * When that route is active, the link gets the value of its
 * activeClassName prop.
 *
 * For example, assuming you have the following route:
 *
 *   <Route path="/posts/:postID" component={Post} />
 *
 * You could use the following component to link to that route:
 *
 *   <Link to={`/posts/${post.id}`} />
 */
var Link = function (_PureComponent) {
  _inherits(Link, _PureComponent);

  function Link() {
    _classCallCheck(this, Link);

    return _possibleConstructorReturn(this, _PureComponent.apply(this, arguments));
  }

  Link.prototype.render = function render() {
    var _props = this.props,
        active = _props.active,
        activeStyle = _props.activeStyle,
        activeClassName = _props.activeClassName,
        props = _objectWithoutProperties(_props, ['active', 'activeStyle', 'activeClassName']);

    if (active) {
      if (activeClassName) {
        if (props.className) {
          props.className += ' ' + activeClassName;
        } else {
          props.className = activeClassName;
        }
      }

      if (activeStyle) {
        props.style = _extends({}, props.style, activeStyle);
      }
    }

    return _react2.default.createElement('a', props);
  };

  return Link;
}(_react.PureComponent);

Link.propTypes = {
  active: _propTypes.bool.isRequired, // passed by enhancer
  className: _propTypes.string,
  style: _propTypes.object,
  activeStyle: _propTypes.object,
  activeClassName: _propTypes.string
};

Link.defaultProps = {
  style: {}
};

Link.displayName = 'Link';

exports.default = (0, _LinkEnhancer2.default)(Link);
module.exports = exports['default'];