import React, { useState } from "react";
import "./ProductDetails.css";
import product from '../../assets/product1.png';


const ProductDetails = () => {
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);
  

  const productImages = [
    { id: 1, src: product, alt: "Product View 1" },
    { id: 2, src: product, alt: "Product View 2" },
    { id: 3, src: product, alt: "Product View 3" }
  ];
  
  // State to track the currently selected image
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  
  // Function to handle thumbnail clicks
  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };
  
  return (
    <div className="product-page">
      {/* Image Section */}
      <div className="image-section">
        <img 
          src={selectedImage.src} 
          alt={selectedImage.alt} 
          className="main-image" 
        />
        <div className="thumbnail-row">
          {productImages.map((image) => (
            <img 
              key={image.id}
              src={image.src} 
              alt={image.alt} 
              className={`thumbnail ${selectedImage.id === image.id ? 'selected' : ''}`}
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </div>
      </div>
      
      {/* Product Info Section */}
      <div className="info-section">
        <p className="category">Coffee | Light</p>
        <h2 className="product-title">Cold Brew</h2>
        <p className="price">
          <span className="old-price">$100</span> $80
        </p>
        
        {/* Quantity - Updated to match image */}
        <div className="quantity-control">
          <label>Quantity</label>
          <div className="controls">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
        
        {/* Size - Updated to match image */}
        <div className="size-box">
          <label>Size</label>
          <div className="size-options">
            <div className="size">1 lb</div>
            <div className="size">2 lb</div>
            <div className="size">3 lb</div>
          </div>
        </div>
        
        <button className="add-to-cart">ADD TO CART</button>
        
        {/* Details Section */}
        <div className="collapsible-section">
          <div className="collapsible-header" onClick={() => setDetailsOpen(!detailsOpen)}>
            <span>Details</span>
            <span>{detailsOpen ? "-" : "+"}</span>
          </div>
          {detailsOpen && (
            <ul className="collapsible-content">
              <li><strong>Ligh Coffee Beans:</strong> Very Good Coffee Beans</li>
              
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;