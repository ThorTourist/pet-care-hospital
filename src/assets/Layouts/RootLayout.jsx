import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
      <div>
        <Navbar></Navbar>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    );
};

export default RootLayout;