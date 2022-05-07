import React, { useContext } from "react";
import "./../styles/Account.css";
import authContext from "../context/authContext";
import { NavLink } from "react-router-dom";
import { LIKES_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import Likes from "../pages/Likes";

const AccountLogo = () => {
  const user = useContext(authContext);

  return (
    <div className="account-bar">
      <div className="account-bar">
        <div>{user.user.firstName}</div>
        <div className="account-logo">
          <NavLink to={PROFILE_ROUTE}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
          </NavLink>
        </div>
      </div>
      {Likes && (
        <div className="likes-logo">
          <NavLink to={LIKES_ROUTE}>
            <img src="https://img.icons8.com/ios-filled/452/heart-plus.png" />
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default AccountLogo;
