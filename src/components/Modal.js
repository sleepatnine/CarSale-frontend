import React from "react";
import "../styles/Modal.css";

const Modal = ({ active, setActive, user }) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => {
        setActive(false);
      }}
    >
      <div
        className={active ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation}
      >
        Имя: {user?.firstName}
        <br />
        Номер телефона: {user?.phoneNumber}
        <br />
        Почта: {user?.email}
        <br />
      </div>
    </div>
  );
};

export default Modal;
