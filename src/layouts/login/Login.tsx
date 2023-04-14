import styles from "./Login.module.scss";
import Navbar from "components/shared/navbar/Navbar";
import TitleText from "components/login/title/Title";
import LoginContainer from "components/login/login-container/LoginContainer";
const Login = () => {
  return (
    <div className={styles.login}>
      <Navbar />
      <div className={styles["welcome-text"]}>
        <span>welcome to...</span>
      </div>
      <TitleText />
      <LoginContainer />
      <div className={styles["version-no"]}>
        <span> © Experios - Release v1.0.0</span>
      </div>
    </div>
  );
};

export default Login;
