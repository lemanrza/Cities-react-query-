import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import controller from "../api/endpoints";

type City = {
  id: number;
  name: string;
  country: string;
  isCapital: boolean;
  imageUrl: string;
  crimeRate: number;
};

const CityDetail = () => {
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { cityId } = useParams();
  const navigate = useNavigate();

  const fetchCity = async () => {
    if (!cityId) return;

    try {
      const data = await controller.city.getOne(cityId);
      setCity(data);
    } catch (error) {
      console.error("Error fetching city:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCity();
  }, [cityId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading city details...</p>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500 font-semibold">City not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center space-y-6">
      <img
        src={city.imageUrl}
        alt={city.name}
        className="w-full max-w-2xl h-80 object-cover rounded-xl shadow-lg"
      />
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{city.name}</h1>
        <p className="text-gray-600 text-lg">{city.country}</p>
        <p
          className={`font-semibold ${
            city.crimeRate > 50 ? "text-red-500" : "text-green-500"
          }`}
        >
          Crime Rate: {city.crimeRate}%
        </p>
        {city.isCapital && (
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mt-2">
            Capital City
          </span>
        )}
      </div>

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Back to Cities
      </button>
    </div>
  );
};

export default CityDetail;
