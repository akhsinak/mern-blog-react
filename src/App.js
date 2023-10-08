import TopBar from "./components/topbar/TopBar";
import "./app.css"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Single from "./pages/single/Single"
import Settings from "./pages/settings/Settings"


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/home/Home";
import Write from "./pages/write/Write";
import { useContext } from "react";
import { Context } from "./context/Context";






function App() {
  const { user } = useContext(Context);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <TopBar />
          {user ? <Homepage /> : <Register />}
        </>
      ),
    },
    {
      path: "/write",
      element: (
        <>
          <TopBar />
          {user ? <Write /> : <Register />}
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <TopBar />
          {user ? <Homepage /> : <Login />}
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <TopBar />
          {user ? <Homepage /> : <Register />}
        </>
      ),
    },
    {
      path: "/settings",
      element: (
        <>
          <TopBar />
          {user ? <Settings /> : <Register />}
        </>
      ),
    },
    {
      path: "/post/:postId",
      element: (
        <>
          <TopBar />
          <Single />
        </>
      ),
    },

  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
