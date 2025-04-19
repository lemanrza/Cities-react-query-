import Layout from "../layout";
import Add from "../pages/Add";
import Detail from "../pages/Detail";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

const ROUTER = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "addCity",
          element: <Add />,
        },
        {
          path: "city/:cityId",
          element: <Detail />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ];
  
  export default ROUTER;