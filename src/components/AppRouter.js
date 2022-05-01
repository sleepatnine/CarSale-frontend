import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { authRoutes, notAuthRoutes, publicRoutes } from "../routes";
import { LOGIN_ROUTE, MARKET_ROUTE } from "./../utils/consts";
import authContext from "../context/authContext";
import Auth from "../pages/Auth";

const AppRouter = () => {
  const { isAuth } = useContext(authContext);
  return (
    <Switch>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {!isAuth &&
        notAuthRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={MARKET_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
