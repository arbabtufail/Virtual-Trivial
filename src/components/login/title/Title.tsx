import styles from "./Title.module.scss";

const TitleText = () => {
  return (
    <div className={styles["title-text-container"]}>
      <span>VIRTUAL TRIVIA!</span>
    </div>
  );
};
export default TitleText;
