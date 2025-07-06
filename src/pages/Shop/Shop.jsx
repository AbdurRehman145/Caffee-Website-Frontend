import React, { useState, useEffect, useRef } from 'react';
import './Shop.css';
import defaultProductImage from '../../assets/product1.png';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

const CollapsibleSection = ({ title, isOpen, toggleOpen, children }) => {
  const contentRef = useRef(null);
  
  return (
    <div className="filter-section">
      <div className="filter-header" onClick={toggleOpen}>
        <h3 className="filter-title">{title}</h3>
        <span className="toggle-icon">{isOpen ? '−' : '+'}</span>
      </div>
      <div
        className="collapsible-content"
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
        }}
      >
        {children}
      </div>
    </div>
  );
};

const SidebarFilter = ({ filters, onFilterChange, productCounts }) => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  
  const handleAvailabilityChange = (type) => {
    const newAvailability = { ...filters.availability };
    newAvailability[type] = !newAvailability[type];
    onFilterChange({ ...filters, availability: newAvailability });
  };

  const handlePriceChange = (field, value) => {
    const newPrice = { ...filters.price };
    newPrice[field] = value;
    onFilterChange({ ...filters, price: newPrice });
  };

  const applyPriceFilter = () => {
    // Trigger a re-filter when the Filter button is clicked
    onFilterChange({ ...filters });
  };

  const clearAllFilters = () => {
    onFilterChange({
      availability: { inStock: false, outOfStock: false },
      price: { min: '', max: '' }
    });
  };
  
  return (
    <div className="sidebar-filter">
      
      <CollapsibleSection
        title="Availability"
        isOpen={availabilityOpen}
        toggleOpen={() => setAvailabilityOpen(!availabilityOpen)}
      >
        <div className="checkbox-group">
          <label>
            <input 
              type="checkbox" 
              checked={filters.availability.inStock}
              onChange={() => handleAvailabilityChange('inStock')}
            />
            In stock ({productCounts.inStock})
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={filters.availability.outOfStock}
              onChange={() => handleAvailabilityChange('outOfStock')}
            />
            Out of stock ({productCounts.outOfStock})
          </label>
        </div>
      </CollapsibleSection>
      
      <CollapsibleSection
        title="Price"
        isOpen={priceOpen}
        toggleOpen={() => setPriceOpen(!priceOpen)}
      >
        <div className="price-inputs">
          <label>From</label>
          <input 
            type="number" 
            placeholder="$ 0" 
            value={filters.price.min}
            onChange={(e) => handlePriceChange('min', e.target.value)}
          />
          <label>To</label>
          <input 
            type="number" 
            placeholder="$ 150.00" 
            value={filters.price.max}
            onChange={(e) => handlePriceChange('max', e.target.value)}
          />
        </div>
        <button className="filter-btn" onClick={applyPriceFilter}>Filter</button>
        <button className="clear-btn" onClick={clearAllFilters}>Clear All</button>
      </CollapsibleSection>
    </div>
  );
};

const ProductGrid = ({ products, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: document.querySelector('.product-grid').offsetTop - 100, behavior: 'smooth' });
    }
  };

  // Reset to first page when products change
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="empty-container">No products match your filters</div>;
  }

  return (
    <div className="product-grid-container">
      <div className="products-header">
        <span className="products-count">
          Showing {currentProducts.length} of {products.length} products
        </span>
      </div>
      
      <div className="product-grid">
        {currentProducts.map((product) => (
          <div className="product-card" key={product._id || product.id}>
            <div className="image-wrapper">
              {product.label && (
                <span className={`label ${product.label.toLowerCase() === "soldout" ? "soldout" : "sale"}`}>
                  {product.label}
                </span>
              )}
              {product.discount && <span className="discount">{product.discount}</span>}
              <a href={`/products/${product.id}`}>
                <img 
                  src={product.image || defaultProductImage} 
                  alt={product.name} 
                  onError={(e) => {
                    e.target.src = defaultProductImage;
                  }}
                />
              </a>
            </div>
            <div className="product-info">
              <h4>{product.name}</h4>
              <div className="price">
                <span className="current">${parseFloat(product.price).toFixed(2)}</span>
                {product.old_price && product.old_price !== product.price && (
                  <span className="old">${parseFloat(product.old_price).toFixed(2)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <span
            className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </span>
          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index}
              className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          <span
            className={`page-link ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </span>
        </div>
      )}
    </div>
  );
};

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    availability: { inStock: false, outOfStock: false },
    price: { min: '', max: '' }
  });

  // Fetch products on component mount
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setAllProducts(data);
          setFilteredProducts(data);
        } else {
          setAllProducts([]);
          setFilteredProducts([]);
          setError('Unexpected data format received');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);

  // Apply filters whenever filters or products change
  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    // Apply availability filter
    const { inStock, outOfStock } = filters.availability;
    if (inStock || outOfStock) {
      filtered = filtered.filter(product => {
        const isInStock = product.stock > 0 || !product.hasOwnProperty('stock') || product.label?.toLowerCase() !== 'soldout';
        const isOutOfStock = product.stock === 0 || product.label?.toLowerCase() === 'soldout';
        
        if (inStock && outOfStock) return true;
        if (inStock) return isInStock;
        if (outOfStock) return isOutOfStock;
        return false;
      });
    }

    // Apply price filter
    const { min, max } = filters.price;
    if (min !== '' || max !== '') {
      filtered = filtered.filter(product => {
        const price = parseFloat(product.price);
        const minPrice = min === '' ? 0 : parseFloat(min);
        const maxPrice = max === '' ? Infinity : parseFloat(max);
        
        return price >= minPrice && price <= maxPrice;
      });
    }

    setFilteredProducts(filtered);
  }, [allProducts, filters]);

  // Calculate product counts for filter display
  const productCounts = {
    inStock: allProducts.filter(product => 
      product.stock > 0 || !product.hasOwnProperty('stock') || product.label?.toLowerCase() !== 'soldout'
    ).length,
    outOfStock: allProducts.filter(product => 
      product.stock === 0 || product.label?.toLowerCase() === 'soldout'
    ).length
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Show loading screen while data is loading
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="shop-layout">
      <SidebarFilter 
        filters={filters}
        onFilterChange={handleFilterChange}
        productCounts={productCounts}
      />
      <ProductGrid 
        products={filteredProducts}
        error={error}
      />
    </div>
  );
};

export default Shop;