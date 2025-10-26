import React, { useState } from "react";
import { auth, googleProvider } from "../../Firebase/firebase.init";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  // Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!", { position: "top-center" });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!", { position: "top-center" });
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link
          to="/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>

        <button type="submit" className="btn btn-primary w-full mt-2">
          Login
        </button>
      </form>

      <div className="divider">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn btn-outline w-full mt-2"
      >
        Login with Google
      </button>

      <p className="mt-4 text-sm text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
