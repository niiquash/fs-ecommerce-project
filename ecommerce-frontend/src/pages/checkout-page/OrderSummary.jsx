import { useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";

const OrderSummary = ({ cartItem, loadCart }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdating ? (
              <input
                type="text"
                className="item-detail-update-input"
                value={quantity}
                onChange={(event) => {
                  const newQuantity = Number(event.target.value);
                  setQuantity(newQuantity);
                }}
              />
            ) : (
              <span className="quantity-label">{quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={async () => {
              isUpdating &&
                (await axios.put(`/api/cart-items/${cartItem.productId}`, {
                  quantity: quantity,
                }));
              await loadCart();
              setIsUpdating(!isUpdating);
            }}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
