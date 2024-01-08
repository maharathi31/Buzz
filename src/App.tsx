import React from "react";
import {Routes,Route} from 'react-router-dom'

import "./globals.css"
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import Home from "./_root/pages/Home";
import RootLayout from "./_root/RootLayout";
const App = () => {
  return <div className="flex h-screen">
   <Routes>
     {/* public routes */}
     <Route element={<AuthLayout/>}>
     <Route path="/sign-in" element={<SigninForm/>}/>
     <Route path="/sign-up" element={<SignupForm/>}/>
     </Route>
     {/* private routes */}
     <Route element={<RootLayout/>}>
     <Route index element={<Home/>}/>
     </Route>
    </Routes>
  </div>;
};

export default App;