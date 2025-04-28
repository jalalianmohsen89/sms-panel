import { useMemo } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { linesRoutes } from "@/core/feature/lines/content";
import { permissionList } from "@/core/content";
import { MasterLayout } from "@/app/layouts/MasterLayout.tsx";

const LinesRoutes = () => {
  const routes = useMemo(
    () => [
      ...linesRoutes.map((item) =>
        permissionList.includes(item.permission)
          ? {
            path: item.path,
            element: item.component,
          }
          : {
            path: "*",
            element: <Navigate to="/error/403" />,
          },
      ),
      { path: "*", element: <Navigate to="/error/404" /> },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [permissionList],
  );

  return <MasterLayout>{useRoutes(routes)}</MasterLayout>;
};

export default LinesRoutes;
