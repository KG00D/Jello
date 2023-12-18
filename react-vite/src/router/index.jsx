import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Homepage from "../components/HomepageComponent";
import Landingpage from "../components/Landingpage";
import Layout from "./Layout";
import Cards from "../components/CardsComponent";
import BoardDetails from "../components/BoardDetails";

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
        element: <Landingpage />,
      },
      {
        path: "/boards/:id",
        element: <BoardDetails />,
      },
    ],
  },
]);
