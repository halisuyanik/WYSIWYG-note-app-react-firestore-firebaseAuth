import React, { useContext } from "react";
import "./Toggle.css"
import Moon from "@iconscout/react-unicons/icons/uil-moon";
import Sun from "@iconscout/react-unicons/icons/uil-sun";
import { themeContext } from "../../context/useThemeContext";

const Toggle = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const handleClick = () => {
    // debugger
    theme.dispatch({ type: "toggle" });
  };

  return (
    <div className="toggle" onClick={handleClick}>
        {darkMode?<Sun></Sun>:<Moon></Moon>}

    </div>
  );
};
export default Toggle;
