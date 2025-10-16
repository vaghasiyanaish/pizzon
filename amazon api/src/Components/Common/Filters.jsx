import React from 'react';

const Filters = ({ filters, onCategoryChange, onPriceChange, onRatingChange, onClearFilters }) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Kitchen' },
    { value: 'sports', label: 'Sports' }
  ];

  const priceRanges = [
    { min: 0, max: 1000, label: 'Under ₹1000' },
    { min: 1000, max: 5000, label: '₹1000 - ₹5000' },
    { min: 5000, max: 10000, label: '₹5000 - ₹10000' },
    { min: 10000, max: 50000, label: 'Over ₹10000' }
  ];

  const ratings = [4, 3, 2, 1];

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="fas fa-filter me-2"></i>Filters
        </h5>
        <button className="btn btn-sm btn-outline-dark" onClick={onClearFilters}>
          Clear All
        </button>
      </div>

      <div className="card-body">

        <FilterSection title="Category">
          {categories.map(cat => (
            <FilterButton
              key={cat.value}
              isActive={filters.category === cat.value}
              onClick={() => onCategoryChange(cat.value)}
            >
              {cat.label}
            </FilterButton>
          ))}
        </FilterSection>

        <FilterSection title="Price Range">
          {priceRanges.map(range => (
            <FilterButton
              key={range.label}
              isActive={filters.priceRange.min === range.min && filters.priceRange.max === range.max}
              onClick={() => onPriceChange(range)}
            >
              {range.label}
            </FilterButton>
          ))}
        </FilterSection>

        <FilterSection title="Customer Rating">
          {ratings.map(r => (
            <FilterButton
              key={r}
              isActive={filters.minRating === r}
              onClick={() => onRatingChange(r)}
            >
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`fa fa-star ${i < r ? 'text-warning' : 'text-muted'}`}></span>
              ))}
              <span className="ms-1">& Up</span>
            </FilterButton>
          ))}
        </FilterSection>

        <FilterSection title="Delivery Options">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="fastDelivery" />
            <label className="form-check-label" htmlFor="fastDelivery">
              <i className="fas fa-shipping-fast text-success me-1"></i>Get it by Tomorrow
            </label>
          </div>
        </FilterSection>

        <FilterSection title="Availability">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="inStock" defaultChecked />
            <label className="form-check-label" htmlFor="inStock">
              Include Out of Stock
            </label>
          </div>
        </FilterSection>

      </div>
    </div>
  );
};

const FilterSection = ({ title, children }) => (
  <div className="mb-4">
    <h6 className="text-dark mb-3 fw-bold">{title}</h6>
    <div className="list-group list-group-flush">{children}</div>
  </div>
);

const FilterButton = ({ children, isActive, onClick }) => (
  <button
    className={`list-group-item list-group-item-action border-0 px-0 ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    <div className="form-check">
      <input className="form-check-input" type="radio" checked={isActive} readOnly />
      <label className="form-check-label">{children}</label>
    </div>
  </button>
);

export default Filters;
