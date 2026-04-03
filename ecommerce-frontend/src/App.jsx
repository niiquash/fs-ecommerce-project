import "./App.css";
import HomePage from "./pages/home-page/HomePage";
import CheckoutPage from "./pages/checkout-page/CheckoutPage";
import OrdersPage from "./pages/orders-page/OrdersPage";
import TrackingPage from "./pages/tracking-page/TrackingPage";
import axios from "axios";
import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios.get("/api/cart-items").then((response) => {
      setCart(response.data);
    });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage cartItems={cart} />} />
      <Route path="/checkout" element={<CheckoutPage cartItems={cart} />} />
      <Route path="/orders" element={<OrdersPage cartItems={cart} />} />
      <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
