import AccountLogo from "../components/AccountLogo";
import authContext from "../context/authContext";
import {
  ADT_ROUTE,
  LOGIN_ROUTE,
  MARKET_ROUTE,
  LIKES_ROUTE,
} from "../utils/consts";
import { useHistory, NavLink } from "react-router-dom";
import { useContext } from "react";
import Button from "../components/Button";

const Header = () => {
  let history = useHistory();
  const { isAuth, logout } = useContext(authContext);

  const onAddAdt = () => {
    if (isAuth) {
      history.push(ADT_ROUTE);
    } else {
      history.push(LOGIN_ROUTE);
    }
  };

  const onAccount = () => {
    if (isAuth) {
      history.push(LIKES_ROUTE);
    } else {
      history.push(LOGIN_ROUTE);
    }
  };

  return (
    <div className="header">
      <div className="market-logo">
        <NavLink to={MARKET_ROUTE}>CarSale</NavLink>
      </div>
      <div className="header-button">
        {isAuth ? (
          <AccountLogo />
        ) : (
          <Button stl={"login"} onClick={onAccount} text="Войти" />
        )}
        {/* <div onClick={logout}>Выход</div> */}
        <Button stl={"adt"} onClick={onAddAdt} text="Подать обьявление" />
      </div>
    </div>
  );
};

export default Header;
