// dependencies
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWishlistItem,
  deleteWishlistItem,
} from "../../features/wishlistAPISlice";
import { wishlistSelect } from "../../features/wishlistSlice";
import ProductQuickViewModalContent from "../modalContents/ProductQuickViewModalContent";
import ModalLayout from "./ModalLayout";

const ProductCardOptions = ({ productDetails, classOption }) => {
  /**
   * react-redux dispatch hook init
   */
  const dispatch = useDispatch();

  /**
   * wishlist context
   */
  const { wishlist } = useSelector(wishlistSelect);

  /**
   * wishlist add/remove handler
   */
  const handleWishlistAddRemove = (productId) => {
    // check product existence in wishlist
    const wishlistItem = wishlist?.filter(
      (item) => item.productId === productId
    );

    if (wishlistItem?.length > 0) {
      // if item exist in wishlist, then delete from wishlist
      dispatch(deleteWishlistItem(wishlistItem[0].id));
    } else {
      // if item not exist in wishlist, then add item in wishlist
      dispatch(createWishlistItem({ id: productId }));
    }
  };

  /**
   * product quick-view state
   */
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <>
      <ul className={classOption}>
        <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
          <span
            className="notifi-wishlist cursor-pointer"
            onClick={() => setIsQuickViewOpen(true)}
          >
            <FeatherIcon icon="eye" size={17} />
          </span>
        </li>
        <li data-bs-toggle="tooltip" data-bs-placement="top" title="Compare">
          <span className="notifi-wishlist cursor-pointer">
            <FeatherIcon icon="refresh-cw" size={17} />
          </span>
        </li>
        <li data-bs-toggle="tooltip" data-bs-placement="top" title="Wishlist">
          <span
            className="notifi-wishlist cursor-pointer"
            onClick={() => handleWishlistAddRemove(productDetails?.id)}
          >
            <FeatherIcon
              icon="heart"
              size={17}
              style={{
                fill:
                  wishlist?.some(
                    (item) => item.productId == productDetails?.id
                  ) && "#0da487",
                stroke:
                  wishlist?.some(
                    (item) => item.productId == productDetails?.id
                  ) && "#0da487",
              }}
            />
          </span>
        </li>
      </ul>
      {/* product quick view modal  */}
      <ModalLayout
        showModal={isQuickViewOpen}
        closeModal={() => setIsQuickViewOpen(false)}
        className="theme-modal view-modal"
        dialogClassName="modal-xl modal-fullscreen-sm-down"
      >
        <ProductQuickViewModalContent productDetails={productDetails} />
      </ModalLayout>
    </>
  );
};

export default ProductCardOptions;
