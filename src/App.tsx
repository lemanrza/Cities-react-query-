import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ROUTER from "./routes/Routes"

function App() {
const Router= createBrowserRouter(ROUTER)
  return (
  <>
  <RouterProvider router={Router}/>
  </>
  )
}

export default App
