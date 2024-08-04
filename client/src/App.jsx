// dependencies
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { getLoggedInUserInformation } from "./features/authAPISlice";
import rootRoute from "./route/root";

import "animate.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { authSelect } from "./features/authSlice";
import { getAllCartItems } from "./features/cartAPISlice";
import { getAllOrdersByUserId } from "./features/orderAPISlice";
import { getAllWishlistItemByUserId } from "./features/wishlistAPISlice";

function App() {
  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();

  /**
   * auth context
   */
  const { user } = useSelector(authSelect);

  useEffect(() => {
    // get current user login information
    if (localStorage.getItem("c_user")) {
      dispatch(getLoggedInUserInformation());
    }
    // get current user cart items
    dispatch(getAllCartItems());

    // get current user all orders
    dispatch(getAllOrdersByUserId(user?.id));

    // get current user all wishlist items
    dispatch(getAllWishlistItemByUserId(user?.id));
  }, [dispatch, user?.id]);

  return (
    <>
      <RouterProvider router={rootRoute} />
    </>
  );
}

export default App;
