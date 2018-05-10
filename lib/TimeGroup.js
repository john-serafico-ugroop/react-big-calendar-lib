'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeGroup = function (_Component) {
  _inherits(TimeGroup, _Component);

  function TimeGroup() {
    _classCallCheck(this, TimeGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TimeGroup.prototype.render = function render() {
    var _props = this.props,
        groupClassName = _props.groupClassName,
        totalSlots = _props.totalSlots,
        renderSlot = _props.renderSlot,
        value = _props.value;


    return _react2.default.createElement(
      'div',
      { className: groupClassName },
      totalSlots.map(function (time, idx) {
        return renderSlot(value, idx);
      })
    );
  };

  return TimeGroup;
}(_react.Component);

TimeGroup.propTypes = {
  renderSlot: _propTypes2.default.func,
  value: _propTypes2.default.number,
  groupClassName: _propTypes2.default.string,
  totalSlots: _propTypes2.default.array
};
TimeGroup.defaultProps = {
  totalSlots: [0, 1, 2, 3]
};
exports.default = TimeGroup;
module.exports = exports['default'];