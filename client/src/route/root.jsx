// dependencies
import { createBrowserRouter } from "react-router-dom";
import privateRoutes from "./privateRoutes";
import publicRoutes from "./publicRoutes";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";

// creating root route
const rootRoute = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

// export route
export default rootRoute;
