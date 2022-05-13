import AccountLogo from "../components/AccountLogo";
import authContext from "../context/authContext";
import {
  ADT_ROUTE,
  LOGIN_ROUTE,
  MARKET_ROUTE,
  LIKES_ROUTE,
  ADMIN_ROUTE,
} from "../utils/consts";
import { useHistory, NavLink } from "react-router-dom";
import { useContext } from "react";
import Button from "../components/Button";

const Header = () => {
  let history = useHistory();
  const { isAuth, user } = useContext(authContext);

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

  const onAmin = () => {
    history.push(ADMIN_ROUTE);
  };

  const onRefresh = () => {
    if (history.location.pathname == MARKET_ROUTE) {
      window.location.reload();
    }
  };

  return (
    <div className="header">
      <div className="market-logo">
        <NavLink to={MARKET_ROUTE} onClick={onRefresh}>
          CarSale
        </NavLink>
      </div>
      <div className="header-button">
        {isAuth ? (
          <AccountLogo />
        ) : (
          <Button stl={"login"} onClick={onAccount} text="Войти" />
        )}
        {/* <div onClick={logout}>Выход</div> */}
        {user?.role !== "ADMIN" ? (
          <Button stl={"green"} onClick={onAddAdt} text="Подать обьявление" />
        ) : (
          <Button stl={"adt"} onClick={onAmin} text="Перейти в админку" />
        )}
      </div>
    </div>
  );
};

export default Header;
