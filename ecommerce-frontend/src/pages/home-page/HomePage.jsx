import Header from "../../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import "./HomePage.css";
import ProductsGrid from "./ProductsGrid";

function HomePage({ cartItems, loadCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const reponse = await axios.get("/api/products");
      setProducts(reponse.data);
    };

    getHomeData();
  }, []);

  const productsGrid = products.map((product) => (
    <ProductsGrid key={product.id} product={product} loadCart={loadCart} />
  ));

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <title>Home</title>
      <Header cartItems={cartItems} />
      <div className="home-page">
        <div className="products-grid">{productsGrid}</div>
      </div>
    </>
  );
}

export default HomePage;
