'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.ContextProviderEnhancer = ContextProviderEnhancer;
exports.ContextSubscriberEnhancer = ContextSubscriberEnhancer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Works around issues with context updates failing to propagate.
// Caveat: the context value is expected to never change its identity.
// https://github.com/facebook/react/issues/2517
// https://github.com/reactjs/react-router/issues/470

var contextProviderShape = _propTypes2.default.shape({
  subscribe: _propTypes2.default.func.isRequired,
  eventIndex: _propTypes2.default.number.isRequired
});

function makeContextName(name) {
  return '@@contextSubscriber/' + name;
}

function ContextProviderEnhancer(ComposedComponent, name, options) {
  var _class, _temp, _class$childContextTy;

  var contextName = makeContextName(name);
  var listenersKey = contextName + '/listeners';
  var eventIndexKey = contextName + '/eventIndex';
  var subscribeKey = contextName + '/subscribe';
  var withRef = options && options.withRef;

  return _temp = _class = function (_Component) {
    _inherits(_class, _Component);

    function _class(props) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props));

      _this.getWrappedInstance = function () {
        !withRef ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'To access the wrapped instance, you need to specify ' + '`{ withRef: true }` as the second argument of the withRouter() call.') : (0, _invariant2.default)(false) : void 0;

        return _this.wrappedInstance;
      };

      _this[subscribeKey] = function (listener) {
        // No need to immediately call listener here.
        _this[listenersKey].push(listener);

        return function () {
          _this[listenersKey] = _this[listenersKey].filter(function (item) {
            return item !== listener;
          });
        };
      };

      return _this;
    }

    _class.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[contextName] = {
        eventIndex: this[eventIndexKey],
        subscribe: this[subscribeKey]
      }, _ref;
    };

    _class.prototype.componentWillMount = function componentWillMount() {
      this[listenersKey] = [];
      this[eventIndexKey] = 0;
    };

    _class.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
      this[eventIndexKey]++;
    };

    _class.prototype.componentDidUpdate = function componentDidUpdate() {
      var _this2 = this;

      this[listenersKey].forEach(function (listener) {
        return listener(_this2[eventIndexKey]);
      });
    };

    _class.prototype.render = function render() {
      var _this3 = this;

      var props = _extends({}, this.props);
      if (withRef) {
        props.withRef = function (c) {
          _this3.wrappedInstance = c;
        };
      }

      return _react2.default.createElement(ComposedComponent, props);
    };

    return _class;
  }(_react.Component), _class.childContextTypes = (_class$childContextTy = {}, _class$childContextTy[contextName] = contextProviderShape.isRequired, _class$childContextTy), _temp;
}

function ContextSubscriberEnhancer(ComposedComponent, name, options) {
  var _class2, _temp2, _class2$contextTypes;

  var contextName = makeContextName(name);
  var lastRenderedEventIndexKey = contextName + '/lastRenderedEventIndex';
  var handleContextUpdateKey = contextName + '/handleContextUpdate';
  var unsubscribeKey = contextName + '/unsubscribe';
  var withRef = options && options.withRef;

  return _temp2 = _class2 = function (_Component2) {
    _inherits(_class2, _Component2);

    function _class2(props, context) {
      _classCallCheck(this, _class2);

      var _this4 = _possibleConstructorReturn(this, _Component2.call(this, props, context));

      _this4.getWrappedInstance = function () {
        !withRef ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'To access the wrapped instance, you need to specify ' + '`{ withRef: true }` as the second argument of the withRouter() call.') : (0, _invariant2.default)(false) : void 0;

        return _this4.wrappedInstance;
      };

      _this4[handleContextUpdateKey] = function (eventIndex) {
        if (eventIndex !== _this4.state[lastRenderedEventIndexKey]) {
          var _this4$setState;

          _this4.setState((_this4$setState = {}, _this4$setState[lastRenderedEventIndexKey] = eventIndex, _this4$setState));
        }
      };

      if (!context[contextName]) {
        _this4.state = {};
      } else {
        var _this4$state;

        _this4.state = (_this4$state = {}, _this4$state[lastRenderedEventIndexKey] = context[contextName].eventIndex, _this4$state);
      }
      return _this4;
    }

    _class2.prototype.componentDidMount = function componentDidMount() {
      if (!this.context[contextName]) {
        return;
      }

      this[unsubscribeKey] = this.context[contextName].subscribe(this[handleContextUpdateKey]);
    };

    _class2.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
      var _setState;

      if (!this.context[contextName]) {
        return;
      }

      this.setState((_setState = {}, _setState[lastRenderedEventIndexKey] = this.context[contextName].eventIndex, _setState));
    };

    _class2.prototype.componentWillUnmount = function componentWillUnmount() {
      if (!this[unsubscribeKey]) {
        return;
      }

      this[unsubscribeKey]();
      this[unsubscribeKey] = null;
    };

    _class2.prototype.render = function render() {
      var _this5 = this;

      var props = _extends({}, this.props);
      if (withRef) {
        props.withRef = function (c) {
          _this5.wrappedInstance = c;
        };
      }

      return _react2.default.createElement(ComposedComponent, props);
    };

    return _class2;
  }(_react.Component), _class2.displayName = 'ContextSubscriberEnhancer(' + ComposedComponent.displayName + ', ' + contextName + ')', _class2.contextTypes = (_class2$contextTypes = {}, _class2$contextTypes[contextName] = contextProviderShape, _class2$contextTypes), _temp2;
}