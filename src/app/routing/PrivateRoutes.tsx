import { Loading } from "@/core/components/composite";
import { WithChildren } from "core/types";
import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard";
import Devtools from "@/core/components/composite/devtools";

export function PrivateRoutes() {
  const LinesRoutes = lazy(
    () => import("@/core/feature/lines/LinesRoutes.tsx"),
  );
  const UsersRoutes = lazy(
    () => import("@/core/feature/users/UsersRoutes.tsx"),
  );
  const NotificationRoutes = lazy(
    () => import("@/core/feature/notification/NotificationRoutes.tsx"),
  );
  const SmsRoutes = lazy(() => import("@/core/feature/sms/SmsRoutes.tsx"));

  // ---------------------- render ---------------------
  return (
    <Routes>
      <Route>
        {/* Pages */}

        <Route
          path="lines/*"
          element={
            <SuspensedView>
              <LinesRoutes />
            </SuspensedView>
          }
        />

        <Route
          path="users/*"
          element={
            <SuspensedView>
              <UsersRoutes />
            </SuspensedView>
          }
        />

        <Route
          path="notification/*"
          element={
            <SuspensedView>
              <NotificationRoutes />
            </SuspensedView>
          }
        />

        <Route
          path="sms/*"
          element={
            <SuspensedView>
              <SmsRoutes />
            </SuspensedView>
          }
        />

        <Route
          path="dashboard"
          element={
            <SuspensedView>
              <Dashboard />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
}

const SuspensedView: FC<WithChildren> = ({ children }) => (
  <Suspense fallback={<Loading />}>
    {children}
    <Devtools />
  </Suspense>
);
