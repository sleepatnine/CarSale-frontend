import { createContext } from "react";

const authContext = createContext({
  user: {},
  login: ()=>{},
});



export default authContext;
