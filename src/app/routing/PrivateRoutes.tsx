import { Loading } from "@/core/components/composite";
import { WithChildren } from "core/types";
import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard";
import Devtools from "@/core/components/composite/devtools";

export function PrivateRoutes() {
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
