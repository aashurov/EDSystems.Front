import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AppLayout from "../components/app/AppLayout";
import BranchContainer from "../components/administrator/BranchTab";

export default function AppContainer(){
    return (
        <AppLayout>
           <Outlet/>
        </AppLayout>
        )
}