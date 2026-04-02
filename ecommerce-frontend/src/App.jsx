import "./App.css";
import HomePage from "./pages/home-page/HomePage";
import CheckoutPage from "./pages/checkout-page/CheckoutPage";
import OrdersPage from "./pages/orders-page/OrdersPage";
import TrackingPage from "./pages/tracking-page/TrackingPage";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
