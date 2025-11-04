import React, { useContext } from "react";
import { Outlet } from "react-router";
import Footer from "../../Components/Footer/Footer";
import ExpertVets from "../../Components/ExpertVets";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import Navbar from "../../Components/Navbar/Navbar";
import { AuthContext } from "../../Provider/AuthProvider";

const RootLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main className="grid grid-cols-1 md:grid-cols-12 gap-4 w-11/12 mx-auto mt-4">
        {/* Left Aside */}
        <aside className="md:col-span-3 order-2 md:order-1 bg-gray-100 p-4 rounded">
          <ExpertVets />
        </aside>

        {/* Main Content */}
        <div className="order-1 md:order-2 my-2 min-h-[calc(100vh-200px)] border-2 border-gray-300 md:col-span-6 p-4 rounded">
          <Outlet />
        </div>

        {/* Right Aside */}
        <aside className="md:col-span-3 order-3 bg-gray-100 p-4 rounded">
          {!user ? (
            <>
              <Login />
            
            </>
          ) : (
            <p className="text-center font-semibold text-green-700">
              Welcome to our PetCare, Mr/Mrs {user.displayName || user.email}!
            </p>
          )}
        </aside>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;
