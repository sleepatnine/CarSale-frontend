import React, { useState } from "react";
import "../styles/Modal.css";
import Inputs from "../components/Inputs";
import Button from "./Button";
import { useFormik } from "formik";
import RegFormShema from "../shemas/RegFormShema";
import ModalInfo from "./ModalInfo";

const ModalEdit = ({ active, setActive, user, onOpenInfoModal}) => {
  const [inputName, setInputName] = useState(user.firstName);
  const [inputPhone, setInputPhone] = useState(user.phoneNumber);
  const [inputEmail, setInputEmail] = useState(user.email);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: RegFormShema,
  });

  const onEditUser = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:8080/api/v1/user/" + user.id, {
      method: "PUT",
      headers: {
        Accept: "applications/json,*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputEmail,
        firstName: inputName,
        phoneNumber: inputPhone,
      }),
    });

    if (result.ok) {      
      onOpenInfoModal(true)
      setActive(false);
    }
    // else {
    //   let dataJSON = await result.json();
    //   setData(dataJSON);
    // }
  };
  return (
    <div
      className={active ? "modal-edit active" : "modal-edit"}
      onClick={() => {
        setActive(false);
      }}
    >
      <div
        className={active ? "modal-content-edit active" : "modal-content-edit"}
        onClick={(e) => e.stopPropagation()}
      >
        Введите в поля данные которые хотите изменить <br />
        <br />
        <div className="center">
        Почта:&nbsp;&nbsp;
        <Inputs
          name="Email"
          stl={"edit-input"}
          value={inputEmail}
          setInput={setInputEmail}
        ></Inputs>
        <br />
        <br />
        Номер:&nbsp;
        <Inputs
          name="Number"
          stl={"edit-input"}
          value={inputPhone}
          setInput={setInputPhone}
        ></Inputs>
        <br />
        <br />
        Имя: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Inputs
          name="Name"
          stl={"edit-input"}
          value={inputName}
          setInput={setInputName}
        ></Inputs>
        <br /> <br />
        </div>
        <div className="edit">
        <Button
          stl={"adt"}
          text="Изменить информацию"
          onClick={onEditUser}
        ></Button>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
