import API from "axios/axios";
import styles from "./LoginContainer.module.scss";
import InputField from "components/ui/input-field/InputField";
// import ReactTooltip from "react-tooltip";
import Image from "next/image";
import Button from "components/ui/button/Button";
import React, { FormEvent, useState } from "react";
import NetworkManager from "services/api-services";
// import { withRouter } from "next/router";
// import { withRouter, RouteComponentProps } from "react-router-dom";
import { useRouter } from "next/router";

const LoginContainer: React.FC = () => {
  const router = useRouter();
  const [gameCode, setGameCode] = useState("");
  const [name, setName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [serverStatus, checkServerStatus] = React.useState<string>("");
  const [hasError, setError] = React.useState<boolean>(true);

  function handleGameCodeChange(event: any) {
    // console.log("event is:   ", event);
    setGameCode(event.target.value);
    if (event.target.value.length === 8 && name) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }
  function handleNameChange(event: any) {
    // console.log("inside name event is:   ", event);
    setName(event.target.value);
    if (event.target.value.length > 0 && gameCode.length === 8) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  const onTestConnectionClick = async () => {
    try {
      await NetworkManager.HealthCheck();
      setError(false);
      checkServerStatus("Connection Successful");
    } catch (error) {
      setError(true);
      checkServerStatus("Server Connection failed");
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    let response = null;
    let serverHealth = true;
    //checking server health
    try {
      console.log("here is in checking server health");
      response = await NetworkManager.HealthCheck();
      setError(false);
      checkServerStatus("Connection Successful");
    } catch (error) {
      serverHealth = false;
      setError(true);
      checkServerStatus("Server Connection failed");
    }
    if (serverHealth) {
      try {
        console.log("here in login");
        console.log("gameCode is:  ", gameCode);
        response = await NetworkManager.Login(gameCode);
        // console.log("here in login resoponse is:....", response.data);
      } catch (err) {
        setError(true);
        checkServerStatus("Invalid game code provided");
        return;
      }
      if (response.status === 200) {
        console.log("here in login if block");
        router.push("/menu");
      }
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["text"]}>
        <span>{`ENTER YOUR NAME AND GAMECODE TO GET QUIZZIN'`}</span>
      </div>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div className={styles.InputField1}>
          <InputField
            type="text"
            id="code"
            name="code"
            handleChange={handleGameCodeChange}
            placeHolder="ENTER YOUR GAME CODE"
            maximumLength={8}
          />

          <Image
            className={`${styles["icon1"]} ${styles["tooltip"]}`}
            src="login/QuestionMark.svg"
            alt=""
            title=" Your game code is 8 characters long"
            width={30}
            height={30}
          ></Image>
        </div>
        <div className={styles.InputField2}>
          <InputField
            type="text"
            id="name"
            name="name"
            handleChange={handleNameChange}
            placeHolder="ENTER YOUR NAME"
            maximumLength={15}
          />
          <Image
            className={`${styles["icon2"]} ${styles["tooltip"]}`}
            src="login/QuestionMark.svg"
            alt=""
            title="Your gaming name can be funny!!!"
            width={30}
            height={30}
          ></Image>
        </div>
        <div className={styles["button-container"]}>
          <Button
            buttonClass="test-connection-button"
            text="TEST CONNECTION"
            buttonType="button"
            onClickHandler={onTestConnectionClick}
          ></Button>
          <Button
            buttonClass="login-button"
            text="CONNECT"
            buttonType="submit"
            isDisabled={isDisabled}
          ></Button>
        </div>
      </form>
      <div
        className={`${styles[hasError ? "error-text" : "success-text"]} ${
          styles[
            serverStatus ? "hide-connection-status" : "show-connection-status"
          ]
        }`}
      >
        <span>{serverStatus} &nbsp;</span>
      </div>
    </div>
  );
};

export default LoginContainer;
