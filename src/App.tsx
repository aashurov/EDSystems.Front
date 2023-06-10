import React , {useState, useMemo} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootContainer from './containers/RootContainer';
import { Beforeunload } from 'react-beforeunload';
import Index from "./pages/Home";
import Home from "./pages/Home";

export  default function App(){

  return (
    <>
    <Home/>
    <RootContainer/>
    <ToastContainer />
    </>
  );
}