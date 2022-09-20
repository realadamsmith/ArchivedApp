import React from 'react';
import './styles.scss';

const Buttons2 = ({ children, ...otherProps }) => {
  return (
    <button className="btn2" {...otherProps}>
      {children}
    </button>
  );
}

export default Buttons2