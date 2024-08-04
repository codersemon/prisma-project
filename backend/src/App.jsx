import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import {
  getAllProductCategory,
  getAllProducts,
} from "./feature/productAPISlice";
import rootRoute from "./routes/rootRoute";
import { getLoggedInUserInformation } from "./feature/authAPISlice";
import { getAllOrders } from "./feature/orderAPISlice";
import { getAllUsers } from "./feature/userAPISlice";

function App() {
  // reducer action dispatcher
  const dispatch = useDispatch();

  // send request to fetch products, categories
  useEffect(() => {
    // get current user login information
    if (localStorage.getItem("c_user")) {
      dispatch(getLoggedInUserInformation());
    }
    
    dispatch(getAllProductCategory()); // get all categories
    dispatch(getAllProducts()); // get all products
    dispatch(getAllOrders()); // get all orders
    dispatch(getAllUsers()) // get all users
  }, [dispatch]);

  return <RouterProvider router={rootRoute} />;
}

export default App;
