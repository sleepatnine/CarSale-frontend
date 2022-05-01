import React from "react";
import "./../styles/inputs.css"

const Inpits = ({ name, value }) => {
  return <input className="input-form-half" placeholder={name}>
    {value}
  </input>;
};

export default Inpits;
