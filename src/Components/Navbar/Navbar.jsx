import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router"; // ✅ kept your import style
import logoImg from "../../assets/images/logo.png";
import { AuthContext } from "../../Provider/AuthProvider"; // ✅ added
import { toast } from "react-toastify"; // ✅ added

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // ✅ get user from context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!", { position: "top-center" });
      navigate("/home");
    } catch (error) {
      toast.error("Logout failed. Try again.", { position: "top-center" });
    console.log(error)
    }
  };

  const links = (
    <>
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/service"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        Service
      </NavLink>

      <NavLink
        to="/myprofile"
        className={({ isActive }) =>
          `m-2 font-semibold ${isActive ? "underline underline-offset-4" : ""}`
        }
      >
        My Profile
      </NavLink>
    </>
  );


  return (
    <div className="navbar bg-base-100 shadow-sm px-2 md:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <div className="flex items-center gap-0">
          <NavLink
            to="/home"
            className="btn btn-ghost text-xl inter text-purple-800 font-bold"
          >
            <img className="h-8 w-8" src={logoImg} alt="" />
            Pet Care Hospital
          </NavLink>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-3">
        <Link to="/wintertips">
          <button className="btn btn-outline hover:bg-gray-500 bg-purple-900 text-sm text-white p-1 md:px-4">
            WinterTips
          </button>
        </Link>

        {/* ✅ Conditional rendering for user login */}
        {user ? (
          <div className="flex items-center gap-2">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="User"
                className="w-8 h-8 rounded-full object-cover border"
              />
            )}
            <span className="text-sm font-semibold text-gray-700">
              {user.displayName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm text-purple-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link to="/signup" className="btn btn-sm btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
