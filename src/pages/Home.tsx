import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, Tooltip } from "recharts";
import controller from "../api/endpoints";

type City = {
  id: number;
  name: string;
  country: string;
  isCapital: boolean;
  imageUrl: string;
  crimeRate: number;
};

type OutletContextType = {
  searchTerm: string;
  sortOrder: string;
  capitalFilter: string;
};

const COLORS = ["#8884d8", "#82ca9d"];

const Home = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const { searchTerm, sortOrder, capitalFilter } = useOutletContext<OutletContextType>();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await controller.city.getAll();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this city?");
    if (confirmed) {
      await controller.city.delete(id);
      setCities((prevCities) => prevCities.filter((city) => city.id !== id));
    }
  };

  let displayedCities = [...cities];

  if (searchTerm) {
    displayedCities = displayedCities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (capitalFilter === "capital") {
    displayedCities = displayedCities.filter((city) => city.isCapital);
  } else if (capitalFilter === "nonCapital") {
    displayedCities = displayedCities.filter((city) => !city.isCapital);
  }

  if (sortOrder === "lowToHigh") {
    displayedCities.sort((a, b) => a.crimeRate - b.crimeRate);
  } else if (sortOrder === "highToLow") {
    displayedCities.sort((a, b) => b.crimeRate - a.crimeRate);
  }

  const capitalCount = displayedCities.filter((city) => city.isCapital).length;
  const nonCapitalCount = displayedCities.length - capitalCount;

  if (loading) {
    return <p className="text-center mt-10 text-xl">Loading cities...</p>;
  }

  return (
    <div className="p-6 space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedCities.map((city) => (
          <div key={city.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <img
              src={city.imageUrl}
              alt={city.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{city.name}</h2>
            <p className="text-gray-600">Country: {city.country}</p>
            <p className="text-gray-600">Capital: {city.isCapital ? "Capital" : "Not Capital"}</p>
            <p className="text-gray-600">Crime Rate: {city.crimeRate}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => navigate(`/city/${city.id}`)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Info
              </button>

              <button
                onClick={() => handleDelete(city.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-4">Crime Rate per City</h3>
          <BarChart width={750} height={250} data={displayedCities}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="crimeRate" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-4 ml-14">Capital vs Non-Capital</h3>
          <PieChart width={350} height={250}>
            <Pie
              data={[
                { name: "Capital", value: capitalCount },
                { name: "Non-Capital", value: nonCapitalCount },
              ]}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Home;
