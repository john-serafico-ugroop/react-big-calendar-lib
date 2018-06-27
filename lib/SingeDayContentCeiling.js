'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes3 = require('./utils/propTypes');

var _eventLevels2 = require('./utils/eventLevels');

var _EventRow = require('./EventRow');

var _EventRow2 = _interopRequireDefault(_EventRow);

var _height = require('dom-helpers/query/height');

var _height2 = _interopRequireDefault(_height);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  events: _propTypes2.default.array.isRequired,
  range: _propTypes2.default.array.isRequired,
  renderForMeasure: _propTypes2.default.bool,

  onSelectSlot: _propTypes2.default.func,

  startAccessor: _propTypes3.accessor.isRequired,
  endAccessor: _propTypes3.accessor.isRequired,

  eventComponent: _propTypes3.elementType,
  eventWrapperComponent: _propTypes3.elementType.isRequired,
  minRows: _propTypes2.default.number.isRequired,
  maxRows: _propTypes2.default.number.isRequired,
  intervals: _propTypes2.default.array
};

var defaultProps = {
  minRows: 0,
  maxRows: Infinity
};

var SingeDayContentCeiling = function (_React$Component) {
  _inherits(SingeDayContentCeiling, _React$Component);

  function SingeDayContentCeiling() {
    var _temp, _this, _ret;

    _classCallCheck(this, SingeDayContentCeiling);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleSelectSlot = function (slot) {
      var _this$props = _this.props,
          range = _this$props.range,
          onSelectSlot = _this$props.onSelectSlot;


      onSelectSlot(range.slice(slot.start, slot.end + 1), slot);
    }, _this.createHeadingRef = function (r) {
      _this.headingRow = r;
    }, _this.createEventRef = function (r) {
      _this.eventRow = r;
    }, _this.renderDummy = function () {
      var className = _this.props.className;

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'div',
          { className: 'rbc-row-content-singleDay' },
          _react2.default.createElement(
            'div',
            { className: 'rbc-ceiling', ref: _this.createEventRef },
            _react2.default.createElement(
              'div',
              { className: 'rbc-row-segment' },
              _react2.default.createElement(
                'div',
                { className: 'rbc-event' },
                _react2.default.createElement(
                  'div',
                  { className: 'rbc-event-content' },
                  '\xA0'
                )
              )
            )
          )
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SingeDayContentCeiling.prototype.getRowLimit = function getRowLimit() {
    var eventHeight = (0, _height2.default)(this.eventRow);
    var headingHeight = this.headingRow ? (0, _height2.default)(this.headingRow) : 0;
    var eventSpace = (0, _height2.default)((0, _reactDom.findDOMNode)(this)) - headingHeight;

    return Math.max(Math.floor(eventSpace / eventHeight), 1);
  };

  SingeDayContentCeiling.prototype.render = function render() {
    var _props = this.props,
        events = _props.events,
        range = _props.range,
        className = _props.className,
        renderForMeasure = _props.renderForMeasure,
        startAccessor = _props.startAccessor,
        endAccessor = _props.endAccessor,
        eventComponent = _props.eventComponent,
        eventWrapperComponent = _props.eventWrapperComponent,
        intervals = _props.intervals,
        minRows = _props.minRows,
        maxRows = _props.maxRows,
        props = _objectWithoutProperties(_props, ['events', 'range', 'className', 'renderForMeasure', 'startAccessor', 'endAccessor', 'eventComponent', 'eventWrapperComponent', 'intervals', 'minRows', 'maxRows']);

    if (renderForMeasure) return this.renderDummy();

    var _endOfRange = (0, _eventLevels2.endOfRange)(range),
        first = _endOfRange.first,
        last = _endOfRange.last;

    var segments = this.segments = events.map(function (evt) {
      return (0, _eventLevels2.singleDayPinSegments)(evt, first, last, {
        startAccessor: startAccessor
      }, intervals);
    });

    var _eventLevels = (0, _eventLevels2.eventLevels)(segments, Math.max(maxRows - 1, 1)),
        levels = _eventLevels.levels;

    while (levels.length < minRows) {
      levels.push([]);
    }return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(
        'div',
        { className: 'rbc-row-content-singleDay' },
        levels.map(function (segs, idx) {
          return _react2.default.createElement(_EventRow2.default, _extends({
            fixedSpan: true
          }, props, {
            key: idx,
            start: first,
            end: last,
            segments: segs,
            slots: intervals.length,
            eventComponent: eventComponent,
            eventWrapperComponent: eventWrapperComponent,
            startAccessor: startAccessor,
            endAccessor: endAccessor
          }));
        })
      )
    );
  };

  return SingeDayContentCeiling;
}(_react2.default.Component);

SingeDayContentCeiling.propTypes = propTypes;
SingeDayContentCeiling.defaultProps = defaultProps;

exports.default = SingeDayContentCeiling;
module.exports = exports['default'];