// InputField.tsx
import React from "react";
import { InputFieldProps } from "./InputField.types";

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
}) => {
  // Use Tailwind CSS to apply classes based on props.
  const baseClasses = "w-full p-2 rounded focus:outline-none focus:ring-2";

  const variantClasses = {
    outlined: "border border-gray-400 bg-white focus:ring-blue-500",
    filled: "bg-gray-100 border border-gray-100 focus:ring-gray-300",
    ghost: "border border-transparent bg-transparent focus:ring-gray-300",
  }[variant];

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }[size];

  const stateClasses = invalid ? "border-red-500 focus:ring-red-500" : "";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const inputClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${stateClasses} ${disabledClasses}`;

  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type="text"
        className={inputClasses}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {invalid && errorMessage ? (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      ) : (
        helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default InputField;
