import React from "react";

import Home from "../../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import { createBrowserRouter } from "react-router";
import Service from "../../Pages/Service/Service";
import MyProfile from "../../Pages/MyProfile/MyProfile";
import WinterTips from "../../Components/WinterTips";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import ProtectedRoute from "../../Components/ProtectedRoute";
import ServiceDetails from "../../Pages/ServiceDetails/ServiceDetails";
import ErrorPage from "../../Components/ErrorPage/ErrorPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/service",
        element: <Service />,
      },
      {
        path: "/services/:id",
        element: (
          <ProtectedRoute>
            <ServiceDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myprofile",
        element: <MyProfile />,
      },
      {
        path: "/wintertips",
        element: <WinterTips />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);
