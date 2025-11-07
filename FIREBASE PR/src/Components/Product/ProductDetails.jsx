import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Modal, Button, Alert } from 'react-bootstrap';
import {
  getProductDetailsAsync,
  addToCartAsync,
  addToWishlistAsync,
  deleteProductAsync
} from '../../Services/actions/productActions';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading } = useSelector(state => state.productDetails);
  const { userInfo } = useSelector(state => state.auth);
  const { wishlistItems } = useSelector(state => state.wishlist);

  const [selectedColor, setSelectedColor] = useState('Crystal Purple');
  const [selectedStorage, setSelectedStorage] = useState('6+128');
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    if (id) dispatch(getProductDetailsAsync(id));
  }, [dispatch, id]);

  const showAlert = (message, type = 'success') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCartAsync({ ...product, selectedColor, selectedStorage }, quantity));
    showAlert('Product added to cart successfully!');
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    dispatch(addToWishlistAsync(product));
    showAlert('Product added to wishlist!');
  };

  const handleBuyNow = () => {
    if (!product) return;
    navigate('/checkout', {
      state: { product: { ...product, selectedColor, selectedStorage }, quantity }
    });
  };

  const handleEdit = () => {
    if (product) navigate(`/edit-product/${product.id}`);
  };

  const handleDelete = () => setShowDelete(true);

  const handleConfirmDelete = () => {
    if (!product) return;
    dispatch(deleteProductAsync(product.id));
    setShowDelete(false);
    showAlert('Product deleted successfully!');
    setTimeout(() => navigate('/'), 1000);
  };

  const isInWishlist = wishlistItems.some(item => item.id === product?.id);

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (!product) return (
    <div className="container py-5 text-center">
      <h2>Product not found</h2>
      <Link to="/" className="btn btn-warning mt-3">Continue Shopping</Link>
    </div>
  );

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const productImages = [product.image];

  return (
    <div className="container py-4">

      {alert.show && (
        <Alert variant={alert.type} className="alert-fixed">
          <div className="d-flex justify-content-between align-items-center">
            <span>{alert.message}</span>
            <Button variant="close" onClick={() => setAlert({ show: false, message: '', type: '' })}></Button>
          </div>
        </Alert>
      )}

      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-amazon-link">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <a href="#" className="text-amazon-link">Electronics</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#" className="text-amazon-link">Smartphones</a>
          </li>
          <li className="breadcrumb-item active">{product.brand}</li>
        </ol>
      </nav>

      {userInfo?.isAdmin && (
        <div className="admin-actions mb-4 d-flex gap-2 justify-content-end">
          <Button variant="warning" onClick={handleEdit} className="btn-hover">
            <i className="fas fa-edit me-2"></i>Edit Product
          </Button>
          <Button variant="danger" onClick={handleDelete} className="btn-hover">
            <i className="fas fa-trash me-2"></i>Delete Product
          </Button>
        </div>
      )}

      <div className="row">
        <div className="col-md-1 d-flex flex-column gap-2">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.title} view ${index + 1}`}
              className={`img-thumbnail cursor-pointer ${currentImage === index ? 'border-warning' : ''}`}
              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>

        <div className="col-md-5">
          <div className="card border-0">
            <img
              src={productImages[currentImage]}
              alt={product.title}
              className="card-img-top p-4"
              style={{ height: '500px', objectFit: 'contain' }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <h1 className="h3 fw-bold mb-2">{product.title}</h1>

          <div className="d-flex align-items-center mb-3">
            <div className="text-warning me-2">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`fas fa-star ${i < Math.floor(product.rating?.rate || 4.2) ? 'text-warning' : 'text-muted'}`}></i>
              ))}
            </div>
            <span className="text-muted small me-3">({product.rating?.count || 1245})</span>
            <span className="text-amazon-link small">10K+ bought in past month</span>
          </div>

          <div className="bg-light p-3 rounded mb-3">
            <span className="badge bg-danger me-2">Limited time deal</span>
            <span className="fw-bold">₹{product.price.toLocaleString()}</span>
            <span className="text-muted text-decoration-line-through ms-2">₹{product.originalPrice?.toLocaleString()}</span>
            <span className="text-success ms-2">{discount}% off</span>
          </div>

          <div className="mb-3">
            <h6 className="fw-bold">Color: <span className="text-muted">{selectedColor}</span></h6>
            <div className="d-flex gap-2">
              {['Crystal Purple', 'Titanium Black', 'Ocean Blue'].map(color => (
                <button
                  key={color}
                  className={`btn btn-outline-secondary btn-sm ${selectedColor === color ? 'active border-warning' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold">Size:</h6>
            <div className="d-flex gap-2">
              {['4+128', '6+128', '8+256'].map(storage => (
                <button
                  key={storage}
                  className={`btn btn-outline-secondary ${selectedStorage === storage ? 'active border-warning' : ''}`}
                  onClick={() => setSelectedStorage(storage)}
                >
                  {storage} GB
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h6 className="fw-bold">Quantity:</h6>
            <select
              className="form-select w-auto"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>Qty: {i + 1}</option>
              ))}
            </select>
          </div>

          <div className="d-grid gap-2 d-md-flex mb-4">
            <button className="btn btn-warning flex-fill py-3" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-danger flex-fill py-3" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button className="btn btn-outline-secondary" onClick={handleAddToWishlist}>
              <i className={`fas fa-heart ${isInWishlist ? 'text-danger' : ''}`}></i>
            </button>
          </div>
        </div>
      </div>

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton className="bg-amazon-secondary text-white">
          <Modal.Title>
            <i className="fas fa-exclamation-triangle me-2"></i>Confirm Delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <i className="fas fa-trash-alt fa-3x text-danger mb-3"></i>
          <h5>Are you sure you want to delete this product?</h5>
          <p className="text-muted mb-0">
            <strong>"{product?.title}"</strong> will be permanently removed.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowDelete(false)}>
            <i className="fas fa-times me-2"></i>Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete} className="btn-hover">
            <i className="fas fa-trash me-2"></i>Delete Product
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default ProductDetail;
