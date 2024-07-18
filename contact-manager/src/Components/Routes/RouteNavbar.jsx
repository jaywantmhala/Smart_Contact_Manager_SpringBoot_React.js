import React, { useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import StickyNavbar from "../Navbar/StickyNavbar";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Contact from "../Pages/Contact";
import Profile from "../Pages/Profile";
import AddContact from "../Pages/AddContact";
import ShowContact from "../Pages/ShowContact";
import UpdateContact from "../Pages/UpdateContact";

const RouteNavbar = () => {
  return (
    <>
      <StickyNavbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/show-contact" element={<ShowContact />} />
        <Route path="/update-contact/:contactId" element={<UpdateContact />} />
      </Routes>
    </>
  );
};

export default RouteNavbar;
