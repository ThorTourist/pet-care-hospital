import React, { useEffect, useState } from "react";
import { auth } from "../../Firebase/firebase.init";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || currentUser.email.split("@")[0]);
        setPhotoURL(currentUser.photoURL || "");
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isValidURL = (url) => {
    try {
      if (!url) return true;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleUpdateProfile = async () => {
    if (!name || name.trim().length < 2) {
      toast.error("Name must be at least 2 characters", {
        position: "top-center",
      });
      return;
    }
    if (!isValidURL(photoURL)) {
      toast.error("Photo URL is invalid", { position: "top-center" });
      return;
    }

    try {
      setUpdating(true);
      await updateProfile(auth.currentUser, {
        displayName: name.trim(),
        photoURL: photoURL || undefined,
      });
      setUser({ ...auth.currentUser });
      toast.success("Profile updated successfully!", {
        position: "top-center",
      });
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="text-center mt-8">Loading profile...</p>;

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-700">
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>

      <div className="flex flex-col items-center gap-4">
        <img
          src={photoURL || "https://via.placeholder.com/150?text=No+Image"}
          alt={name || "No Name"}
          className="w-32 h-32 rounded-full object-cover border"
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="input input-bordered w-full text-center"
        />

        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Photo URL"
          className="input input-bordered w-full text-center"
        />

        <p className="text-gray-600 break-words">{user.email}</p>

        <button
          onClick={handleUpdateProfile}
          disabled={updating}
          className={`btn btn-primary mt-4 w-full ${
            updating ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
