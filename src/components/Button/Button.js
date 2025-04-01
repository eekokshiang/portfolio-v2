import React from 'react';

import './Button.scss';

function Button({
  children,
  className = '',
  disabled = false,
  iconPosition = 'left',
  icon: Icon,
  onClick,
  type = 'button',
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${className}`}
      type={type}
      {...rest}
    >
      {Icon && iconPosition === 'left' && <Icon />}
      {children}
      {Icon && iconPosition === 'right' && <Icon />}
    </button>
  );
}

export default Button;
