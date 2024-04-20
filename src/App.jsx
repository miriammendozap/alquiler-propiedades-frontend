import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/footer";
import Header from "./components/header";
import UserList from "./components/user/UserList";

import Login from "./components/auth/Login";
import ChangePassword from "./components/auth/ChangePassword"

import UserFormCreate from "./components/user/UserFormCreate";
import UserFormEdit from "./components/user/UserFormEdit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from './features/authSlice'
import PrivateRoute from "./components/PrivateRoute";

import HouseFormCreate from "./components/house/HouseFormCreate"; 
import HouseList from "./components/house/HouseList";
import HouseFormEdit from "./components/house/HouseFormEdit";

import Chat from "./components/chat/Chat";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const sessionData = localStorage.getItem('sessionData');
    if (sessionData) {
      dispatch(loginSuccess(JSON.parse(sessionData)))
    }
  })

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Rutas Privadas */}
          <Route path="/" element={<PrivateRoute Component={Home} />} />
          <Route path="/user" element={<PrivateRoute Component={UserList} />} />
          <Route path="/user/:id" element={<PrivateRoute Component={UserFormEdit} />} />
          <Route path="/change-password" element={<PrivateRoute Component={ChangePassword} />} />

          {/* Rutas de casas */}
          <Route path="/create-house" element={<PrivateRoute Component={HouseFormCreate} />} />
          <Route path="/house" element={<PrivateRoute Component={HouseList} />} />
          <Route path="/house/:id" element={<PrivateRoute Component={HouseFormEdit} />} />


          <Route path="/chat" element={<PrivateRoute Component={Chat} />} />

          {/* Rutas Publicas */}
          <Route path="/create-user" element={<UserFormCreate />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
