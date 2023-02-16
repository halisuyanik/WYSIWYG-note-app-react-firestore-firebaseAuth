import React, {useContext} from "react";
import Toggle from "../Toggle/Toggle";
import { themeContext } from "../../context/useThemeContext";
import { useAuthContext } from "../../hooks/authHooks";
const Navbar=()=>{
    const theme=useContext(themeContext);
    const darkMode=theme.state.darkMode;
    const {dispatch}=useAuthContext();
    const {user}=useAuthContext();
    async function handleLogout(){
        localStorage.removeItem('user');
        dispatch({
            type:'LOGOUT'
        })
    }
    return(
        <nav  className="bg-transparent  ">
    <div className="space-x-5 container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Toggle></Toggle>
        {user?<button onClick={()=>handleLogout()} className="justify-end" href="/login">Logout</button>:null}
       
    </div>
</nav>
    )
}
export default Navbar;