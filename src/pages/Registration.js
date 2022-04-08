import React, { useState } from "react";
import useInput from "./../hooks/useInput";
import { NavLink } from "react-router-dom";
import { MARKET_ROUTE, LIKES_ROUTE } from "./../utils/consts";

const Registration = () => {
  const email = useInput("", { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput("", { isEmpty: true, minLength: 8, maxLength: 20 });
  const firstName = useInput("", { isEmpty: true, minLength: 2 });
  const secPassword = useInput("", { isEmpty: true, isSame: true });
  const phoneNumber = useInput("", { isEmpty: true });

  const [data, setData] = useState(null);

  const onRegistration = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:8080/api/v1/user/register", {
      method: "POST",
      headers: {
        Accept: "applications/json,*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        firstName: firstName.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
      }),
    });

    let dataJSON = await result.json();
    console.log(dataJSON);
    setData(dataJSON);
  };

  return (
    <div>
      <form onSubmit={onRegistration}>
        <h1>Регистрация</h1>
        <input
          onChange={(e) => email.onChange(e)}
          onBlur={(e) => email.onBlur(e)}
          value={email.value}
          name="email"
          type="text"
          placeholder="Enter email"
        />
        {email.isDirty && email.isEmpty && (
          <div style={{ color: "red" }}>Поле не заполнено</div>
        )}
        {email.isDirty && email.minLengthError && (
          <div style={{ color: "red" }}>Слишком короткий майл</div>
        )}
        {email.isDirty && email.emailError && (
          <div style={{ color: "red" }}>Неккоректно введён майл</div>
        )}
        {firstName.isDirty && firstName.isEmpty && (
          <div style={{ color: "red" }}>Поле не заполнено</div>
        )}
        {firstName.isDirty && firstName.minLengthError && (
          <div style={{ color: "red" }}>
            Имя не может быть короче 2 символов
          </div>
        )}
        <input
          onChange={(e) => firstName.onChange(e)}
          onBlur={(e) => firstName.onBlur(e)}
          value={firstName.value}
          name="email"
          type="text"
          placeholder="Enter first name"
        />
        {password.isDirty && password.isEmpty && (
          <div style={{ color: "red" }}>Поле не заполнено</div>
        )}
        {password.isDirty && password.minLengthError && (
          <div style={{ color: "red" }}>Слишком короткий пароль</div>
        )}
        {password.isDirty && password.maxLengthError && (
          <div style={{ color: "red" }}>слишком длинный пароль</div>
        )}
        {phoneNumber.isDirty && phoneNumber.isEmpty && (
          <div style={{ color: "red" }}>Поле не заполнено</div>
        )}
        <input
          onChange={(e) => phoneNumber.onChange(e)}
          onBlur={(e) => phoneNumber.onBlur(e)}
          value={phoneNumber.value}
          name="phoneNumber"
          type="text"
          placeholder="Введите номер телефона"
        />
        <input
          onChange={(e) => password.onChange(e)}
          onBlur={(e) => password.onBlur(e)}
          value={password.value}
          name="password"
          type="text"
          placeholder="Enter password"
        />
        {secPassword.isDirty && secPassword.isEmpty && (
          <div style={{ color: "red" }}>Поле не заполнено</div>
        )}
        <input
          onChange={(e) => secPassword.onChange(e)}
          onBlur={(e) => secPassword.onBlur(e)}
          value={secPassword.value}
          name="secondPassword"
          type="text"
          placeholder="repeat password"
        />
        {password.value !== secPassword.value && (
          <div style={{ color: "red" }}>пароли не совпадают</div>
        )}
        <div>
          <NavLink to={MARKET_ROUTE}>LOGO</NavLink>
        </div>
        <div>
          <NavLink to={LIKES_ROUTE}>LIKES</NavLink>
        </div>
        {data.message ? <div  style={{ color: "red" }}>{data.message}</div> : null}
        <button type="submit">Registration</button>
      </form>
    </div>
  );
};

export default Registration;
