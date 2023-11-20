// InputField.tsx
import React, { ChangeEvent, HTMLProps } from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (newValue: string) => void;
  className: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder, className, required }) => {
  const defaultClasses = "block border-solid rounded-[10px] border-[2px] px-[19px] py-[9px] w-[100%]";
  const combinedClasses = className ? `${defaultClasses} ${className}` : defaultClasses;
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={className}>
      <label htmlFor="inputField" className='font-bold'>{label}</label>
      <input
        className={defaultClasses}
        type="text"
        id="inputField"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputField;
