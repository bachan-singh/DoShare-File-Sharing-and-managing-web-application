import React, { ChangeEvent, useState } from 'react';
import './Form.css';

export interface FormInputProps {
  id: number;
  name: string;
  type: string;
  isMessage?: boolean;
  placeholder?: string;
  errorMessage: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  label: string;
  required: boolean;
  value?: string;
  pattern?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  errorMessage,
  onChange,
  isMessage,
  id,
  type,
  ...inputProps
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="form-input">
      <label>{label}</label>
          <input
            type={type}
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            onFocus={() => inputProps.name === 'confirmpassword' && setFocused(true)}
            className={focused ? "focused" : ""}
          />
          <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
