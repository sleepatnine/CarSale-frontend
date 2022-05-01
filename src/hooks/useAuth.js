import { useCallback, useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = useCallback((dataUser) => {
    setUser(dataUser);
  });

  const logout = () => {
    localStorage.clear();
    
  }

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      login(JSON.parse(localUser));
    }
  }, []);
  return { user, login, logout };
};

export default useAuth;
