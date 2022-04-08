import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import authContext from "./context/authContext";

const App = () => {
  const [auth, setAuth] = useState({
    id: null,
    email: "",
    firstName: "",
  });

  const isAuth = !!auth.id; // приводит значение к булиан типу

  return (
    <authContext.Provider value={{ auth, setAuth, isAuth }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </authContext.Provider>
  );
};

export default App;
