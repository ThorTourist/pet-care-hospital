import React, { useEffect, useState } from "react";
import { auth } from "../../Firebase/firebase.init";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      // Ensure full name is used
      const fullName = currentUser.displayName || currentUser.email.split("@")[0];
      setUser(currentUser);
      setName(fullName);
      setPhotoURL(currentUser.photoURL || "");
    }
    setLoading(false);
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
      toast.error("Name must be at least 2 characters", { position: "top-center" });
      return;
    }
    if (!isValidURL(photoURL)) {
      toast.error("Photo URL is invalid", { position: "top-center" });
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: name.trim(),
        photoURL: photoURL || undefined,
      });
      // Refresh user state
      setUser({ ...auth.currentUser });
      toast.success("Profile updated successfully!", { position: "top-center" });
    } catch (err) {
      toast.error(err.message, { position: "top-center" });
    }
  };

  if (loading) return <p className="text-center mt-8">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">My Profile</h1>

      <div className="flex flex-col items-center gap-4">
        <img
          src={photoURL || "https://via.placeholder.com/150?text=No+Image"}
          alt={name || "No Name"}
          className="w-32 h-32 rounded-full object-cover"
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

        <p className="text-gray-600">{user.email}</p>

        <button
          onClick={handleUpdateProfile}
          className="btn btn-primary mt-4 w-full"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
