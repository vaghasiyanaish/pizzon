import React from 'react'

const Filters = ({ filters, onCategoryChange, onPriceChange, onRatingChange, onClearFilters }) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Kitchen' },
    { value: 'sports', label: 'Sports' }
  ]

  const priceRanges = [
    { min: 0, max: 1000, label: 'Under ₹1000' },
    { min: 1000, max: 5000, label: '₹1000 - ₹5000' },
    { min: 5000, max: 10000, label: '₹5000 - ₹10000' },
    { min: 10000, max: 50000, label: 'Over ₹10000' }
  ]

  const ratings = [4, 3, 2, 1]

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-warning text-dark">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <i className="fas fa-filter me-2"></i>
            Filters
          </h5>
          <button 
            className="btn btn-sm btn-outline-dark"
            onClick={onClearFilters}
          >
            Clear All
          </button>
        </div>
      </div>
      <div className="card-body">
        {/* Category Filter */}
        <div className="mb-4">
          <h6 className="text-dark mb-3 fw-bold">Category</h6>
          <div className="list-group list-group-flush">
            {categories.map(category => (
              <button
                key={category.value}
                className={`list-group-item list-group-item-action border-0 px-0 ${filters.category === category.value ? 'active' : ''}`}
                onClick={() => onCategoryChange(category.value)}
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    checked={filters.category === category.value}
                    onChange={() => {}}
                  />
                  <label className="form-check-label">
                    {category.label}
                  </label>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-4">
          <h6 className="text-dark mb-3 fw-bold">Price Range</h6>
          <div className="list-group list-group-flush">
            {priceRanges.map(range => (
              <button
                key={range.label}
                className={`list-group-item list-group-item-action border-0 px-0 ${filters.priceRange.min === range.min && filters.priceRange.max === range.max ? 'active' : ''}`}
                onClick={() => onPriceChange(range)}
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange.min === range.min && filters.priceRange.max === range.max}
                    onChange={() => {}}
                  />
                  <label className="form-check-label">
                    {range.label}
                  </label>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-4">
          <h6 className="text-dark mb-3 fw-bold">Customer Rating</h6>
          <div className="list-group list-group-flush">
            {ratings.map(rating => (
              <button
                key={rating}
                className={`list-group-item list-group-item-action border-0 px-0 ${filters.minRating === rating ? 'active' : ''}`}
                onClick={() => onRatingChange(rating)}
              >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rating"
                    checked={filters.minRating === rating}
                    onChange={() => {}}
                  />
                  <label className="form-check-label">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`fa fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}
                      ></span>
                    ))}
                    <span className="ms-1">& Up</span>
                  </label>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mb-3">
          <h6 className="text-dark mb-3 fw-bold">Delivery Options</h6>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="fastDelivery" />
            <label className="form-check-label" htmlFor="fastDelivery">
              <i className="fas fa-shipping-fast text-success me-1"></i>
              Get it by Tomorrow
            </label>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-3">
          <h6 className="text-dark mb-3 fw-bold">Availability</h6>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="inStock" defaultChecked />
            <label className="form-check-label" htmlFor="inStock">
              Include Out of Stock
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters