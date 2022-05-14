import React, { useState } from "react";
import "../styles/Modal.css";
import Inputs from "../components/Inputs";
import Button from "./Button";
import ModalInfo from "./ModalInfo";

const ModalPass = ({ active, setActive, user, onOpenInfoModal}) => {
  const [inputPass, setInputPass] = useState("");
  const [inputOldPass, setInputOldPass] = useState(user.password);
  const [modalActiveInfo , setModalActiveInfo] = useState(false)

  const onEditUser = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:8080/api/v1/user/" + user.id+ "/password", {
      method: "PUT",
      headers: {
        Accept: "applications/json,*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: inputOldPass,
        password: inputPass, 
      }),
    });

    if (result.ok) {      
      onOpenInfoModal(true)
      setActive(false);
    }
    else{
      
      setModalActiveInfo(true);
      
    }
  };

  console.log(modalActiveInfo)

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
        Введите данные для изменения <br />
        <br />
        <div className="center-pass">
        Старый пароль:&nbsp;&nbsp;
        <Inputs
          name="Old pass"
          type={"password"}
          stl={"edit-input"}
          value={inputOldPass}
          setInput={setInputOldPass}
        ></Inputs>
        <br />
        <br />
        Новый пароль:&nbsp;&nbsp;&nbsp;&nbsp;
        <Inputs
          type={"password"}
          name="New pass"
          stl={"edit-input"}
          value={inputPass}
          setInput={setInputPass}
        ></Inputs>
        <br />
        <br />
        
        </div>
        <div className="edit">
        <Button
          stl={"adt"}
          text="Изменить пароль"
          onClick={onEditUser}
        ></Button>
        </div>
      </div>
      <ModalInfo
        active={modalActiveInfo}
        setActive={setModalActiveInfo}
        info={"Данные введены некорректно, повторите заново"}
      ></ModalInfo>
    </div>
  );
};

export default ModalPass;
