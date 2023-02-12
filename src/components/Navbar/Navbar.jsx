import React, {useContext} from "react";
import Toggle from "../Toggle/Toggle";
import { themeContext } from "../../context/useThemeContext";
const Navbar=()=>{
    const theme=useContext(themeContext);
    const darkMode=theme.state.darkMode;
    return(
        <nav  className="bg-transparent  ">
    <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
        <Toggle></Toggle>
       
    </div>
</nav>
    )
}
export default Navbar;