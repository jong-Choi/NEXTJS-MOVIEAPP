import React, { useEffect } from "react";

interface iProps {
  name?: string;
  type?: "text" | "email" | "password";
  placeholder: string;
  disabled?: boolean;
  state?: any;
  setState?: Function;
  label?: string;
  children?: any;
}

const Input = ({
  name = "text",
  type = "text",
  placeholder,
  disabled = false,
  state = "",
  setState = () => {},
  label = "",
  children,
}: iProps) => {
  return (
    <div className="form-floating">
      <input
        className="form-control text-center"
        type={type}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <label htmlFor="floatingInput">{label || placeholder}</label>
      {children}
    </div>
  );
};

export default React.memo(Input);
