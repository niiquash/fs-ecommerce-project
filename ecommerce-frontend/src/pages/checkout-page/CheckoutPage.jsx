import "./CheckoutPage.css";
import CheckoutHeader from "./CheckoutHeader";
import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { useEffect, useState } from "react";
import DeliveryOptions from "./DeliveryOptions";

function CheckoutPage({ cartItems }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getDeliveryOptionsData = async () => {
      const response = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);
    };

    const getPaymentSummaryData = async () => {
      const response = await axios.get("/api/payment-summary");
      setPaymentSummary(response.data);
    };
    getDeliveryOptionsData();
    getPaymentSummaryData();
  }, []);

  console.log(deliveryOptions);

  return (
    <>
      <CheckoutHeader cartItems={cartItems} />
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <title>Checkout</title>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length > 0 &&
              cartItems.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions.find(
                  (option) => {
                    return option.id === cartItem.deliveryOptionId;
                  },
                );
                return (
                  <div key={cartItem.productId} className="cart-item-container">
                    <div className="delivery-date">
                      Delivery date:{" "}
                      {dayjs(
                        selectedDeliveryOption.estimatedDeliveryTimeMs,
                      ).format("dddd, MMMM D")}
                    </div>

                    <div className="cart-item-details-grid">
                      <img
                        className="product-image"
                        src={cartItem.product.image}
                      />

                      <div className="cart-item-details">
                        <div className="product-name">
                          {cartItem.product.name}
                        </div>
                        <div className="product-price">
                          {formatMoney(cartItem.product.priceCents)}
                        </div>
                        <div className="product-quantity">
                          <span>
                            Quantity: <span className="quantity-label">2</span>
                          </span>
                          <span className="update-quantity-link link-primary">
                            Update
                          </span>
                          <span className="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <DeliveryOptions
                        cartItem={cartItem}
                        deliveryOptions={deliveryOptions}
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            {paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummary.totalItems}):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.productCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.shippingCostCents)}
                  </div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.taxCents)}
                  </div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">
                    {formatMoney(paymentSummary.totalCostCents)}
                  </div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
