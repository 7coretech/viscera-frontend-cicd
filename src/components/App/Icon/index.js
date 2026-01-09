import React from 'react';
import PropTypes from 'prop-types';
import iconConfig from './icons';

const propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string
};

const defaultProps = {
  name: '',
  size: 0,
  color: 'inherit'
};

const MyDynamicIcon = ({ name, size, color, ...props }) => {
  const IconComponent = iconConfig[name];
  if (!IconComponent) return null;

  let styles = {
    ...(props?.style ? props?.style : {}),
    color,
  };
  if (size && size > 0) {
    styles = {
      ...styles,
      width: `${size}px`,
      height: `${size}px`,
    };
  }

  return <IconComponent {...props} style={styles} />;
};

MyDynamicIcon.propTypes = propTypes;
MyDynamicIcon.defaultProps = defaultProps;

export default MyDynamicIcon;
