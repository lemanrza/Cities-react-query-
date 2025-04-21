import { useState } from "react";
import { Building2, PlusCircle } from "lucide-react";
import controller from "../api/endpoints";
import { useNavigate } from "react-router-dom";

export default function AddCityPage() {
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [crimeRate, setCrimeRate] = useState("");
  const [cityImage, setCityImage] = useState("");
  const [cityType, setCityType] = useState("capital");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName.trim() || !countryName.trim()) {
      alert("City and Country name can't be empty ");
      return;
    }
    const crimeRateValue = parseFloat(crimeRate);
    if (isNaN(crimeRateValue) || crimeRateValue < 0 || crimeRateValue > 100) {
      alert("Crime rate must be between 0 and 100");
      return;
    }
    const newCity = {
      name: cityName,
      country: countryName,
      crimeRate: crimeRate,
      imageUrl: cityImage,
      type: cityType,
    };

    try {
      await controller.city.post(newCity);

      setCityName("");
      setCountryName("");
      setCrimeRate("");
      setCityImage("");
      setCityType("capital");
      navigate("/")
    } catch (err) {
      console.error("Error posting data:", err);
      alert("Failed to add city ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-violet-200 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <Building2 className="h-12 w-12 text-indigo-600" />
          <h1 className="text-2xl font-bold mt-2 text-center">Add New City</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter city name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            placeholder="Enter country name"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            placeholder="Enter crime rate"
            value={crimeRate}
            onChange={(e) => setCrimeRate(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            placeholder="Enter image URL"
            value={cityImage}
            onChange={(e) => setCityImage(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={cityType}
            onChange={(e) => setCityType(e.target.value)}
            className="w-full border border-gray-300 text-gray-500 rounded-xl px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="capital">Capital</option>
            <option value="nonCapital">Non Capital</option>
          </select>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition-all active:scale-95 text-lg"
          >
            <PlusCircle className="h-5 w-5" />
            Add City
          </button>
        </form>
      </div>
    </div>
  );
}
