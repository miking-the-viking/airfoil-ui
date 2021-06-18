import React from 'react';

export const airInputTestId = 'airfoilInput';
export const airInputErrorTestId = 'airfoilInputError';

type ErrorMessageProps = {
  level?: 'critical' | 'default';
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  level = 'default',
}) => {
  const color = `text-red-${level === 'critical' ? '1000' : '500'}`;
  return <div className={`text-xs ${color}`}>{children}</div>;
};

export default ErrorMessage;
