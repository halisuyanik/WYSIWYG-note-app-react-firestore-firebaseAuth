import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";

export const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const [state, dispatch]=useReducer(authReducer,{
        user:null
    })
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        if(user){
            dispatch({type:'SIGNIN', payload:user})
        }
    },[])
    console.log('authcontext:', state)
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
