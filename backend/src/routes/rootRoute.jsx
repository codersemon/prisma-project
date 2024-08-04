// dependencies
import { createBrowserRouter } from "react-router-dom";
import { publicRoute } from "./publicRoute";
import { privateRoute } from "./PrivateRoute";

// creating browser router
const rootRoute = createBrowserRouter([...publicRoute, ...privateRoute]);

// export root route 
export default rootRoute;