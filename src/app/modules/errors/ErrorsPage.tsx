import { Route, Routes } from "react-router-dom";
import { Error500 } from "@/app/modules/errors/pages/Error500";
import { Error404 } from "@/app/modules/errors/pages/Error404";
import { Error403 } from "@/app/modules/errors/pages/Error403";
import { ErrorsLayout } from "@/app/layouts/ErrorsLayout";

const ErrorsPage = () => (
  <Routes>
    <Route element={<ErrorsLayout />}>
      <Route path="403" element={<Error403 />} />
      <Route path="404" element={<Error404 />} />
      <Route path="500" element={<Error500 />} />
      <Route index element={<Error404 />} />
    </Route>
  </Routes>
);

export { ErrorsPage };
