import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonPreset } from '../enums';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  preset?: ButtonPreset;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className, preset = ButtonPreset.Default, disabled = false }) => {
  const presetStyles = {
    [ButtonPreset.Default]: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
    [ButtonPreset.Register]: 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
  };

  const combinedStyles = twMerge(presetStyles[preset], className, disabled ? 'opacity-50 cursor-not-allowed' : '');

  return (
    <button
      onClick={onClick}
      className={combinedStyles}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;