import React from "react";
import classnames from "classnames"


const Button = ({ text,onClick,stl}) => {
  let buttonStyle = classnames("button", {
    "button--signin": stl == "login",
    "button--addadt": stl == "adt",
    "button--showall": stl == "show-all",
    "button--filter": stl == "filter"
  })

  return (
      <button className={buttonStyle} onClick={onClick} type="onSubmit">{text}</button>
  );
};

export default Button;