import React from "react";
import "../styles/Modal.css";

const ModalInfo = ({ active, setActive, info}) => {
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
       <h3 className="h3-align">{info}</h3>
      </div>
    </div>
  );
};

export default ModalInfo;
