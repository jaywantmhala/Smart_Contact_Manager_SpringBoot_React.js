import React from "react";
import RouteNavbar from "./Components/Routes/RouteNavbar";
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <div>
      <ToastContainer />
      <RouteNavbar />
    </div>
  );
};

export default App;
