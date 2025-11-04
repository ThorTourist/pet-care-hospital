import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom"; // ✅ correct import
import { router } from "./assets/Routes/Router.jsx"; // ✅ your router file

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "./Provider/AuthProvider.jsx"; // ✅ your provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} /> {/* ✅ correct object */}
      <ToastContainer /> {/* ✅ inside provider is fine */}
    </AuthProvider>
  </StrictMode>
);
