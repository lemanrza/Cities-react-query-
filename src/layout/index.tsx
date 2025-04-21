import { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [capitalFilter, setCapitalFilter] = useState("");

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        capitalFilter={capitalFilter}
        setCapitalFilter={setCapitalFilter}
      />
      <Outlet
        context={{
          searchTerm,
          sortOrder,
          capitalFilter,
        }}
      />
    </>
  );
};

export default Layout;
