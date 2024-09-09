import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/index";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import EditFinancial from "../pages/EditFinancial";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/Edit/:id",
        element: <EditFinancial />,
      },
    ],
  },
]);

export default router;
