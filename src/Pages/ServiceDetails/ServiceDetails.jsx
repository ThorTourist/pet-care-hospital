// pages/ServiceDetails/ServiceDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Fetch the service by ID from Service.json
  useEffect(() => {
    fetch("/Service.json")
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((s) => s.id === parseInt(id));
        setService(selected);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show success toast
    toast.success(`Service "${service.name}" booked successfully!`, {
      position: "top-center",
    });
    // Clear form
    setFormData({ name: "", email: "" });
  };

  if (!service) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="w-11/12 mx-auto my-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden p-6">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <h2 className="text-3xl font-bold mt-4">{service.name}</h2>
        <p className="mt-2 text-yellow-500">Rating: {service.rating}</p>
        <p className="mt-2 text-gray-700">{service.price}</p>
        <p className="mt-2 text-gray-600">{service.description}</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Book Service</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-full mt-2">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceDetails;
