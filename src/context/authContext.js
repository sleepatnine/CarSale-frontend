import { createContext } from "react";

const authContext = createContext({
  id: null,
  email: "",
  firstName: "",
});

export default authContext;
