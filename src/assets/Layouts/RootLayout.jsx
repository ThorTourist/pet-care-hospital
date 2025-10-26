import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import WinterTips from '../../Components/WinterTips';
import ExpertVets from '../../Components/ExpertVets';
import Login from '../../Pages/Login/Login';
import SignUp from '../../Pages/SignUp/SignUp';

const RootLayout = () => {
    return (
      <div>
        <header>
          <Navbar></Navbar>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-12 gap-4 w-11/12 mx-auto mt-4">
          {/* Left Aside */}
          <aside className="md:col-span-3 order-2 md:order-1 bg-gray-100 p-4 rounded">
           
            <ExpertVets></ExpertVets>
          </aside>

          {/* Main Content */}
          <div className="order-1 md:order-2 my-2 min-h-[calc(100vh-200px)] border-2 border-gray-300 md:col-span-6 p-4 rounded">
            <Outlet />
          </div>

          {/* Right Aside / Form */}
          <aside className="md:col-span-3 order-3 bg-gray-100 p-4 rounded">
            
            <Login></Login>

         
          </aside>
        </main>

        <footer>
          <Footer></Footer>
        </footer>
      </div>
    );
};

export default RootLayout;