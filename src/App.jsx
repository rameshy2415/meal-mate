import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthLayout from "./components/AuthLayout";
import Contact from "./components/Contact";
import About from "./components/About";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, Component: Home },
        { path: "about", Component: About },
        { path: "contact", Component: Contact },
        { path: "login", Component: Login },
        { path: "register", Component: Register },
        { path: "cart", Component: Cart },
        // {
        //   path: "/auth",
        //   Component: AuthLayout,
        //   children: [
        //     { path: "login", Component: Login },
        //     { path: "register", Component: Register },
        //   ],
        // },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
