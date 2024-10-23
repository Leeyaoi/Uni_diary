import { Button, Container, TextField } from "@mui/material";
import React from "react";
import Header from "../../modules/Header/Header";
import Footer from "../../modules/Footer/Footer";
import "./LoginPage.scss";
import { useAppDispatch } from "../../shared/stores/store";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../shared/stores/userSlice";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

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
    <Container className="container">
      <Header />
      <div id="content">
        <div id="login-form">
          <TextField
            label="Логин"
            variant="outlined"
            value={login}
            onChange={handleLoginChange}
          />
          <TextField
            label="Пароль"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            variant="contained"
            onClick={async (event) => {
              event.preventDefault();
              if (login == "" || password == "") {
                return;
              }
              dispatch(
                userActions.userLogin({ login: login, password: password })
              ).then(() => {
                navigate("/profile");
              });
            }}
          >
            Войти
          </Button>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default LoginPage;
