import React from 'react';
import PropTypes from 'prop-types';

export default class Icon extends React.PureComponent {

  static props = {
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    shape: PropTypes.oneOf(['rect', 'circle']).isRequired,
    border: PropTypes.bool.isRequired,
    borderColor: PropTypes.string.isRequired,
    family: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    padding: PropTypes.number.isRequired
  };

  static defaultProps = {
    size: 20,
    color: '',
    bgColor: '#EEE',
    shape: 'rect',
    border: false,
    borderColor: '',
    family: 'iconfont',
    type: '',
    padding: 0
  };

  render() {

    const { size, color, bgColor, shape, border, borderColor, family, type, className, padding } = this.props;
    const iconStyle = {
      fontSize: size,
      color: color,
    };

    if (border) {
      const wrapperStyle = {
        border: 'solid 1px ' + (borderColor || color),
        borderRadius: shape == 'circle' ? (size + padding * 2) / 2 : 0,
        display: 'inline-block',
        padding: padding,
        backgroundColor: bgColor
      };

      return (
        <div style={wrapperStyle}>
          <i className={family + ' icon-' + type} style={iconStyle} />
        </div>
      );
    } 
    else {
      return (
        <i className={family + ' icon-' + type + ' ' + className} style={iconStyle} />
      )
    }
  }
}