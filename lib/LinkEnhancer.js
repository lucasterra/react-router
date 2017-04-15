'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _PropTypes = require('./PropTypes');

var _ContextUtils = require('./ContextUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function resolveToLocation(to, router) {
  return typeof to === 'function' ? to(router.location) : to;
}

function LinkEnhancer(WrappedComponent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var EnhancedLink = function (_PureComponent) {
    _inherits(EnhancedLink, _PureComponent);

    function EnhancedLink(props) {
      _classCallCheck(this, EnhancedLink);

      // No autobind in classes
      var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

      _this.handleClick = _this.handleClick.bind(_this);
      return _this;
    }

    EnhancedLink.prototype.handleClick = function handleClick(event) {
      var _props = this.props,
          onClick = _props.onClick,
          onNavigate = _props.onNavigate,
          to = _props.to,
          target = _props.target;


      if (onClick) onClick(event);

      if (this.options.onClick) this.options.onClick(event);

      if (event.defaultPrevented) return;

      var router = this.context.router;

      !router ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<Link>s rendered outside of a router context cannot navigate.') : (0, _invariant2.default)(false) : void 0;

      if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

      // If target prop is set (e.g. to "_blank"), let browser handle link.
      /* istanbul ignore if: untestable with Karma */
      if (target) return;

      event.preventDefault();

      if (onNavigate) onNavigate(event);

      if (this.options.onNavigate) this.options.onNavigate(event);

      router.push(resolveToLocation(to, router));
    };

    EnhancedLink.prototype.render = function render() {
      /*eslint no-unused-vars: ["error", { "ignoreRestSiblings": true }]*/
      var _props2 = this.props,
          to = _props2.to,
          onlyActiveOnIndex = _props2.onlyActiveOnIndex,
          withRef = _props2.withRef,
          onClick = _props2.onClick,
          onNavigate = _props2.onNavigate,
          props = _objectWithoutProperties(_props2, ['to', 'onlyActiveOnIndex', 'withRef', 'onClick', 'onNavigate']);

      // Ignore if rendered outside the context of router to simplify unit testing.


      var router = this.context.router;

      props.active = false;

      if (router) {
        // If user does not specify a `to` prop, return an empty anchor tag.
        if (!to) {
          return _react2.default.createElement(WrappedComponent, props);
        }

        var toLocation = resolveToLocation(to, router);
        props.href = router.createHref(toLocation);

        if (withRef) {
          props.ref = function (c) {
            return withRef(c);
          };
        }

        props.active = router.isActive(toLocation, onlyActiveOnIndex);
      }

      return _react2.default.createElement(WrappedComponent, _extends({ onClick: this.handleClick }, props));
    };

    return EnhancedLink;
  }(_react.PureComponent);

  EnhancedLink.contextTypes = {
    router: _PropTypes.routerShape
  };
  EnhancedLink.displayName = 'EnhancedLink(' + WrappedComponent.displayName + ')';
  EnhancedLink.propTypes = {
    to: (0, _propTypes.oneOfType)([_propTypes.string, _propTypes.object, _propTypes.func]),
    onlyActiveOnIndex: _propTypes.bool.isRequired,
    onClick: _propTypes.func,
    onNavigate: _propTypes.func,
    target: _propTypes.string
  };
  EnhancedLink.defaultProps = {
    onlyActiveOnIndex: false
  };


  return (0, _ContextUtils.ContextSubscriberEnhancer)(EnhancedLink, 'router', { withRef: true });
}

exports.default = LinkEnhancer;
module.exports = exports['default'];