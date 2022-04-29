import React,{useContext} from "react"
import "./../styles/Account.css"
import authContext from "../context/authContext";

const AccountLogo = () =>{
    
    const user = useContext(authContext);

    return(
        <div className="account-bar">
            <div>
                {user.user.firstName}
            </div>
            <div className="account-logo" >
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
            </div>
        </div>
    )
}

export default AccountLogo;