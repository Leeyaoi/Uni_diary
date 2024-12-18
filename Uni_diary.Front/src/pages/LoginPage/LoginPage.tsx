import { Button, Container, TextField } from "@mui/material";
import React, { useEffect } from "react";
import "./LoginPage.scss";
import { useAppDispatch, useAppSelector } from "../../shared/stores/store";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../shared/stores/userSlice";
import Cookies from "universal-cookie";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  let [user, loading] = useAppSelector((state) => [
    state.user.currentUser,
    state.user.loading,
  ]);
  const cookies = new Cookies();

  useEffect(() => {
    if (!user && cookies.get("accessToken")) {
      dispatch(userActions.userLoginByToken());
    }
  }, []);

  useEffect(() => {
    if (user && cookies.get("accessToken") && !loading) {
      navigate("/profile");
    }
  }, [useAppSelector((state) => state.user.currentUser)]);

  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [clicked, setIsClicked] = React.useState(false);

  const handleLoginChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value);
  };

  const navigate = useNavigate();

  return (
    <div id="login-form">
      <TextField
        label="Логин"
        variant="outlined"
        value={login}
        onChange={handleLoginChange}
        error={clicked && login === ""}
        helperText={
          clicked && login === "" ? "Логин не может быть пустым" : " "
        }
      />
      <TextField
        label="Пароль"
        variant="outlined"
        value={password}
        onChange={handlePasswordChange}
        error={clicked && password === ""}
        helperText={
          clicked && password === "" ? "Пароль не может быть пустым" : " "
        }
      />
      {clicked && user === null ? (
        <p id="error">Логин или пароль введены неверно</p>
      ) : (
        <></>
      )}
      <Button
        variant="contained"
        onClick={async (event) => {
          event.preventDefault();
          setIsClicked(true);
          if (login == "" || password == "") {
            return;
          }
          dispatch(userActions.userLogin({ login: login, password: password }));
        }}
      >
        Войти
      </Button>
    </div>
  );
};

export default LoginPage;
