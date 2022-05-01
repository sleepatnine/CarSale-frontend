import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MARKET_ROUTE, LOGIN_ROUTE } from "./../utils/consts";
import "./../styles/Registration.css";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import RegFormShema from "../shemas/RegFormShema";

const Registration = () => {
  const [data, setData] = useState(null);

  let history = useHistory();

  const onRegistration = async (e, values) => {
    e.preventDefault();
    let result = await fetch("http://localhost:8080/api/v1/user/register", {
      method: "POST",
      headers: {
        Accept: "applications/json,*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formik.values.email,
        firstName: formik.values.firstName,
        phoneNumber: formik.values.phoneNumber,
        password: formik.values.password,
      }),
    });

    if (result.ok) {
      history.push(LOGIN_ROUTE);
    } else {
      let dataJSON = await result.json();
      setData(dataJSON);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      phoneNumber: "",
      password: "",
      email: "",
    },
    validationSchema: RegFormShema,
  });

  return (
    <div className="main">
      <div className="reg-container">
        <div className="reg-content">
          <div className="reg-form">
            <form onSubmit={onRegistration}>
              <h2>Регистрация</h2>
              <div className="reg-form-group">
                <img
                  className="reg-icon"
                  src="https://img.icons8.com/ios-glyphs/344/contacts.png"
                ></img>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  className="reg-form-input"
                />
                <div className="error-valid-massage">
                  &nbsp;
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null}
                </div>
              </div>
              <div className="reg-form-group">
                <img
                  className="reg-icon"
                  src="https://img.icons8.com/material/344/face-id--v1.png"
                ></img>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  name="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="reg-form-input"
                />
                <div className="error-valid-massage">
                  &nbsp;
                  {formik.touched.firstName && formik.errors.firstName
                    ? formik.errors.firstName
                    : null}
                </div>
              </div>
              <div className="reg-form-group">
                <img
                  className="reg-icon"
                  src="https://img.icons8.com/fluency-systems-regular/344/call-squared.png"
                ></img>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  name="phoneNumber"
                  type="tel"
                  placeholder="Введите номер телефона"
                  className="reg-form-input"
                />
                <div className="error-valid-massage">
                  &nbsp;
                  {formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? formik.errors.phoneNumber
                    : null}
                </div>
              </div>
              <div className="reg-form-group">
                <img
                  className="reg-icon"
                  src="https://img.icons8.com/material/344/password--v1.png"
                ></img>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  className="reg-form-input"
                />
                <div className="error-valid-massage">
                  &nbsp;
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null}
                </div>
              </div>
              <div className="reg-form-group">
                <img
                  className="reg-icon"
                  src="https://img.icons8.com/material-outlined/344/password.png"
                ></img>
                <input
                  className="reg-form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.secPassword}
                  name="secPassword"
                  type="password"
                  placeholder="repeat password"
                />
                <div className="error-valid-massage">
                  &nbsp;
                  {formik.touched.secPassword && formik.errors.secPassword
                    ? formik.errors.secPassword
                    : null}
                </div>
                {data?.message ? (
                  <div style={{ color: "red" }}>{data.message}</div>
                ) : null}
              </div>
              <button className="reg-button" type="submit">
                Зарегестроваться
              </button>
            </form>
          </div>
          <div className="image">
            <div className="reg-logo">
              <NavLink to={MARKET_ROUTE}>CarSale</NavLink>
            </div>
            <img src="https://a.d-cd.net/twAAAgLKeOA-960.jpg"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
