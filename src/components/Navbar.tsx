import { Link } from "react-router-dom";
type NavbarProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  capitalFilter: string;
  setCapitalFilter: (value: string) => void;
};

const Navbar = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  capitalFilter,
  setCapitalFilter,
}: NavbarProps) => {
  return (
    <nav className="bg-white shadow-md p-4 flex flex-wrap items-center justify-between">
      <div className="flex items-center gap-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuURAi3Og025gLw315uqCsSGZ0FPBV9z0LYMCP2NqK_n46j3QVAdDY6N6ZEoASmA8r48c&usqp=CAU"
          alt="Logo"
          className="h-12 w-12 object-contain"
        />
        <span className="font-bold text-xl text-gray-800">City Explorer</span>
      </div>

      <div className="flex gap-6 text-gray-600 font-medium">
        <Link to={"/"} className="hover:text-blue-500 transition">Home</Link>
        <Link to={"/addCity"} className="hover:text-blue-500 transition">Add City</Link>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4 sm:mt-0">
        <input
          type="text"
          placeholder="Search city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Crime Rate</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>

        <select
          value={capitalFilter}
          onChange={(e) => setCapitalFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Cities</option>
          <option value="capital">Only Capitals</option>
          <option value="nonCapital">Only Non-Capitals</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
