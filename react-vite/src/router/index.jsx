import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Homepage from "../components/HomepageComponent";
import Layout from "./Layout";
import Cards from "../components/CardsComponent";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "/session/boards",
        element: <Boards />
      }
    ],
  },
]);
