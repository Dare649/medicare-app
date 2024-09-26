// SignUpContext.js
import React, { createContext, useState, useContext } from 'react';

export const SignUpContext = createContext();

export const SignUpProvider = ({ children }) => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    country_code: "",
    phone: "",
    password: "",
    role: "patient"
  });

  return (
    <SignUpContext.Provider value={{ signUpData, setSignUpData }}>
      {children}
    </SignUpContext.Provider>
  );
};


export const useSignUpContext = () => {
    return useContext(SignUpContext);
};