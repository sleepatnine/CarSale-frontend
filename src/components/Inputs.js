import React from "react";
import classnames from "classnames"
import "./../styles/inputs.css";

const Inpits = ({ name, setInput, stl, type}) => {

  let inputStyle = classnames("input", {
    "input--filter": stl == "filter",
    "input--addadt": stl == "adt-input",
    "input--descri": stl == "desc-input",
    "input--edit": stl == "edit-input",
    "input--data": stl == "admin-input"
  })
  

  return (
    <input
      className={inputStyle}
      placeholder={name}      
      type ={type}
      onChange={(e)=>{setInput(e.target.value) }}
    />
  );
};

export default Inpits;
