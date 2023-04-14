import styles from "./Button.module.scss";

interface IBUTTON {
  text: string;
  buttonType: string;
  buttonClass: string;
  icon?: any;
  isDisabled?: boolean;
  onClickHandler?: () => void;
}

const Button: React.FC<IBUTTON> = ({
  buttonClass,
  buttonType,
  onClickHandler,
  icon,
  isDisabled,
  text,
  ...rest
}: any) => {
  return (
    <button
      {...rest}
      type={buttonType}
      text={text}
      className={`${styles["default-button"]} ${styles[`${buttonClass}`]}`}
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      {text}
      {/* {children} */}
    </button>
  );
};

export default Button;
