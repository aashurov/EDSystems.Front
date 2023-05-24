import React from "react";
import AuthFormWrapper from "../components/auth/AuthFormWrapper";

interface AuthContainerProps{
   readonly onsubmit: (value: any) => void;
}

export default function AuthContainer({onsubmit}:AuthContainerProps){
    return (<AuthFormWrapper submit={onsubmit}/>)
}