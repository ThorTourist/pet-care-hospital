import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/Service.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="w-11/12 mx-auto my-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            className="card bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col">
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <p className="text-yellow-500 mt-1">Rating: {service.rating}</p>
              <p className="text-gray-700 mt-1">{service.price}</p>
              <Link
                to={`/services/${service.id}`}
                className="mt-2 btn btn-sm btn-primary w-full text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
