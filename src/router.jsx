import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import UserSelect from "./pages/UserSelect";
import Profile from "./pages/Profile";
import Unlock from "./pages/Unlock";
import Success from "./pages/Success";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="user-select" element={<UserSelect />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="unlock" element={<Unlock />} />
        <Route path="success" element={<Success />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </>
  ),
  { basename: "/" }
);

export default router;
