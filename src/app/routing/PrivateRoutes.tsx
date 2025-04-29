import { Loading } from "@/core/components/composite";
import Devtools from "@/core/components/composite/devtools";
import { WithChildren } from "core/types";
import { FC, lazy, Suspense, useMemo } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Dashboard from "../Dashboard";

// Dynamically import all module route files
const MODULES = import.meta.glob("@/app/modules/*/*Routes.tsx");

// Wrapper component for Suspense and Devtools
const SuspensedView: FC<WithChildren> = ({ children }) => (
  <Suspense fallback={<Loading />}>
    {children}
    <Devtools />
  </Suspense>
);

export function PrivateRoutes() {
  // Generate route configurations dynamically for modules
  const dynamicModuleRoutes = useMemo(
    () =>
      Object.keys(MODULES)
        .map((path): RouteObject | null => {
          // Return type is RouteObject or null
          const match = path.match(
            /modules[\\/]([^\\/]+)[\\/][^\\/]+Routes\.tsx$/,
          );
          const moduleName = match ? match[1] : null;

          const LazyComponent = lazy(
            MODULES[path] as () => Promise<{
              default: React.ComponentType<any>;
            }>,
          );

          // Wrap the lazy component with SuspensedView directly in the element
          return {
            path: `${moduleName}/*`, // e.g., 'lines/*'
            element: (
              <SuspensedView>
                <LazyComponent />
              </SuspensedView>
            ),
          };
        })
        .filter((route): route is RouteObject => route !== null), // Type guard to filter out nulls
    [],
  );

  // Combine static and dynamic routes for useRoutes
  const routes: RouteObject[] = useMemo(
    () => [
      {
        index: true,
        path: "dashboard",
        element: (
          <SuspensedView>
            <Dashboard />
          </SuspensedView>
        ),
      },
      ...dynamicModuleRoutes,
      // Page Not Found - Should be the last route in this level
      { path: "*", element: <Navigate to="/error/404" /> },
    ],
    [dynamicModuleRoutes],
  );

  // Use the useRoutes hook to render the routes
  const element = useRoutes(routes);

  // Wrap the rendered routes with MasterLayout (similar to UsersRoutes)
  // If MasterLayout is not appropriate here, remove this wrapper
  return element;
}

// Removed the old SuspensedView definition as it's integrated into route elements
