import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import defaultProductImage from "../../assets/product1.png";
import { useCart } from "../CartDetails/CartContext"; // Import our cart hook

const ProductDetails = () => {
  const { id } = useParams(); // get product ID from URL
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(defaultProductImage);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  
  const { addToCart } = useCart(); // Use the cart context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`); // call the backend
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.image || defaultProductImage);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setShowModal(true);
      
      
      // setTimeout(() => {
      //   setShowModal(false);
      // }, 5000);
    }
  };
  
  // Go to cart page
  const goToCart = () => {
    setShowModal(false);
    navigate('/cart');
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-page">
      {/* Image Section */}
      <div className="image-section">
        <img
          src={selectedImage}
          alt={product.name}
          className="main-image"
          onError={(e) => (e.target.src = defaultProductImage)}
        />
      </div>

      {/* Product Info Section */}
      <div className="info-section">
        <p className="category">{product.category || "Coffee | Light"}</p>
        <h2 className="product-title">{product.name}</h2>
        <p className="price">
          <span className="old-price">${product.old_price}</span>{" "}
          ${product.price}
        </p>

        <div className="quantity-control">
          <label>Quantity</label>
          <div className="controls">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>
          ADD TO CART
        </button>

        {/* Details Section */}
        <div className="collapsible-section">
          <div
            className="collapsible-header"
            onClick={() => setDetailsOpen(!detailsOpen)}
          >
            <span>Details</span>
            <span>{detailsOpen ? "-" : "+"}</span>
          </div>
          {detailsOpen && (
            <ul className="collapsible-content">
              <li>
                <strong>Description:</strong> {product.description || "No description"}
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-content">
              <div className="modal-icon">✓</div>
              <h3>Product Added to Cart!</h3>
              <p>{product.name} has been added to your cart.</p>
              <div className="modal-actions">
                <button className="continue-shopping" onClick={closeModal}>
                  CONTINUE SHOPPING
                </button>
                <button className="view-cart" onClick={goToCart}>
                  VIEW CART
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;