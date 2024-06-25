import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const whiteList = ["/profile", "/unlock", "/success"];

function Layout() {
  const location = useLocation();
  const { account } = JSON.parse(localStorage.getItem("faceAuth")) || {};

  if (!account && whiteList.includes(location.pathname)) {
    return <Navigate to="/" />;
  }

  if (account && !whiteList.includes(location.pathname)) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <Outlet className="grow" />
    </div>
  );
}

export default Layout;
