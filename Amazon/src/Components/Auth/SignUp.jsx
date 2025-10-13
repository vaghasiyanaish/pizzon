import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../Services/actions/authActions'
import amazonLogo from '../../assets/amazon-logo.webp'
import './Auth.css'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    // Dispatch register action
    dispatch(register(formData.name, formData.email, formData.password))

    // Redirect to home page after registration
    navigate('/')
  }


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="signin-container">
      <div className="signin-logo text-center mb-3">
        <Link to="/">
          <img src={amazonLogo} alt="Amazon" style={{ width: '120px', height: 'auto' }} />
        </Link>
      </div>

      <div className="signin-box">
        <h2 className="signin-title">Create account</h2>

        <form onSubmit={handleSubmit}>
          <label className="fw-bold mb-1">Your name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control mb-3"
          />

          <label className="fw-bold mb-1">Email or mobile phone number</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-control mb-3"
          />

          <label className="fw-bold mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-control mb-2"
          />
          <small className="text-muted small d-block mb-3">Passwords must be at least 6 characters.</small>

          <label className="fw-bold mb-1">Re-enter password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="form-control mb-4"
          />

          <button type="submit" className="amazon-btn w-100">
            Create your Amazon account
          </button>
        </form>

        <p className="text-muted small mt-3">
          By creating an account, you agree to Amazon's
          <Link to="#" className="text-amazon-link"> Conditions of Use </Link>
          and
          <Link to="#" className="text-amazon-link"> Privacy Notice</Link>.
        </p>

        <hr />
        <p className="text-center small">
          Already have an account? <Link to="/login" className="text-amazon-link">Sign in</Link>
        </p>
      </div>

      <footer className="signin-footer">
        <div className="footer-links">
          <Link to="#">Conditions of Use</Link>
          <Link to="#">Privacy Notice</Link>
          <Link to="#">Help</Link>
        </div>
        <p>© 1996-2025, Amazon.com, Inc. or its affiliates</p>
      </footer>
    </div>
  )
}

export default SignUp
