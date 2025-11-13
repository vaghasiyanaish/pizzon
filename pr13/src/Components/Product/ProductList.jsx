import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  getProductsAsync,
  setCategoryFilter,
  setPriceFilter,
  setRatingFilter,
  clearFilters,
  setSearchQuery,
  deleteProductAsync,
  updateProductAsync,
  addToCartAsync,
  addToWishlistAsync,
  removeFromWishlistAsync
} from '../../Services/actions/productActions';
import { Modal, Button, Form, Badge, Card, Alert } from 'react-bootstrap';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { products, filteredProducts, loading, error, filters } = useSelector(state => state.productList);
  const { userInfo } = useSelector(state => state.auth);
  const { wishlistItems } = useSelector(state => state.wishlist);

  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: '' });
  const [editData, setEditData] = useState({
    title: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    brand: '',
    image: '',
    features: [],
    specifications: {}
  });

  const categories = [
    { name: 'All Categories', value: 'all' },
    { name: 'Electronics', value: 'electronics' },
    { name: 'Fashion', value: 'fashion' },
    { name: 'Home & Kitchen', value: 'home' },
    { name: 'Appliances', value: 'appliances' },
    { name: 'Books', value: 'books' },
    { name: 'Beauty', value: 'beauty' },
    { name: 'Sports', value: 'sports' },
    { name: 'Toys', value: 'toys' }
  ];

  const priceRanges = [
    { label: 'Under ₹1000', value: '0-1000', min: 0, max: 1000 },
    { label: '₹1000 - ₹5000', value: '1000-5000', min: 1000, max: 5000 },
    { label: '₹5000 - ₹10000', value: '5000-10000', min: 5000, max: 10000 },
    { label: '₹10000 - ₹20000', value: '10000-20000', min: 10000, max: 20000 },
    { label: 'Over ₹20000', value: '20000-50000', min: 20000, max: 50000 }
  ];

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

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    if (category) dispatch(setCategoryFilter(category));
  }, [location.search, dispatch]);

  const showAlertMessage = (message, type = 'success') => {
    setShowAlert({ show: true, message, type });
    setTimeout(() => setShowAlert({ show: false, message: '', type: '' }), 3000);
  };

  const isInWishlist = (productId) => wishlistItems.some(item => item.id === productId);

  const handleCategoryChange = (category) => {
    dispatch(setCategoryFilter(category));
    navigate(`/products?category=${category}`, { replace: true });
  };

  const handlePriceChange = (range) => dispatch(setPriceFilter(range));
  const handleRatingChange = (rating) => dispatch(setRatingFilter(rating));
  const handleClearFilters = () => {
    dispatch(clearFilters());
    navigate('/products', { replace: true });
    showAlertMessage('All filters cleared!');
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowQuickView(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditData({
      title: product.title || '',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      category: product.category || 'electronics',
      description: product.description || '',
      brand: product.brand || '',
      image: product.image || getProductImage(product),
      inStock: product.inStock !== undefined ? product.inStock : true,
      features: Array.isArray(product.features) ? [...product.features] : [''],
      specifications: product.specifications || { RAM: '', Storage: '', Display: '', Battery: '', Connectivity: '', Processor: '' },
      rating: product.rating || { rate: 0, count: 0 }
    });
    setShowQuickView(false);
    setShowEdit(true);
  };

  const handleUpdate = () => {
    if (!selectedProduct) return showAlertMessage('No product selected for update!', 'danger');

    if (!editData.title || !editData.price || !editData.category || !editData.description || !editData.brand || !editData.image) {
      return showAlertMessage('Please fill all required fields!', 'danger');
    }

    const updatedData = {
      ...editData,
      price: Number(editData.price),
      originalPrice: editData.originalPrice ? Number(editData.originalPrice) : null,
      features: editData.features.filter(f => f.trim() !== ''),
      rating: { rate: parseFloat(editData.rating?.rate) || 0, count: parseInt(editData.rating?.count) || 0 },
      inStock: editData.inStock !== undefined ? editData.inStock : true,
      specifications: editData.specifications || {}
    };

    dispatch(updateProductAsync(selectedProduct.id, updatedData));
    setShowEdit(false);
    showAlertMessage('Product updated successfully!');
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setShowQuickView(false);
    setShowDelete(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct) return;
    dispatch(deleteProductAsync(selectedProduct.id));
    setShowDelete(false);
    showAlertMessage('Product deleted successfully!');
  };

  const handleAddToCart = (product) => {
    dispatch(addToCartAsync(product, quantity));
    setShowQuickView(false);
    showAlertMessage('Product added to cart!');
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlistAsync(product.id));
      showAlertMessage('Product removed from wishlist!', 'info');
    } else {
      dispatch(addToWishlistAsync(product));
      showAlertMessage('Product added to wishlist!');
    }
  };

  const getProductImage = (product) => product?.image?.startsWith('http') ? product.image : categoryImages[product?.category] || categoryImages.electronics;

  const getDiscountPercentage = (product) => product.originalPrice && product.price ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const getSortedProducts = () => {
    const list = Array.isArray(filteredProducts) ? [...filteredProducts] : [];
    switch (sortBy) {
      case 'price-low': return list.sort((a, b) => a.price - b.price);
      case 'price-high': return list.sort((a, b) => b.price - a.price);
      case 'rating': return list.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
      case 'newest': return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      default: return list;
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="product-list-page">
      {showAlert.show && (
        <Alert variant={showAlert.type} className="alert-fixed">
          <div className="d-flex justify-content-between align-items-center">
            <span>{showAlert.message}</span>
            <Button variant="close" onClick={() => setShowAlert({ show: false, message: '', type: '' })}></Button>
          </div>
        </Alert>
      )}

      <div className="page-header bg-light py-4 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="page-title mb-2">
                {filters.category !== 'all' ?
                  `${categories.find(cat => cat.value === filters.category)?.name} Products` :
                  'All Products'
                }
              </h1>
              <p className="text-muted mb-0">
                {sortedProducts.length} products found
                {filters.searchQuery && ` for "${filters.searchQuery}"`}
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex align-items-center justify-content-md-end gap-3">
                <span className="text-muted small">Sort by:</span>
                <select
                  className="form-select w-auto"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-lg-3 d-none d-lg-block">
            <div className="filters-sidebar">
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-amazon-secondary text-white">
                  <h6 className="mb-0">
                    <i className="fas fa-filter me-2"></i>
                    Filters
                  </h6>
                </div>
                <div className="card-body">
                  <div className="filter-section mb-4">
                    <h6 className="filter-title">Categories</h6>
                    <div className="filter-options">
                      {categories.map(category => (
                        <div
                          key={category.value}
                          className={`filter-option ${filters.category === category.value ? 'active' : ''}`}
                          onClick={() => handleCategoryChange(category.value)}
                        >
                          <span className="option-text">{category.name}</span>
                          <span className="option-count">
                            {category.value === 'all'
                              ? products.length
                              : products.filter(p => p.category === category.value).length
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="filter-section mb-4">
                    <h6 className="filter-title">Price Range</h6>
                    <div className="filter-options">
                      {priceRanges.map(range => (
                        <div
                          key={range.value}
                          className="filter-option"
                          onClick={() => handlePriceChange({ min: range.min, max: range.max })}
                        >
                          <span className="option-text">{range.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="filter-section">
                    <h6 className="filter-title">Customer Rating</h6>
                    <div className="filter-options">
                      {[4, 3, 2, 1].map(rating => (
                        <div
                          key={rating}
                          className="filter-option"
                          onClick={() => handleRatingChange(rating)}
                        >
                          <span className="option-text">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`fas fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}
                              ></i>
                            ))}
                            <span className="ms-2">& Up</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {(filters.category !== 'all' || filters.minRating > 0) && (
                    <div className="mt-4">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={handleClearFilters}
                        className="w-100"
                      >
                        <i className="fas fa-times me-2"></i>
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="d-lg-none mb-4">
              <Button
                variant="warning"
                className="w-100 btn-hover"
                onClick={() => setShowFilters(!showFilters)}
              >
                <i className="fas fa-filter me-2"></i>
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
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
              <div className="row g-4">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="col-xl-4 col-lg-6 col-md-6">
                    <ProductCard
                      product={product}
                      onQuickView={handleQuickView}
                      onEdit={userInfo?.isAdmin ? handleEdit : null}
                      onDelete={userInfo?.isAdmin ? handleDelete : null}
                      onAddToCart={handleAddToCart}
                      onWishlistToggle={handleWishlistToggle}
                      isInWishlist={isInWishlist(product.id)}
                      getProductImage={getProductImage}
                      getDiscountPercentage={getDiscountPercentage}
                      userInfo={userInfo}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal show={showQuickView} onHide={() => setShowQuickView(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Quick View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div className="row">
              <div className="col-md-6">
                <img
                  src={getProductImage(selectedProduct)}
                  alt={selectedProduct.title}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-md-6">
                <h5>{selectedProduct.title}</h5>
                <p className="text-muted">{selectedProduct.brand}</p>
                <div className="price-section mb-3">
                  <h4 className="text-danger">₹{selectedProduct.price?.toLocaleString()}</h4>
                  {selectedProduct.originalPrice && (
                    <div>
                      <span className="text-muted text-decoration-line-through">
                        ₹{selectedProduct.originalPrice.toLocaleString()}
                      </span>
                      <Badge bg="danger" className="ms-2">
                        {getDiscountPercentage(selectedProduct)}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="action-buttons">
                  <Button
                    variant="warning"
                    className="me-2 btn-hover"
                    onClick={() => handleAddToCart(selectedProduct)}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    Add to Cart
                  </Button>
                  <Button
                    variant={isInWishlist(selectedProduct.id) ? "danger" : "outline-danger"}
                    className="btn-hover"
                    onClick={() => handleWishlistToggle(selectedProduct)}
                  >
                    <i className={`fas fa-heart me-2 ${isInWishlist(selectedProduct.id) ? 'text-white' : ''}`}></i>
                    {isInWishlist(selectedProduct.id) ? 'Remove' : 'Wishlist'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg" centered>
        <Modal.Header closeButton className="bg-amazon-secondary text-white">
          <Modal.Title>
            <i className="fas fa-edit me-2"></i>
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="appliances">Appliances</option>
                    <option value="books">Books</option>
                    <option value="beauty">Beauty</option>
                    <option value="sports">Sports</option>
                    <option value="toys">Toys</option>
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
              <Form.Label className="fw-bold">Image URL *</Form.Label>
              <Form.Control
                type="url"
                value={editData.image}
                onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                placeholder="Enter image URL"
                required
              />
              {editData.image && (
                <div className="mt-2">
                  <img
                    src={editData.image}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxHeight: '150px' }}
                    onError={(e) => {
                      e.target.src = categoryImages.electronics;
                    }}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                placeholder="Enter detailed product description"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Key Features</Form.Label>
              <div className="features-container">
                {editData.features && editData.features.map((feature, index) => (
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
                  onClick={() => {
                    const newFeatures = [...(editData.features || []), ''];
                    setEditData({ ...editData, features: newFeatures });
                  }}
                >
                  <i className="fas fa-plus me-1"></i>Add Feature
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            <i className="fas fa-times me-2"></i>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleUpdate} className="btn-hover">
            <i className="fas fa-save me-2"></i>
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
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
  );
};

const ProductCard = ({
  product,
  onQuickView,
  onEdit,
  onDelete,
  onAddToCart,
  onWishlistToggle,
  isInWishlist,
  getProductImage,
  getDiscountPercentage,
  userInfo
}) => (
  <Card className="product-card h-100 shadow-sm">
    <div className="card-image-wrapper">
      <img
        src={getProductImage(product)}
        className="card-img-top"
        alt={product.title}
        onError={e => e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'}
      />
      <div className="card-overlay">
        <div className="action-buttons">
          <Button size="sm" variant="info" onClick={() => onQuickView(product)} title="Quick View"><i className="fas fa-eye"></i></Button>
          <Button size="sm" variant={isInWishlist ? 'danger' : 'outline-light'} onClick={() => onWishlistToggle(product)} title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}>
            <i className="fas fa-heart"></i>
          </Button>
          {userInfo?.isAdmin && <Button size="sm" variant="warning" onClick={() => onEdit && onEdit(product)} title="Edit Product"><i className="fas fa-edit"></i></Button>}
          {userInfo?.isAdmin && <Button size="sm" variant="danger" onClick={() => onDelete && onDelete(product)} title="Delete Product"><i className="fas fa-trash"></i></Button>}
        </div>
      </div>
      {getDiscountPercentage(product) > 0 && <div className="discount-badge">{getDiscountPercentage(product)}% OFF</div>}
      <Badge bg="warning" text="dark" className="festival-badge">Great Indian Festival</Badge>
    </div>
    <Card.Body className="d-flex flex-column">
      <h6 className="card-title">{product.title}</h6>
      <p className="card-text text-muted small mb-2">by {product.brand}</p>
      <div className="price-section mb-2">
        <span className="current-price">₹{product.price?.toLocaleString()}</span>
        {product.originalPrice && <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>}
      </div>
      <div className="rating-section mb-3">
        {[...Array(5)].map((_, i) => <i key={i} className={`fas fa-star ${i < Math.floor(product.rating?.rate || 0) ? 'text-warning' : 'text-muted'}`}></i>)}
        <span className="rating-count">({product.rating?.count || 0})</span>
      </div>
      <Button variant="warning" size="sm" className="w-100 mt-auto" onClick={() => onAddToCart(product)}>
        <i className="fas fa-shopping-cart me-2"></i>Add to Cart
      </Button>
    </Card.Body>
  </Card>
);


export default ProductList;