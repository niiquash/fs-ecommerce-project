import Product from "./Product";

const ProductsGrid = ({ product, loadCart }) => {
  return <Product product={product} loadCart={loadCart} />;
};

export default ProductsGrid;
