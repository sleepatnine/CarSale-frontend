import React from "react";
import classnames from "classnames";

const Button = ({ text, onClick, stl }) => {
  let buttonStyle = classnames("button", {
    "button--signin": stl == "login",
    "button--addadt": stl == "adt",
    "button--showall": stl == "show-all",
    "button--filter": stl == "filter",
    "button--add": stl == "add", 
    "buttona--add": stl == "addphoto",
    "button--clear": stl == "clear",
  });

  return (
    <button className={buttonStyle} onClick={onClick} type="onSubmit">
      {text}
    </button>
  );
};

export default Button;
