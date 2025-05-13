import React, { useState, useRef, useEffect } from 'react';
import './SidebarFilter.css';

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

const SidebarFilter = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [availabilityOpen, setAvailabilityOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  return (
    <div className="sidebar-filter">
      <CollapsibleSection
        title="Custom Menu"
        isOpen={menuOpen}
        toggleOpen={() => setMenuOpen(!menuOpen)}
      >
        <ul className="menu-list">
          <li>Home</li>
          <li>Shop</li>
          <li>Blog</li>
          <li>About us</li>
          <li>Contact</li>
        </ul>
      </CollapsibleSection>

      <CollapsibleSection
        title="Availability"
        isOpen={availabilityOpen}
        toggleOpen={() => setAvailabilityOpen(!availabilityOpen)}
      >
        <div className="checkbox-group">
          <label>
            <input type="checkbox" />
            In stock (9)
          </label>
          <label>
            <input type="checkbox" />
            Out of stock (1)
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
          <input type="text" placeholder="$ 0" />
          <label>To</label>
          <input type="text" placeholder="$ 150.00" />
        </div>
        <button className="filter-btn">Filter</button>
      </CollapsibleSection>
    </div>
  );
};

export default SidebarFilter;
