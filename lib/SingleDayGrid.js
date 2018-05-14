'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _requestAnimationFrame = require('dom-helpers/util/requestAnimationFrame');

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _propTypes3 = require('./utils/propTypes');

var _helpers = require('./utils/helpers');

var _accessors = require('./utils/accessors');

var _eventLevels = require('./utils/eventLevels');

var _SingleDayContentRow = require('./SingleDayContentRow');

var _SingleDayContentRow2 = _interopRequireDefault(_SingleDayContentRow);

var _SingleDayContentGutter = require('./SingleDayContentGutter');

var _SingleDayContentGutter2 = _interopRequireDefault(_SingleDayContentGutter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleDayGrid = function (_Component) {
  _inherits(SingleDayGrid, _Component);

  function SingleDayGrid(props) {
    _classCallCheck(this, SingleDayGrid);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleResize = function () {
      _requestAnimationFrame2.default.cancel(_this.rafHandle);
    };

    _this.gutterRef = function (ref) {
      _this.gutter = ref && (0, _reactDom.findDOMNode)(ref);
    };

    _this.handleSelectAlldayEvent = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      //cancel any pending selections so only the event click goes through.
      _this.clearSelection();
      (0, _helpers.notify)(_this.props.onSelectEvent, args);
    };

    _this.handleSelectAllDaySlot = function (slots, slotInfo) {
      var onSelectSlot = _this.props.onSelectSlot;

      (0, _helpers.notify)(onSelectSlot, {
        slots: slots,
        start: slots[0],
        end: slots[slots.length - 1],
        action: slotInfo.action
      });
    };

    _this.state = { gutterWidth: undefined, isOverflowing: null };
    return _this;
  }

  SingleDayGrid.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  };

  SingleDayGrid.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    _requestAnimationFrame2.default.cancel(this.rafHandle);
  };

  SingleDayGrid.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        events = _props.events,
        range = _props.range,
        startAccessor = _props.startAccessor,
        endAccessor = _props.endAccessor,
        selected = _props.selected,
        components = _props.components,
        timeIntervalGetter = _props.timeIntervalGetter,
        dayStartTime = _props.dayStartTime,
        dayEndTime = _props.dayEndTime;


    var start = range[0],
        end = range[range.length - 1];

    var singleDayEvents = [];
    var fifteenMinsInterval = timeIntervalGetter(dayStartTime, dayEndTime);
    var hourInterval = timeIntervalGetter(dayStartTime, dayEndTime, 1);
    events.forEach(function (event) {
      if ((0, _eventLevels.inRange)(event, start, end, _this2.props)) {
        var eStart = (0, _accessors.accessor)(event, startAccessor),
            eEnd = (0, _accessors.accessor)(event, endAccessor);
        if (_dates2.default.neq(eStart, eEnd) && _dates2.default.gt(eEnd, eStart)) {
          singleDayEvents.push(event);
        }
      }
    });

    singleDayEvents.sort(function (a, b) {
      return (0, _eventLevels.sortEvents)(a, b, _this2.props);
    });
    return _react2.default.createElement(
      'div',
      { className: 'rbc-singleDay-time-view' },
      _react2.default.createElement(
        'div',
        { className: 'rbc-singleDay-container' },
        _react2.default.createElement(_SingleDayContentRow2.default, {
          minRows: 1,
          range: range,
          events: singleDayEvents,
          className: 'rbc-allday-cell',
          selected: selected,
          eventComponent: components.event,
          eventWrapperComponent: components.eventWrapper,
          titleAccessor: this.props.titleAccessor,
          tooltipAccessor: this.props.tooltipAccessor,
          startAccessor: startAccessor,
          endAccessor: endAccessor,
          eventPropGetter: this.props.eventPropGetter,
          onSelect: this.handleSelectAlldayEvent,
          onDoubleClick: this.props.onDoubleClickEvent,
          onSelectSlot: this.handleSelectAllDaySlot,
          intervals: fifteenMinsInterval
        })
      ),
      _react2.default.createElement(_SingleDayContentGutter2.default, { timesRange: hourInterval })
    );
  };

  SingleDayGrid.prototype.clearSelection = function clearSelection() {
    clearTimeout(this._selectTimer);
    this._pendingSelection = [];
  };

  return SingleDayGrid;
}(_react.Component);

SingleDayGrid.propTypes = {
  events: _propTypes2.default.array.isRequired,
  resources: _propTypes2.default.array,

  step: _propTypes2.default.number,
  range: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date)),
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),

  eventPropGetter: _propTypes2.default.func,
  dayFormat: _propTypes3.dateFormat,
  culture: _propTypes2.default.string,

  titleAccessor: _propTypes3.accessor.isRequired,
  tooltipAccessor: _propTypes3.accessor.isRequired,
  startAccessor: _propTypes3.accessor.isRequired,
  endAccessor: _propTypes3.accessor.isRequired,
  selected: _propTypes2.default.object,
  selectable: _propTypes2.default.oneOf([true, false, 'ignoreEvents']),

  onSelectSlot: _propTypes2.default.func,
  onSelectEvent: _propTypes2.default.func,
  onDoubleClickEvent: _propTypes2.default.func,
  messages: _propTypes2.default.object,
  components: _propTypes2.default.object.isRequired,
  dayStartTime: _propTypes2.default.number,
  dayEndTime: _propTypes2.default.number,
  timeIntervalGetter: _propTypes2.default.func.isRequired
};
SingleDayGrid.defaultProps = {
  step: 30,
  timeslots: 2,
  min: _dates2.default.startOf(new Date(), 'day'),
  max: _dates2.default.endOf(new Date(), 'day'),
  scrollToTime: _dates2.default.startOf(new Date(), 'day'),
  defaultDate: new Date('0001-01-01'),
  dayStartTime: 0,
  dayEndTime: 24,
  timeIntervalGetter: _dates.TIME_INTERVAL
};
exports.default = SingleDayGrid;
module.exports = exports['default'];