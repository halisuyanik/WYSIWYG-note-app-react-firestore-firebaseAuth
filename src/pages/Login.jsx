import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import {useAuthStore} from '../store/AuthStore'
import { useFormik } from 'formik';
import { useContext } from 'react';
import { themeContext } from '../context/useThemeContext';
import {emailValidate} from '../utilities/validate'
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";

export default function Login() {
    
    const theme=useContext(themeContext);
    const darkMode=theme.state.darkMode;
    const navigate=useNavigate();
    const setEmail=useAuthStore(state=>state.setEmail)
    const formik = useFormik({
        initialValues : {
          email : ''
        },
        validate:emailValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values => {
          setEmail(values.email)
          navigate('/password')    
        }
      })
    
      return (
        <>
          {/* Page Container */}
          <div style={{
      background: darkMode ? "#101726" : "white", color:"black"
    }} id="page-container" className="flex flex-col mx-auto w-full min-h-screen bg-gray-100">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            {/* Page Content */}
            <main id="page-content" className="flex flex-auto flex-col max-w-full">
              <div className="min-h-screen flex items-center justify-center relative overflow-hidden max-w-10xl mx-auto p-4 lg:p-8 w-full">
                {/* Patterns Background */}
                <div className="pattern-dots-md text-gray-300 absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48 transform translate-x-16 translate-y-16" />
                <div className="pattern-dots-md text-gray-300 absolute bottom-0 left-0 w-32 h-32 lg:w-48 lg:h-48 transform -translate-x-16 -translate-y-16" />
                {/* END Patterns Background */}
    
                {/* Sign In Section */}
                <div className="py-6 lg:py-0 w-full md:w-8/12 lg:w-6/12 xl:w-4/12 relative">
                  {/* Header */}
                  <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold inline-flex items-center mb-1 space-x-3">
                      <svg className="hi-solid hi-cube-transparent inline-block w-8 h-8 text-teal-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z" clipRule="evenodd" /></svg>
                      {/* <span>Company</span> */}
                    </h1>
                    <p className="text-gray-500">
                      Welcome, please sign in to your dashboard
                    </p>
                  </div>
                  {/* END Header */}
    
                  {/* Sign In Form */}
                  <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
                    <div className="p-5 lg:p-6 grow w-full">
                      <div className="sm:p-5 lg:px-10 lg:py-8">
                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        
                          <div className="space-y-1">
                            <label htmlFor="email" name="email" className="font-medium">Email</label>
                            <input {...formik.getFieldProps('email')} className="block border
                             border-gray-200 rounded px-5 py-3 leading-6 w-full focus:border-teal-500 focus:ring
                              focus:ring-teal-500 focus:ring-opacity-50" type="email" id="email" name="email" placeholder="Enter your email" />  
                          </div>
                         
                          <div>
                            <button type="submit" className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none w-full px-4 py-3 leading-6 rounded border-teal-700 bg-teal-700 text-white hover:text-white hover:bg-teal-800 hover:border-teal-800 focus:ring focus:ring-teal-500 focus:ring-opacity-50 active:bg-teal-700 active:border-teal-700">
                              Continue
                            </button>
                            <div className="space-y-2 sm:flex sm:items-center sm:justify-between sm:space-x-2 sm:space-y-0 mt-4">
                              {/* <label className="flex items-center">
                                <input type="checkbox" id="remember_me" name="remember_me" className="border border-gray-200 rounded h-4 w-4 text-teal-500 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" />
                                <span className="ml-2">
                                  Remember me
                                </span>
                              </label> */}
                              {/* <Link href="#" className="inline-block text-teal-600 hover:text-teal-400">Forgot Password?</Link> */}
                            </div>
                          </div>
                        </form>          
                      </div>
                    </div>        
                    <div className="py-4 px-5 lg:px-6 w-full text-sm text-center bg-gray-50">
                      Don’t have an account yet?
                      <Link className="font-medium text-teal-600 hover:text-teal-400" to="/signup"> register now</Link>
                    </div>
                  </div>
                  {/* END Sign In Form */}
    
                  {/* Footer */}
                  <div className="text-sm text-gray-500 text-center mt-6">
                  </div>
                  {/* END Footer */}
                </div>
                {/* END Sign In Section */}
              </div>
            </main>
            {/* END Page Content */}
          </div>
          {/* END Page Container */}
        </>
      );
}
