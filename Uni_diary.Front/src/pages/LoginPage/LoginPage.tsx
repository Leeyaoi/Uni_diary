import { Button, Container, TextField } from "@mui/material";
import React from "react";
import Header from "../../modules/Header/Header";
import Footer from "../../modules/Footer/Footer";
import "./LoginPage.scss";
import { HttpRequest } from "../../api/GenericApi";
import { RESTMethod } from "../../shared/types/RESTMethodEnum";

const LoginPage = () => {
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
            onClick={(event) => {
              event.preventDefault();
              if (login != "" && password != "") {
                HttpRequest({
                  uri: "/user/auth",
                  method: RESTMethod.Post,
                  item: { login: login, password: password },
                });
              }
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
