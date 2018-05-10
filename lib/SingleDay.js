'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SingleDayGrid = require('./SingleDayGrid');

var _SingleDayGrid2 = _interopRequireDefault(_SingleDayGrid);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _accessors = require('./utils/accessors');

var _propTypes3 = require('./utils/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleDay = function (_React$Component) {
  _inherits(SingleDay, _React$Component);

  function SingleDay() {
    _classCallCheck(this, SingleDay);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SingleDay.prototype.render = function render() {
    var _props = this.props,
        events = _props.events,
        defaultDate = _props.defaultDate,
        props = _objectWithoutProperties(_props, ['events', 'defaultDate']);

    var range = SingleDay.range(defaultDate, this.props);
    var dayEvents = this.stripEventDate(events);
    return _react2.default.createElement(_SingleDayGrid2.default, _extends({}, props, {
      events: dayEvents,
      range: range,
      eventOffset: 15
    }));
  };

  SingleDay.prototype.stripEventDate = function stripEventDate(events) {
    var _props2 = this.props,
        startAccessor = _props2.startAccessor,
        endAccessor = _props2.endAccessor;

    events.forEach(function (event) {
      var eStart = (0, _accessors.accessor)(event, startAccessor),
          eEnd = (0, _accessors.accessor)(event, endAccessor);
      event.start = _dates2.default.stripDate(eStart);
      event.end = _dates2.default.stripDate(eEnd);
    });
    return events;
  };

  return SingleDay;
}(_react2.default.Component);

SingleDay.propTypes = {
  date: _propTypes2.default.instanceOf(Date).isRequired,
  events: _propTypes2.default.array.isRequired,
  startAccessor: _propTypes3.accessor.isRequired,
  endAccessor: _propTypes3.accessor.isRequired,
  defaultDate: _propTypes2.default.object
};
SingleDay.defaultProps = _SingleDayGrid2.default.defaultProps;


SingleDay.range = function (date) {
  return [_dates2.default.startOf(date, 'day')];
};

SingleDay.title = function (date, _ref) {
  var formats = _ref.formats,
      culture = _ref.culture;
  return _localizer2.default.format(date, formats.dayHeaderFormat, culture);
};

exports.default = SingleDay;
module.exports = exports['default'];