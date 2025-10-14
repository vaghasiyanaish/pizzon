import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createProduct, updateProduct, getProductDetails } from '../../Services/actions/productActions'
import { Alert, Form, Button } from 'react-bootstrap'

const ProductForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const { product, loading, error } = useSelector(state => state.productDetails)
  const { userInfo } = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    originalPrice: '',
    description: '',
    category: 'electronics',
    brand: '',
    inStock: true,
    features: [''],
    specifications: {
      "Material": '',
      "Color": '',
      "Weight": '',
      "Dimensions": ''
    },
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  })

  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: '' })
  const [imagePreview, setImagePreview] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [fileInputKey, setFileInputKey] = useState(Date.now())
  const [imageError, setImageError] = useState(false)

  const isEdit = Boolean(id)

  useEffect(() => {
    if (isEdit) {
      dispatch(getProductDetails(id))
    }
  }, [dispatch, id, isEdit])

  useEffect(() => {
    if (isEdit && product) {
      setFormData({
        title: product.title || '',
        price: product.price || '',
        originalPrice: product.originalPrice || '',
        description: product.description || '',
        category: product.category || 'electronics',
        brand: product.brand || '',
        inStock: product.inStock !== undefined ? product.inStock : true,
        features: product.features?.length > 0 ? product.features : [''],
        specifications: product.specifications || {
          Material: '',
          Color: '',
          Weight: '',
          Dimensions: ''
        },
        image: product.image || '',
        rating: product.rating || { rate: 0, count: 0 }
      })
      setImagePreview(product.image || '')
      setSelectedFile(null)
      setImageError(false)
    }
  }, [product, isEdit])

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
  }, [userInfo, navigate])

  const showSuccessAlert = (message, type = 'success') => {
    setShowAlert({ show: true, message, type })
    setTimeout(() => setShowAlert({ show: false, message: '', type: '' }), 3000)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleRatingChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      rating: {
        ...prev.rating,
        [field]: field === 'rate' ? parseFloat(value) : parseInt(value)
      }
    }))
  }

  const handleSpecChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }))
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }))
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  // File upload handler
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        showSuccessAlert('Please select an image file!', 'danger')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        showSuccessAlert('File size should be less than 5MB!', 'danger')
        return
      }

      setSelectedFile(file)
      setImageError(false)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setFormData(prev => ({
          ...prev,
          image: e.target.result // Store base64 string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Image URL input handler
  const handleImageUrlInput = (e) => {
    const url = e.target.value.trim()
    
    setFormData(prev => ({
      ...prev,
      image: url
    }))
    
    if (url) {
      setImagePreview(url)
      setImageError(false)
    } else {
      setImagePreview('')
      setImageError(false)
    }
    
    setSelectedFile(null)
    setFileInputKey(Date.now())
  }

  const clearFileSelection = () => {
    setSelectedFile(null)
    setFileInputKey(Date.now())
    
    if (isEdit && product?.image) {
      setImagePreview(product.image)
      setFormData(prev => ({
        ...prev,
        image: product.image
      }))
    } else {
      setImagePreview('')
      setFormData(prev => ({
        ...prev,
        image: ''
      }))
    }
    setImageError(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImagePreview('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.title || !formData.price || !formData.category || !formData.description || !formData.brand || !formData.image) {
      showSuccessAlert('Please fill all required fields!', 'danger')
      return
    }

    const productData = {
      title: formData.title,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      description: formData.description,
      category: formData.category,
      brand: formData.brand,
      image: formData.image,
      inStock: formData.inStock,
      features: formData.features.filter(f => f.trim() !== ''),
      specifications: formData.specifications,
      rating: formData.rating
    }

    console.log('Submitting product:', productData)

    if (isEdit) {
      dispatch(updateProduct(id, productData))
      showSuccessAlert('Product updated successfully!')
    } else {
      dispatch(createProduct(productData))
      showSuccessAlert('Product created successfully!')
    }

    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home', label: 'Home & Kitchen' },
    { value: 'appliances', label: 'Appliances' },
    { value: 'books', label: 'Books' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'sports', label: 'Sports' },
    { value: 'toys', label: 'Toys' }
  ]

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    return (
      <div className="d-flex align-items-center">
        <div className="text-warning me-2">
          {[...Array(5)].map((_, index) => (
            <span key={index}>
              {index < fullStars ? (
                <i className="fas fa-star"></i>
              ) : index === fullStars && hasHalfStar ? (
                <i className="fas fa-star-half-alt"></i>
              ) : (
                <i className="far fa-star"></i>
              )}
            </span>
          ))}
        </div>
        <small className="text-muted">({rating})</small>
      </div>
    )
  }

  const fillTestData = () => {
    const testData = {
      title: "Adidas T-Shirts Pack of 3",
      price: "1299",
      originalPrice: "1999",
      description: "Premium pack of 3 high-quality Adidas cotton t-shirts. Made from 100% premium cotton for ultimate comfort and breathability. Features the classic Adidas logo design with modern fit.",
      category: "fashion",
      brand: "Adidas",
      inStock: true,
      features: [
        "Pack of 3 t-shirts",
        "100% Premium Cotton",
        "Classic Adidas logo design",
        "Moisture-wicking technology",
        "Modern athletic fit"
      ],
      specifications: {
        Material: "100% Cotton",
        Color: "Black/White/Grey",
        Weight: "450 grams",
        Dimensions: "Regular Fit"
      },
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      rating: {
        rate: 4.5,
        count: 128
      }
    }
    
    setFormData(testData)
    setImagePreview(testData.image)
    setSelectedFile(null)
    setFileInputKey(Date.now())
    setImageError(false)
  }

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading product details...</p>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      {showAlert.show && (
        <Alert variant={showAlert.type} className="alert-fixed">
          <div className="d-flex justify-content-between align-items-center">
            <span>{showAlert.message}</span>
            <button
              className="btn-close"
              onClick={() => setShowAlert({ show: false, message: '', type: '' })}
            ></button>
          </div>
        </Alert>
      )}

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header bg-amazon-secondary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">
                <i className="fas fa-box me-2"></i>
                {isEdit ? 'Edit Product' : 'Add New Product'}
              </h4>
              {!isEdit && (
                <button
                  type="button"
                  className="btn btn-info btn-sm"
                  onClick={fillTestData}
                >
                  <i className="fas fa-magic me-1"></i>
                  Fill Test Data
                </button>
              )}
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Product Title *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter product title"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Brand *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      placeholder="Enter brand name"
                      required
                    />
                  </div>
                </div>

                {/* Pricing */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Current Price (₹) *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter current price"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Original Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      placeholder="Enter original price"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Category & Stock */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Category *</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Stock Status</label>
                    <select
                      className="form-select"
                      name="inStock"
                      value={formData.inStock}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        inStock: e.target.value === 'true'
                      }))}
                    >
                      <option value={true}>In Stock</option>
                      <option value={false}>Out of Stock</option>
                    </select>
                  </div>
                </div>

                {/* Rating Input */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Rating</label>
                    <div className="row">
                      <div className="col-6">
                        <label className="form-label small">Rate (0-5)</label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          max="5"
                          step="0.1"
                          value={formData.rating.rate}
                          onChange={(e) => handleRatingChange('rate', e.target.value)}
                          placeholder="0.0 - 5.0"
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label small">Review Count</label>
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          value={formData.rating.count}
                          onChange={(e) => handleRatingChange('count', e.target.value)}
                          placeholder="Number of reviews"
                        />
                      </div>
                    </div>
                    {formData.rating.rate > 0 && (
                      <div className="mt-2">
                        <small className="text-muted">Preview: </small>
                        <StarRating rating={formData.rating.rate} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Upload & URL Input */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Product Image *</label>
                  
                  {/* File Upload */}
                  <div className="mb-3">
                    <label className="form-label">Upload Image</label>
                    <div className="input-group">
                      <input
                        key={fileInputKey}
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {selectedFile && (
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={clearFileSelection}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                    <div className="form-text">
                      Supported formats: JPG, PNG, WebP. Max size: 5MB
                      {selectedFile && (
                        <span className="text-success ms-2">
                          <i className="fas fa-check me-1"></i>
                          File selected: {selectedFile.name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-center my-2">
                    <span className="text-muted">OR</span>
                  </div>

                  {/* Image URL Input */}
                  <div className="mb-3">
                    <label className="form-label">Enter Image URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={formData.image}
                      onChange={handleImageUrlInput}
                      placeholder="Enter image URL (e.g., https://images.unsplash.com/photo-1505740420928-5e560c06d30e)"
                      disabled={!!selectedFile}
                    />
                    {imageError && (
                      <div className="text-danger small mt-1">
                        <i className="fas fa-exclamation-triangle me-1"></i>
                        Could not load image preview
                      </div>
                    )}
                  </div>

                  {/* Image Preview */}
                  <div className="mt-3">
                    <p className="text-muted small mb-2">
                      {selectedFile ? 'Uploaded Image Preview:' : 
                       formData.image ? 'URL Image Preview:' : 
                       'No Image Selected'}
                    </p>
                    {imagePreview ? (
                      <div>
                        <img
                          src={imagePreview}
                          alt="Product Preview"
                          className="img-thumbnail"
                          style={{
                            maxHeight: '200px',
                            maxWidth: '200px',
                            objectFit: 'cover'
                          }}
                          onError={handleImageError}
                        />
                        <div className="text-info small mt-1">
                          <i className="fas fa-info-circle me-1"></i>
                          {selectedFile ? 'Using uploaded file' : 'Using provided URL'}
                        </div>
                      </div>
                    ) : (
                      <div className="text-muted p-3 border rounded text-center">
                        <i className="fas fa-image fa-2x mb-2 d-block"></i>
                        No image preview available
                        <div className="small mt-1">Please upload a file or enter a URL</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Description *</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter detailed product description"
                    required
                  />
                </div>

                {/* Features */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Key Features</label>
                  {formData.features.map((feature, index) => (
                    <div key={index} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                      />
                      {formData.features.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeFeature(index)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={addFeature}
                  >
                    <i className="fas fa-plus me-1"></i>Add Feature
                  </button>
                </div>

                {/* Specifications */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Specifications</label>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <label className="form-label small">Material</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Plastic, Metal, Cotton"
                        value={formData.specifications.Material}
                        onChange={(e) => handleSpecChange('Material', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <label className="form-label small">Color</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., Black, White, Red"
                        value={formData.specifications.Color}
                        onChange={(e) => handleSpecChange('Color', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <label className="form-label small">Weight</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., 500g, 1kg"
                        value={formData.specifications.Weight}
                        onChange={(e) => handleSpecChange('Weight', e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      <label className="form-label small">Dimensions</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., 10x5x2 inches"
                        value={formData.specifications.Dimensions}
                        onChange={(e) => handleSpecChange('Dimensions', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-warning flex-grow-1 btn-hover"
                    disabled={loading || uploadLoading}
                  >
                    <i className="fas fa-save me-2"></i>
                    {isEdit ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/')}
                  >
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductForm



















