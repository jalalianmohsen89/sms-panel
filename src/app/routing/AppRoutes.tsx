import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorsPage } from "@/app/modules/errors/ErrorsPage.tsx";
import App from "../App.tsx";
import { PrivateRoutes } from "@/app/routing/PrivateRoutes.tsx";
import Dashboard from "../Dashboard.tsx";
import Login from "../modules/auth/login";
import useStore from "@/core/store";
import Register from "../modules/auth/register";

const routesUser = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorsPage />, // مدیریت خطاهای کلی
    children: [
      {
        path: "error/*",
        element: <ErrorsPage />,
      },
      {
        path: "/*",
        element: <PrivateRoutes />,
      },

      { index: true, element: <Dashboard /> },
    ],
  },
]);
const routesGuest = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorsPage />, // مدیریت خطاهای کلی
    children: [
      {
        path: "error/*",
        element: <ErrorsPage />,
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/register",
        element: <Register />,
      },
      { index: true, element: <Login /> },
    ],
  },
]);

const AppRoutes: FC = () => {
  const { isAuthenticated } = useStore();

  return <RouterProvider router={isAuthenticated ? routesUser : routesGuest} />;
};

export { AppRoutes };
