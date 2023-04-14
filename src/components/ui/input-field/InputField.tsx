import React from "react";
import styles from "./InputField.module.scss";

interface IINPUT {
  id: string;
  name: string;
  type?: string;
  placeHolder: string;
  maximumLength: number;
  // handleChange: () => {};
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // size:;
}

const InputField: React.FC<IINPUT> = ({
  type,
  handleChange,
  placeHolder,
  maximumLength,
  ...rest
}) => {
  return (
    <input
      {...rest}
      className={`${styles["input-field"]}`}
      type={type}
      id={rest.id}
      name={rest.name}
      placeholder={placeHolder}
      onChange={handleChange}
      maxLength={maximumLength}
      required
    />
  );
};

export default InputField;
