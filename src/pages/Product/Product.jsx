import ProductHeader from '../../components/ProductHeader/ProductHeader';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import './Product.css';

const Product = () => {
  return (
    <>
      <ProductHeader />
      <Route path="/products/:id" element={<ProductDetails />} />
    </>
  );
};

export default Product;
