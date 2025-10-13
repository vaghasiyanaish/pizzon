import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../Services/actions/authActions'
import './Profile.css'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    }
  })

  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
      return
    }

    setFormData({
      name: userInfo.name || '',
      email: userInfo.email || '',
      phone: userInfo.phone || '',
      address: userInfo.address || {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      }
    })
  }, [userInfo, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateProfile(formData))
    setMessage('Profile updated successfully!')
    setIsEditing(false)

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000)
  }

  const handleCancel = () => {
    setFormData({
      name: userInfo.name || '',
      email: userInfo.email || '',
      phone: userInfo.phone || '',
      address: userInfo.address || {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      }
    })
    setIsEditing(false)
    setMessage('')
  }

  if (!userInfo) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  <i className="fas fa-user me-2"></i>
                  Your Profile
                </h4>
                {!isEditing && (
                  <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <i className="fas fa-edit me-1"></i>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="card-body">
              {message && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {message}
                  <button type="button" className="btn-close" onClick={() => setMessage('')}></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <div className="mb-4">
                  <h5 className="text-muted border-bottom pb-2">
                    <i className="fas fa-info-circle me-2"></i>
                    Personal Information
                  </h5>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="+91 XXXXXXXXXX"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Account Type</label>
                      <input
                        type="text"
                        className="form-control"
                        value={userInfo.isAdmin ? 'Administrator' : 'Customer'}
                        disabled
                        style={{ backgroundColor: '#f8f9fa' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="mb-4">
                  <h5 className="text-muted border-bottom pb-2">
                    <i className="fas fa-home me-2"></i>
                    Delivery Address
                  </h5>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Street Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="street"
                      value={formData.address.street}
                      onChange={handleAddressChange}
                      disabled={!isEditing}
                      placeholder="House no., Building, Street"
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={formData.address.city}
                        onChange={handleAddressChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={formData.address.state}
                        onChange={handleAddressChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Pincode</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        value={formData.address.pincode}
                        onChange={handleAddressChange}
                        disabled={!isEditing}
                        maxLength="6"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={formData.address.country}
                        onChange={handleAddressChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-warning flex-grow-1">
                      <i className="fas fa-save me-2"></i>
                      Save Changes
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                      <i className="fas fa-times me-2"></i>
                      Cancel
                    </button>
                  </div>
                )}
              </form>

              {/* Account Statistics */}
              {!isEditing && (
                <div className="mt-4 p-3 bg-light rounded">
                  <h6 className="text-muted mb-3">Account Overview</h6>
                  <div className="row text-center">
                    <div className="col-md-4">
                      <div className="border-end">
                        <div className="h5 text-warning mb-1">0</div>
                        <small className="text-muted">Total Orders</small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="border-end">
                        <div className="h5 text-warning mb-1">0</div>
                        <small className="text-muted">Wishlist Items</small>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div>
                        <div className="h5 text-warning mb-1">₹0</div>
                        <small className="text-muted">Total Spent</small>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile