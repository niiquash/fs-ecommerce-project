import "./CheckoutPage.css";
import CheckoutHeader from "./CheckoutHeader";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import DeliveryOptions from "./DeliveryOptions";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

function CheckoutPage({ cartItems, loadCart }) {
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
  }, [cartItems]);

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
                      <OrderSummary cartItem={cartItem} loadCart={loadCart} />

                      <DeliveryOptions
                        cartItem={cartItem}
                        deliveryOptions={deliveryOptions}
                        loadCart={loadCart}
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
