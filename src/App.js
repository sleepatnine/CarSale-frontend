import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from "./components/AppRouter";
import authContext from "./context/authContext";
import useAuth from "./hooks/useAuth";

const App = () => {

  const {login, user, logout} = useAuth()
  
 const isAuth = !!user?.id;

  return (
    <authContext.Provider value={{ user,login, logout, isAuth }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </authContext.Provider>
  );
};

export default App;
