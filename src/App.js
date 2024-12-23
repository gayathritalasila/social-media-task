import React from 'react';
import { Outlet } from "react-router-dom";
import Login from './components/Authentication/Login';


const App = () => {
    return (
        <>
        <Login />
        <Outlet />
        </>
    )
};

export default App;