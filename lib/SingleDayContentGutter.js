'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes3 = require('./utils/propTypes');

var _TimeGroup = require('./TimeGroup');

var _TimeGroup2 = _interopRequireDefault(_TimeGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleDayContentGutter = function (_Component) {
  _inherits(SingleDayContentGutter, _Component);

  function SingleDayContentGutter() {
    var _temp, _this, _ret;

    _classCallCheck(this, SingleDayContentGutter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.renderSlot = function (value, idx) {
      if (idx !== 0) return null;
      return _react2.default.createElement(
        'div',
        {
          key: 'time' + value,
          className: (0, _classnames2.default)('rbc-time-slot', 'rbc-ruler-label')
        },
        value
      );
    }, _this.renderRuler = function (value, idex) {
      var isLast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var classname = 'rbc-ruler-slot';
      if (idex === 1 || idex === 3) {
        if (isLast && idex === 3) {
          classname = 'rbc-ruler-slot-lowBar-last';
        } else {
          classname = 'rbc-ruler-slot-lowBar';
        }
      } else if (idex === 2) {
        classname = 'rbc-ruler-slot-mediumBar';
      }
      return _react2.default.createElement('div', { key: 'ruler' + idex, className: (0, _classnames2.default)(classname) });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SingleDayContentGutter.prototype.render = function render() {
    var _this2 = this;

    var timesRange = this.props.timesRange;

    return _react2.default.createElement(
      'div',
      { className: 'rbc-time-gutter-container' },
      _react2.default.createElement(
        'div',
        { className: 'rbc-time-gutter rbc-ruler-row' },
        timesRange.map(function (time, idx) {
          return _react2.default.createElement(_TimeGroup2.default, {
            key: idx,
            value: time,
            groupClassName: 'rbc-ruler-group',
            renderSlot: _this2.renderRuler,
            isLast: timesRange.length - 1 === idx
          });
        })
      ),
      _react2.default.createElement(
        'div',
        { className: 'rbc-time-gutter rbc-time-row' },
        timesRange.map(function (time, idx) {
          return _react2.default.createElement(_TimeGroup2.default, {
            key: idx,
            groupClassName: 'rbc-time-group',
            value: idx,
            renderSlot: _this2.renderSlot
          });
        })
      )
    );
  };

  return SingleDayContentGutter;
}(_react.Component);

SingleDayContentGutter.propTypes = {
  timesRange: _propTypes2.default.array.isRequired,
  timeGutterFormat: _propTypes3.dateFormat,
  culture: _propTypes2.default.string,
  resource: _propTypes2.default.string
};
exports.default = SingleDayContentGutter;
module.exports = exports['default'];