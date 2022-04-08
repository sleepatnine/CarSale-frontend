import React, { useState, useContext, useEffect } from "react";
import useInput from "./../hooks/useInput";
import { NavLink } from "react-router-dom";
import {
  MARKET_ROUTE,
  LIKES_ROUTE,
  REGISTRATION_ROUTE,
} from "./../utils/consts";
import authContext from "../context/authContext";
import "./Auth.css";

const Auth = () => {
  const email = useInput("", { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 6, maxLength: 16 });

  const [data, setData] = useState(null);
  const login = useContext(authContext);

  useEffect(() => {
    if (data !== null) {
      let { id, email, firstName } = data;
      login.setAuth({
        id,
        email,
        firstName,
      });
    }
  }, [data]);

  const onAuth = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:8080/api/v1/user/login", {
      method: "POST",
      headers: {
        Accept: "applications/json, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    let dataJSON = await result.json();
    console.log(dataJSON);
    setData(dataJSON);
  };

  return (
    <div className="main">
      <div className="container">
        <div className="content">
          <div className="image">
            <div className="logo">
              <NavLink to={MARKET_ROUTE}>CarSale</NavLink>
            </div>

            <img src="https://a.d-cd.net/twAAAgLKeOA-960.jpg"></img>
            <div className="reg-link">
              <NavLink to={REGISTRATION_ROUTE}>Зарегестроваться!</NavLink>
            </div>
          </div>

          <div className="form">
            <h2 className="title">Авторизация</h2>
            <form onSubmit={onAuth}>
              <div className="form-group">
                <img
                  className="icon"
                  src="https://img.icons8.com/ios-glyphs/344/contacts.png"
                ></img>
                <input
                  onChange={(e) => email.onChange(e)}
                  onBlur={(e) => email.onBlur(e)}
                  value={email.value}
                  name="email"
                  type="text"
                  placeholder="Enter email"
                  className="form-input"
                />
              </div>
              {email.isDirty && email.isEmpty && (
                <div style={{ color: "red" }}>Поле не заполнено</div>
              )}
              {email.isDirty && email.emailError && (
                <div style={{ color: "red" }}>Неккоректно введён майл</div>
              )}
              <div className="form-group">
                <img
                  className="icon"
                  src="https://img.icons8.com/ios-glyphs/344/password--v1.png"
                ></img>
                <input
                  onChange={(e) => password.onChange(e)}
                  onBlur={(e) => password.onBlur(e)}
                  value={password.value}
                  name="password"
                  type="text"
                  placeholder="Enter password"
                  className="form-input"
                />
              </div>
              {password.isDirty && password.isEmpty && (
                <div style={{ color: "red" }}>Поле не заполнено</div>
              )}
              <button className="login-button" type="submit">
                Войти
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
