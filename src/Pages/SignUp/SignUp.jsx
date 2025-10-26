import React, { useState } from "react";
import { auth, googleProvider } from "../../Firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd) =>
    /[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && pwd.length >= 6;

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 6 characters with uppercase and lowercase letters.",
        { position: "top-center" }
      );
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Set profile data immediately
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo || undefined,
      });
      toast.success("Account created successfully!", {
        position: "top-center",
      });
      navigate("/profile"); // redirect to profile page
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!", { position: "top-center" });
      navigate("/profile");
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Photo URL"
          className="input input-bordered w-full"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>

      <button
        onClick={handleGoogleSignup}
        className="btn btn-outline w-full mt-4"
      >
        Sign Up with Google
      </button>

      <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
