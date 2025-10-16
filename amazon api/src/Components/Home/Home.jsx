import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal, Button, Form, Badge, Alert } from 'react-bootstrap'
import {
  getProductsAsync,
  setCategoryFilter,
  setPriceFilter,
  setRatingFilter,
  clearFilters,
  deleteProductAsync,
  setSearchQuery,
  updateProductAsync,
  addToCartAsync,
  addToWishlistAsync,
  removeFromWishlistAsync
} from '../../Services/actions/productActions'
import ProductCard from '../Product/ProductCard'
import {
  FaMobileAlt,
  FaTshirt,
  FaHome,
  FaPlug,
  FaBook,
  FaGamepad,
  FaHeart,
  FaFootballBall
} from 'react-icons/fa'
import './Home.css'
import banner1 from '../../assets/banner1.jpg';
import banner2 from '../../assets/banner2.jpg';
import banner3 from '../../assets/banner3.jpg';
import banner4 from '../../assets/banner4.jpg';
import banner5 from '../../assets/banner5.jpg';
import banner6 from '../../assets/banner6.jpg';

const Home = () => {
  const dispatch = useDispatch()
  const { filteredProducts, loading, error, filters } = useSelector(state => state.productList)
  const { userInfo } = useSelector(state => state.auth)
  const { wishlistItems } = useSelector(state => state.wishlist)

  const categories = [
    { name: 'Electronics', icon: <FaMobileAlt />, value: 'electronics' },
    { name: 'Fashion', icon: <FaTshirt />, value: 'fashion' },
    { name: 'Home', icon: <FaHome />, value: 'home' },
    { name: 'Appliances', icon: <FaPlug />, value: 'appliances' },
    { name: 'Books', icon: <FaBook />, value: 'books' },
    { name: 'Toys', icon: <FaGamepad />, value: 'toys' },
    { name: 'Beauty', icon: <FaHeart />, value: 'beauty' },
    { name: 'Sports', icon: <FaFootballBall />, value: 'sports' }
  ]

  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('featured')
  const [showView, setShowView] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [editData, setEditData] = useState({
    title: '',
    price: '',
    category: '',
    description: '',
    brand: '',
    image: '',
    originalPrice: '',
    features: [],
    specifications: {}
  })
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: '' })
  const [quantity, setQuantity] = useState(1)

  const sampleProductImages = [
  ]

  useEffect(() => {
    dispatch(getProductsAsync())
  }, [dispatch])

  const getProductImage = (product = 0) => {
  if (product?.image) {
    return product.image;
  }

  const categoryImages = {
    electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    fashion: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    home: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&h=500&fit=crop',
    appliances: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=500&fit=crop',
    books: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=500&fit=crop',
    beauty: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop',
    sports: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop',
    toys: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=500&h=500&fit=crop'
  };
  
  return categoryImages[product?.category] || categoryImages.electronics;
}

  const showSuccessAlert = (message, type = 'success') => {
    setShowAlert({ show: true, message, type })
    setTimeout(() => setShowAlert({ show: false, message: '', type: '' }), 3000)
  }

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId)
  }

  const handleCategoryChange = (category) => {
    dispatch(setCategoryFilter(category))
  }

  const handlePriceChange = (priceRange) => {
    dispatch(setPriceFilter(priceRange))
  }

  const handleRatingChange = (rating) => {
    dispatch(setRatingFilter(rating))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
    showSuccessAlert('All filters cleared successfully!')
  }

  const handleView = (product) => {
    setSelectedProduct(product)
    setQuantity(1)
    setShowView(true)
  }

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditData({
      title: product.title || '',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      category: product.category || 'electronics',
      description: product.description || '',
      brand: product.brand || '',
      image: product.image || '',
      inStock: product.inStock !== undefined ? product.inStock : true,
      features: Array.isArray(product.features) ? [...product.features] : [''],
      specifications: {
        Material: product.specifications?.Material || '',
        Color: product.specifications?.Color || '',
        Weight: product.specifications?.Weight || '',
        ...product.specifications
      },
      rating: {
        rate: product.rating?.rate || 0,
        count: product.rating?.count || 0
      }
    });
    setShowView(false);
    setShowEdit(true);
  };

  const handleUpdate = () => {
    if (!selectedProduct) {
      showSuccessAlert('No product selected for update!', 'danger');
      return;
    }

    if (!editData.title || !editData.price || !editData.category || !editData.description || !editData.brand || !editData.image) {
      showSuccessAlert('Please fill all required fields!', 'danger');
      return;
    }

    const updatedProductData = {
      title: editData.title,
      price: Number(editData.price),
      originalPrice: editData.originalPrice ? Number(editData.originalPrice) : null,
      description: editData.description,
      category: editData.category,
      brand: editData.brand,
      image: editData.image,
      inStock: editData.inStock,
      features: editData.features.filter(feature => feature.trim() !== ''),
      specifications: editData.specifications,
      rating: {
        rate: parseFloat(editData.rating?.rate) || 0,
        count: parseInt(editData.rating?.count) || 0
      }
    };

    dispatch(updateProductAsync(selectedProduct.id, updatedProductData));
    setShowEdit(false);
    showSuccessAlert('Product updated successfully!');
  };

  const handleDelete = (product) => {
    if (!product || !product.id) {
      showSuccessAlert('Invalid product selected for deletion!', 'danger');
      return;
    }

    setSelectedProduct(product);
    setShowView(false);
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct || !selectedProduct.id) {
      showSuccessAlert('No product selected for deletion!', 'danger');
      return;
    }

    dispatch(deleteProductAsync(selectedProduct.id));
    setShowDelete(false);
    showSuccessAlert('Product deleted successfully!');
  };


  const handleAddToCart = (product) => {
    dispatch(addToCartAsync(product, quantity))
    setShowView(false)
    showSuccessAlert('Product added to cart successfully!')
  }

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlistAsync(product.id))
      showSuccessAlert('Product removed from wishlist!', 'info')
    } else {
      dispatch(addToWishlistAsync(product))
      showSuccessAlert('Product added to wishlist!')
    }
  }

  const getSortedProducts = () => {
    const productsToSort = Array.isArray(filteredProducts) ? [...filteredProducts] : []

    switch (sortBy) {
      case 'price-low':
        return productsToSort.sort((a, b) => a.price - b.price)
      case 'price-high':
        return productsToSort.sort((a, b) => b.price - a.price)
      case 'rating':
        return productsToSort.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
      case 'newest':
        return productsToSort.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      default:
        return productsToSort
    }
  }

  const sortedProducts = getSortedProducts()

  const featuredProducts = filteredProducts.slice(0, 8)
  const smartphoneDeals = filteredProducts.filter(p => p.category === 'electronics').slice(0, 6)
  const topDeals = filteredProducts.slice(0, 6)
  const fashionDeals = filteredProducts.filter(p => p.category === 'fashion').slice(0, 4)


  return (
    <div className="home-container">
      {showAlert.show && (
        <Alert variant={showAlert.type} className="alert-fixed">
          <div className="d-flex justify-content-between align-items-center">
            <span>{showAlert.message}</span>
            <Button variant="close" onClick={() => setShowAlert({ show: false, message: '', type: '' })}></Button>
          </div>
        </Alert>
      )}

      

      <div className="categories-bar py-3">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {categories.map((category) => (
              <div
                key={category.value}
                className={`category-item ${filters.category === category.value ? "active" : ""
                  }`}
                onClick={() => handleCategoryChange(category.value)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-12 d-lg-none mb-3">
            <div className="d-flex gap-2">
              <button
                className="btn btn-warning w-100 btn-hover"
                onClick={() => setShowFilters(!showFilters)}
              >
                <i className="fas fa-filter me-2"></i>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              <select
                className="form-select w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="col-12 d-lg-none mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title d-flex align-items-center">
                    <i className="fas fa-filter me-2 text-warning"></i>
                    Filters
                  </h5>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <h6 className="fw-bold">Category</h6>
                      <select
                        className="form-select"
                        value={filters.category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                      >
                        <option value="all">All Categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home & Kitchen</option>
                      </select>
                    </div>
                    <div className="col-6 mb-3">
                      <h6 className="fw-bold">Price Range</h6>
                      <select
                        className="form-select"
                        onChange={(e) => {
                          const value = e.target.value;
                          const ranges = {
                            '0-1000': { min: 0, max: 1000 },
                            '1000-5000': { min: 1000, max: 5000 },
                            '5000-10000': { min: 5000, max: 10000 },
                            '10000-50000': { min: 10000, max: 50000 }
                          };
                          handlePriceChange(ranges[value]);
                        }}
                      >
                        <option value="0-1000">Under ₹1000</option>
                        <option value="1000-5000">₹1000 - ₹5000</option>
                        <option value="5000-10000">₹5000 - ₹10000</option>
                        <option value="10000-50000">Over ₹10000</option>
                      </select>
                    </div>
                    <div className="col-12 mb-3">
                      <h6 className="fw-bold">Rating</h6>
                      <select
                        className="form-select"
                        value={filters.minRating}
                        onChange={(e) => handleRatingChange(Number(e.target.value))}
                      >
                        <option value="0">All Ratings</option>
                        <option value="4">4 Stars & Up</option>
                        <option value="3">3 Stars & Up</option>
                        <option value="2">2 Stars & Up</option>
                        <option value="1">1 Star & Up</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="col-12">
            {!filters.searchQuery && filters.category === 'all' && (
              <>
                <Section
                  title="Deals You Might Like"
                  subtitle="Personalized recommendations based on your interests"
                  products={featuredProducts}
                  handleView={handleView}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleAddToCart={handleAddToCart}
                  handleWishlistToggle={handleWishlistToggle}
                  isInWishlist={isInWishlist}
                  showDiscount={true}
                  getProductImage={getProductImage}
                />
                <Section
                  title="Electronics & Photo recommendations for..."
                  subtitle="Latest gadgets and photography equipment"
                  products={smartphoneDeals}
                  handleView={handleView}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleAddToCart={handleAddToCart}
                  handleWishlistToggle={handleWishlistToggle}
                  isInWishlist={isInWishlist}
                  showDiscount={true}
                  getProductImage={getProductImage}
                />

                <Section
                  title="Top deals in Smartphones & Basic..."
                  subtitle="Best offers on smartphones and accessories"
                  products={topDeals}
                  handleView={handleView}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleAddToCart={handleAddToCart}
                  handleWishlistToggle={handleWishlistToggle}
                  isInWishlist={isInWishlist}
                  showDiscount={true}
                  getProductImage={getProductImage}
                />

                <Section
                  title="Trending in Fashion"
                  subtitle="Latest fashion trends and styles"
                  products={fashionDeals}
                  handleView={handleView}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleAddToCart={handleAddToCart}
                  handleWishlistToggle={handleWishlistToggle}
                  isInWishlist={isInWishlist}
                  showDiscount={true}
                  getProductImage={getProductImage}
                />

                {!userInfo && (
                  <div className="sign-in-prompt text-center p-5 mb-5">
                    <div className="section-wrapper">
                      <div className="prompt-content">
                        <i className="fas fa-user-shield fa-3x text-warning mb-3"></i>
                        <h4 className="mb-3">Sign in for your best experience</h4>
                        <p className="text-muted mb-4">Get personalized recommendations, faster checkout, and exclusive deals</p>
                        <Link to="/login" className="btn btn-warning btn-lg px-5 btn-hover">
                          Sign in securely
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {(filters.searchQuery || filters.category !== 'all') && (
              <>
                <div className="products-header d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded">
                  <div>
                    <h2 className="mb-1">
                      {filters.searchQuery ? `Search: "${filters.searchQuery}"` : `${filters.category} Products`}
                    </h2>
                    <p className="text-muted mb-0">{sortedProducts.length} products found</p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <select
                      className="form-select w-auto"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="featured">Sort by: Featured</option>
                      <option value="newest">Newest First</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                    </select>
                  </div>
                </div>

                {(filters.category !== 'all' || filters.minRating > 0 || filters.searchQuery) && (
                  <div className="active-filters mb-4">
                    <div className="d-flex flex-wrap gap-2 align-items-center p-3 bg-white rounded shadow-sm">
                      <strong className="me-2">Active Filters:</strong>
                      {filters.searchQuery && (
                        <Badge bg="warning" text="dark" className="filter-badge">
                          Search: {filters.searchQuery}
                          <i
                            className="fas fa-times ms-2 cursor-pointer"
                            onClick={() => dispatch(setSearchQuery(''))}
                          ></i>
                        </Badge>
                      )}
                      {filters.category !== 'all' && (
                        <Badge bg="warning" text="dark" className="filter-badge">
                          Category: {filters.category}
                          <i
                            className="fas fa-times ms-2 cursor-pointer"
                            onClick={() => handleCategoryChange('all')}
                          ></i>
                        </Badge>
                      )}
                      {filters.minRating > 0 && (
                        <Badge bg="warning" text="dark" className="filter-badge">
                          Rating: {filters.minRating}+
                          <i
                            className="fas fa-times ms-2 cursor-pointer"
                            onClick={() => handleRatingChange(0)}
                          ></i>
                        </Badge>
                      )}
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={handleClearFilters}
                        className="ms-auto"
                      >
                        Clear All
                      </Button>
                    </div>
                  </div>
                )}

                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading amazing products for you...</p>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger text-center py-4">
                    <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
                    <h5>Oops! Something went wrong</h5>
                    <p className="mb-0">{error}</p>
                  </div>
                ) : sortedProducts.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fas fa-search fa-4x text-muted mb-3"></i>
                    <h4>No products found</h4>
                    <p className="text-muted mb-4">Try adjusting your search criteria or filters</p>
                    <Button variant="warning" onClick={handleClearFilters}>
                      <i className="fas fa-times me-2"></i>
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <div className="row">
                    {sortedProducts.map((product, index) => (
                      <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 mb-4">
                        <ProductCard
                          product={product}
                          onView={() => handleView(product)}
                          onEdit={userInfo?.isAdmin ? () => handleEdit(product) : null}
                          onDelete={userInfo?.isAdmin ? () => handleDelete(product) : null}
                          onAddToCart={() => handleAddToCart(product)}
                          onWishlistToggle={() => handleWishlistToggle(product)}
                          isInWishlist={isInWishlist(product.id)}
                          getProductImage={() => getProductImage(product, index)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Modal show={showView} onHide={() => setShowView(false)} size="xl" centered className="product-view-modal">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="w-100">
            <div className="d-flex justify-content-between align-items-start">
              <h4 className="mb-0">Product Details</h4>
              <div className="d-flex align-items-center gap-2">
                {selectedProduct?.inStock && <Badge bg="success" className="fs-6">In Stock</Badge>}

                {userInfo && userInfo.isAdmin && (
  <>
    <Button
      variant="info"
      size="sm"
      className="btn-hover"
      onClick={() => handleEdit(selectedProduct)}
    >
      <i className="fas fa-edit me-1"></i>
      Edit
    </Button>
    <Button
      variant="danger"
      size="sm"
      className="btn-hover"
      onClick={() => handleDelete(selectedProduct)}
    >
      <i className="fas fa-trash me-1"></i>
      Delete
    </Button>
  </>
)}
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          {selectedProduct && (
            <div className="row">
              <div className="col-md-6">
                <div className="product-image-container text-center">
                  <img
                    src={getProductImage(selectedProduct)}
                    alt={selectedProduct.title}
                    className="img-fluid rounded-3 product-detail-image"
                    onError={(e) => {
                      e.target.src = sampleProductImages[0];
                    }}
                  />
                  <div className="image-badges mt-3">
                    {selectedProduct.originalPrice && (
                      <Badge bg="danger" className="me-2">
                        {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                    <Badge bg="warning" text="dark">Great Indian Festival</Badge>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="product-details">
                  <h3 className="product-title">{selectedProduct.title}</h3>
                  <p className="product-brand text-muted">by {selectedProduct.brand}</p>

                  <div className="price-section mb-3">
                    <h2 className="text-danger mb-1">₹{selectedProduct.price?.toLocaleString()}</h2>
                    {selectedProduct.originalPrice && (
                      <>
                        <span className="text-muted text-decoration-line-through fs-5">
                          ₹{selectedProduct.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-success fs-6 ms-2">
                          Save ₹{(selectedProduct.originalPrice - selectedProduct.price).toLocaleString()}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="rating-section mb-3">
                    <div className="d-flex align-items-center">
                      <div className="rating-stars me-2">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${i < Math.floor(selectedProduct.rating?.rate || 0) ? 'text-warning' : 'text-muted'}`}
                          ></i>
                        ))}
                      </div>
                      <span className="text-muted">
                        {selectedProduct.rating?.rate || 0} • {selectedProduct.rating?.count || 0} reviews
                      </span>
                    </div>
                  </div>

                  <div className="category-badges mb-3">
                    <Badge bg="warning" text="dark" className="me-2">{selectedProduct.category}</Badge>
                    <Badge bg="warning" text="dark">{selectedProduct.brand}</Badge>
                  </div>

                  <p className="product-description text-muted">{selectedProduct.description}</p>

                  {selectedProduct.features && selectedProduct.features.length > 0 && (
                    <div className="features-section mb-3">
                      <h6 className="fw-bold">Key Features:</h6>
                      <ul className="list-unstyled">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="text-muted">
                            <i className="fas fa-check text-success me-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="action-section">
                    <div className="quantity-selector mb-3">
                      <label className="form-label fw-bold">Quantity:</label>
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <i className="fas fa-minus"></i>
                        </Button>
                        <span className="px-3 fw-bold">{quantity}</span>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <i className="fas fa-plus"></i>
                        </Button>
                      </div>
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                      <Button
                        variant="warning"
                        size="lg"
                        className="flex-fw-100 btn-hover"
                        onClick={() => handleAddToCart(selectedProduct)}
                      >
                        <i className="fas fa-shopping-cart me-2"></i>
                        Add to Cart
                      </Button>

                      <Button
                        variant={isInWishlist(selectedProduct.id) ? "danger" : "outline-danger"}
                        size="lg"
                        className="btn-hover"
                        onClick={() => handleWishlistToggle(selectedProduct)}
                      >
                        <i className={`fas fa-heart me-2 ${isInWishlist(selectedProduct.id) ? 'text-white' : ''}`}></i>
                        {isInWishlist(selectedProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

<Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg" centered>
  <Modal.Header closeButton className="bg-warning text-dark">
    <Modal.Title>
      <i className="fas fa-edit me-2"></i>
      Edit Product
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedProduct && (
      <Form>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Product Title *</Form.Label>
              <Form.Control
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                placeholder="Enter product title"
                required
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Brand *</Form.Label>
              <Form.Control
                type="text"
                value={editData.brand}
                onChange={(e) => setEditData({ ...editData, brand: e.target.value })}
                placeholder="Enter brand name"
                required
              />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Current Price (₹) *</Form.Label>
              <Form.Control
                type="number"
                value={editData.price}
                onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                placeholder="Enter current price"
                min="0"
                step="0.01"
                required
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Original Price (₹)</Form.Label>
              <Form.Control
                type="number"
                value={editData.originalPrice}
                onChange={(e) => setEditData({ ...editData, originalPrice: e.target.value })}
                placeholder="Enter original price"
                min="0"
                step="0.01"
              />
            </Form.Group>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Category *</Form.Label>
              <Form.Select
                value={editData.category}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Stock Status</Form.Label>
              <Form.Select
                value={editData.inStock}
                onChange={(e) => setEditData({ ...editData, inStock: e.target.value === 'true' })}
              >
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
              </Form.Select>
            </Form.Group>
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Product Image URL *</Form.Label>
          <Form.Control
            type="url"
            value={editData.image}
            onChange={(e) => setEditData({ ...editData, image: e.target.value })}
            placeholder="Enter image URL"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Description *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            placeholder="Enter product description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Features</Form.Label>
          {editData.features.map((feature, index) => (
            <div key={index} className="input-group mb-2">
              <Form.Control
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...editData.features];
                  newFeatures[index] = e.target.value;
                  setEditData({ ...editData, features: newFeatures });
                }}
                placeholder={`Feature ${index + 1}`}
              />
              <Button
                variant="outline-danger"
                onClick={() => {
                  const newFeatures = editData.features.filter((_, i) => i !== index);
                  setEditData({ ...editData, features: newFeatures });
                }}
              >
                <i className="fas fa-times"></i>
              </Button>
            </div>
          ))}
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => setEditData({ 
              ...editData, 
              features: [...editData.features, ''] 
            })}
          >
            <i className="fas fa-plus me-1"></i>Add Feature
          </Button>
        </Form.Group>
      </Form>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowEdit(false)}>
      Cancel
    </Button>
    <Button 
      variant="warning" 
      onClick={handleUpdate}
      disabled={!editData.title || !editData.price || !editData.category}
    >
      Update Product
    </Button>
  </Modal.Footer>
</Modal>

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton className="bg-amazon-secondary text-white">
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i>
            Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <i className="fas fa-trash-alt fa-3x text-danger mb-3"></i>
          <h5>Are you sure you want to delete this product?</h5>
          <p className="text-muted mb-0">
            <strong>"{selectedProduct?.title}"</strong> will be permanently removed from the system.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDelete(false)}>
            <i className="fas fa-times me-2"></i>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} className="btn-hover">
            <i className="fas fa-trash me-2"></i>
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

const Section = ({
  title,
  subtitle,
  products,
  handleView,
  handleEdit,
  handleDelete,
  handleAddToCart,
  handleWishlistToggle,
  isInWishlist,
  showDiscount = false,
  getProductImage
}) => {
  return (
    <div className="section-bg py-5">
      <div className="section-wrapper">
        <div className="section-header d-flex justify-content-between align-items-end mb-4">
          <div>
            <h3 className="section-title fw-bold text-dark mb-2">{title}</h3>
            {subtitle && <p className="section-subtitle text-muted mb-0">{subtitle}</p>}
          </div>
          <Link to="/products" className="section-link">
            View All <i className="fas fa-chevron-right ms-1"></i>
          </Link>
        </div>

        <div className="row g-4">
          {products.map((product, index) => (
            <div key={product.id || index} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="product-card-enhanced p-2">
                <div className="card-image-wrapper">
                  <img
                    src={getProductImage ? getProductImage(product, index) : product.image}
                    className="card-img-top"
                    alt={product.title}
                    onError={(e) => {
                      e.target.src = '';
                    }}
                  />
                  <div className="card-overlay">
                    <div className="action-buttons">
                      <Button
                        size="sm"
                        variant="info"
                        className="action-btn view-btn"
                        onClick={() => handleView(product)}
                      >
                        <i className="fas fa-eye"></i>
                      </Button>
                      {handleEdit && (
                        <Button
                          size="sm"
                          variant="warning"
                          className="action-btn edit-btn"
                          onClick={() => handleEdit(product)}
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                      )}
                      {handleDelete && (
                        <Button
                          size="sm"
                          variant="danger"
                          className="action-btn delete-btn"
                          onClick={() => handleDelete(product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      )}
                    </div>
                    <div className="quick-actions">
                      <Button
                        size="sm"
                        variant="dark"
                        className="quick-action-btn"
                        onClick={() => handleAddToCart && handleAddToCart(product)}
                      >
                        <i className="fas fa-cart-plus me-1"></i>
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant={isInWishlist(product.id) ? 'danger' : 'outline-light'}
                        className="quick-action-btn"
                        onClick={() => handleWishlistToggle && handleWishlistToggle(product)}
                      >
                        <i
                          className={`fas fa-heart ${isInWishlist(product.id) ? 'text-white' : ''
                            }`}
                        ></i>
                      </Button>
                    </div>
                  </div>
                  {showDiscount && product.originalPrice && (
                    <div className="discount-badge">
                      {Math.round(
                        ((product.originalPrice - product.price) / product.originalPrice) * 100
                      )}
                      % OFF
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <h6 className="card-title">{product.title}</h6>
                  <div className="price-section">
                    <span className="current-price">
                      ₹{product.price?.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="original-price">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="rating-section">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fas fa-star ${i < Math.floor(product.rating?.rate || 0)
                            ? 'text-warning'
                            : 'text-muted'
                            }`}
                        ></i>
                      ))}
                    </div>
                    <span className="rating-count">
                      ({product.rating?.count || 0})
                    </span>
                  </div>
                  <div className="product-meta">
                    <span className="category-badge">{product.category}</span>
                    <span className="brand-badge">{product.brand}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home

