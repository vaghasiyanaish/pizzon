import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Modal, Button, Alert } from 'react-bootstrap'
import {
  getProductDetails,
  addToCart,
  addToWishlist,
  deleteProduct,
  updateProduct
} from '../../Services/actions/productActions'

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { product, loading } = useSelector(state => state.productDetails)
  const { userInfo } = useSelector(state => state.auth)
  const { wishlistItems } = useSelector(state => state.wishlist)

  const [selectedColor, setSelectedColor] = useState('Crystal Purple')
  const [selectedStorage, setSelectedStorage] = useState('6+128')
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)
  const [showDelete, setShowDelete] = useState(false)
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: '' })

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id))
    }
  }, [dispatch, id])

  const showSuccessAlert = (message, type = 'success') => {
    setShowAlert({ show: true, message, type })
    setTimeout(() => setShowAlert({ show: false, message: '', type: '' }), 3000)
  }

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, selectedColor, selectedStorage }, quantity))
      showSuccessAlert('Product added to cart successfully!')
    }
  }

  const handleAddToWishlist = () => {
    if (product) {
      dispatch(addToWishlist(product))
      showSuccessAlert('Product added to wishlist!')
    }
  }

  const handleBuyNow = () => {
    if (product) {
      navigate('/checkout', {
        state: {
          product: { ...product, selectedColor, selectedStorage },
          quantity
        }
      })
    }
  }

  const handleEdit = () => {
    if (product) {
      navigate(`/edit-product/${product.id}`)
    }
  }

  const handleDelete = () => {
    setShowDelete(true)
  }

  const handleConfirmDelete = () => {
    if (product) {
      dispatch(deleteProduct(product.id))
      setShowDelete(false)
      showSuccessAlert('Product deleted successfully!')
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }
  }

  const isInWishlist = wishlistItems.some(item => item.id === product?.id)

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-warning mt-3">
          Continue Shopping
        </Link>
      </div>
    )
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const productImages = [
    product.image,
  ]

  return (
    <div className="container py-4">
      {showAlert.show && (
        <Alert variant={showAlert.type} className="alert-fixed">
          <div className="d-flex justify-content-between align-items-center">
            <span>{showAlert.message}</span>
            <Button variant="close" onClick={() => setShowAlert({ show: false, message: '', type: '' })}></Button>
          </div>
        </Alert>
      )}

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/" className="text-amazon-link">Home</Link></li>
          <li className="breadcrumb-item"><a href="#" className="text-amazon-link">Electronics</a></li>
          <li className="breadcrumb-item"><a href="#" className="text-amazon-link">Smartphones</a></li>
          <li className="breadcrumb-item active">{product.brand}</li>
        </ol>
      </nav>

      {/* Admin Actions */}
      {userInfo?.isAdmin && (
        <div className="admin-actions mb-4">
          <div className="d-flex gap-2 justify-content-end">
            <Button
              variant="warning"
              onClick={handleEdit}
              className="btn-hover"
            >
              <i className="fas fa-edit me-2"></i>
              Edit Product
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              className="btn-hover"
            >
              <i className="fas fa-trash me-2"></i>
              Delete Product
            </Button>
          </div>
        </div>
      )}

      <div className="row">
        {/* Product Images */}
        <div className="col-md-1">
          <div className="d-flex flex-column gap-2">
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

        {/* Product Info */}
        <div className="col-md-6">
          <h1 className="h3 fw-bold mb-2">{product.title}</h1>

          {/* Rating */}
          <div className="d-flex align-items-center mb-3 ">
            <div className="text-warning me-2">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fas fa-star ${i < Math.floor(product.rating?.rate || 4.2) ? 'text-warning' : 'text-muted'}`}
                ></i>
              ))}
            </div>
            <span className="text-muted small me-3">({product.rating?.count || 1245})</span>
            <span className="text-amazon-link small">10K+ bought in past month</span>
          </div>

          {/* Special Offer Badge */}
          <div className="bg-light p-3 rounded mb-3">
            <span className="badge bg-danger me-2">Limited time deal</span>
            <span className="fw-bold">₹{product.price.toLocaleString()}</span>
            <span className="text-muted text-decoration-line-through ms-2">₹{product.originalPrice?.toLocaleString()}</span>
            <span className="text-success ms-2">{discount}% off</span>
          </div>

          {/* About item */}
          <div className="mb-4">
            <h6 className="fw-bold">About this item</h6>
            <ul className="small">
              <li>Massive 6000mAh Battery for all-day power</li>
              <li>MediaTek Dimensity 6300 5G Processor</li>
              <li>Ultra-Slim 7.94mm Design</li>
              <li>120Hz Punch-Hole Display</li>
              <li>IP64 Water & Dust Resistance</li>
            </ul>
          </div>

          {/* Color Selection */}
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

          {/* Storage Selection */}
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

          {/* Quantity */}
          <div className="mb-4">
            <h6 className="fw-bold">Quantity:</h6>
            <select
              className="form-select w-auto"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>Qty: {num}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="d-grid gap-2 d-md-flex mb-4">
            <button
              className="btn btn-warning flex-fill py-3"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="btn btn-danger flex-fill py-3" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={handleAddToWishlist}
            >
              <i className={`fas fa-heart ${isInWishlist ? 'text-danger' : ''}`}></i>
            </button>
          </div>

          {/* Delivery Info */}
          <div className="card border-0 bg-light">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="fas fa-map-marker-alt text-success me-2"></i>
                <div>
                  <span className="fw-bold">Deliver to India - 394101</span>
                  <span className="text-amazon-link ms-2 cursor-pointer">Update location</span>
                </div>
              </div>
              <p className="text-success mb-1">
                <i className="fas fa-check-circle me-2"></i>
                FREE delivery <strong>Monday, 15 October</strong>
              </p>
              <p className="text-muted small mb-0">
                Order within 21 hrs 37 mins
              </p>
              <p className="text-success small">
                <i className="fas fa-gift me-2"></i>
                Arrives 7 days before Diwali
              </p>
            </div>
          </div>

          {/* Offers */}
          <div className="mt-4">
            <h6 className="fw-bold">Available offers</h6>
            <div className="small">
              <p><i className="fas fa-tag text-success me-2"></i> <strong>Bank Offer</strong> 10% instant discount on ICICI Bank Credit Cards</p>
              <p><i className="fas fa-tag text-success me-2"></i> <strong>Special Price</strong> Get extra ₹3,000 off (price inclusive of discount)</p>
              <p><i className="fas fa-tag text-success me-2"></i> <strong>No Cost EMI</strong> on select credit cards</p>
              <p><i className="fas fa-tag text-success me-2"></i> <strong>Exchange Offer</strong> Up to ₹9,400.00 off</p>
              <a href="#" className="text-amazon-link">See 11 more offers</a>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card border-0">
            <div className="card-body">
              <h4 className="card-title mb-4">Product description</h4>

              {/* Key Features */}
              <div className="row mb-4">
                <div className="col-md-4 text-center">
                  <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-battery-full fa-2x"></i>
                  </div>
                  <h6>6000mAh Battery</h6>
                  <p className="small text-muted">All-day power for uninterrupted usage</p>
                </div>
                <div className="col-md-4 text-center">
                  <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-microchip fa-2x"></i>
                  </div>
                  <h6>5G Ready</h6>
                  <p className="small text-muted">MediaTek Dimensity 6300 Processor</p>
                </div>
                <div className="col-md-4 text-center">
                  <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '80px', height: '80px' }}>
                    <i className="fas fa-mobile-alt fa-2x"></i>
                  </div>
                  <h6>Ultra-Slim</h6>
                  <p className="small text-muted">7.94mm sleek design</p>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="bg-light p-4 rounded">
                <h5 className="mb-3">About this item</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-check text-success me-2"></i>
                    <strong>Massive 6000mAh Battery:</strong> Power through your day with a long-lasting battery designed for extended performance.
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check text-success me-2"></i>
                    <strong>MediaTek Dimensity 6300 5G:</strong> Enjoy fast and reliable 5G connectivity with a power-efficient processor.
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check text-success me-2"></i>
                    <strong>Ultra-Slim 7.94mm Design:</strong> Sleek and stylish profile that's comfortable to hold and easy to carry.
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check text-success me-2"></i>
                    <strong>Smart AI Assist:</strong> Experience intelligent features that enhance your daily smartphone usage.
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check text-success me-2"></i>
                    <strong>IP64 Water & Dust Resistance:</strong> Built to endure everyday splashes and dust with certified durability.
                  </li>
                  <li>
                    <i className="fas fa-check text-success me-2"></i>
                    <strong>120Hz Refresh Rate:</strong> Get flagship-grade clarity and fluidity with a 120Hz refresh rate and immersive punch-hole display.
                  </li>
                </ul>
              </div>

              {/* Specifications */}
              <div className="mt-4">
                <h5 className="mb-3">Specifications</h5>
                <div className="row">
                  <div className="col-md-6">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td><strong>Brand</strong></td>
                          <td>{product.brand}</td>
                        </tr>
                        <tr>
                          <td><strong>Model</strong></td>
                          <td>NARZO 80 Lite</td>
                        </tr>
                        <tr>
                          <td><strong>Operating System</strong></td>
                          <td>Android 13</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td><strong>RAM</strong></td>
                          <td>6GB</td>
                        </tr>
                        <tr>
                          <td><strong>Storage</strong></td>
                          <td>128GB</td>
                        </tr>
                        <tr>
                          <td><strong>Display</strong></td>
                          <td>6.5" 120Hz</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
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
            <strong>"{product?.title}"</strong> will be permanently removed from the system.
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

export default ProductDetail