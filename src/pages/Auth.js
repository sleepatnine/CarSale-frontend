import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import {
  MARKET_ROUTE,
  REGISTRATION_ROUTE,
} from "./../utils/consts";
import authContext from "../context/authContext";
import "./../styles/Auth.css";
import AuthFormShema from "../shemas/AuthFormShema";

const Auth = () => {
  const [data, setData] = useState(null);
  const auth = useContext(authContext);

  useEffect(() => {
    if (data) {
      let { id, email, firstName } = data;
      auth.login({
        id,
        email,
        firstName,
      });
      localStorage.setItem("user", JSON.stringify({ id, email, firstName }));
    }
  }, [data]);

  const onAuth = async (e,value) => {
    e.preventDefault();
    let result = await fetch("http://localhost:8080/api/v1/user/login", {
      method: "POST",
      headers: {
        Accept: "applications/json, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formik.values.email,
        password: formik.values.password,
      }),
    });
   
    let dataJSON = await result.json();
    setData(dataJSON);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: AuthFormShema,
  });

  return (
    <div className="main">
      <div className="container">
        <div className="content">
          <div className="image">
            <div className="logo">
              <NavLink to={MARKET_ROUTE}>CarSale</NavLink>
            </div>
            <img src="https://a.d-cd.net/Y2yjPOeCZayMFG4Ecs32pkkzPJ8-1920.jpg"></img>
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="form-input"
                />
              </div>
              <div className="error-valid-massage">
                &nbsp;
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null}
              </div>
              <div className="form-group">
                <img
                  className="icon"
                  src="https://img.icons8.com/fluency-systems-filled/344/forgot-password.png  "
                ></img>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="form-input"
                />
              </div>
              <div className="error-valid-massage">
                &nbsp;
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null}
              </div>
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
