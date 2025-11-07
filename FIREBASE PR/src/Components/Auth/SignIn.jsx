import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { login } from '../../Services/actions/authActions'
import amazonLogo from '../../assets/amazon-logo.webp'
import './Auth.css'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const { userInfo, loading, error } = useSelector(state => state.auth)

  useEffect(() => {
    if (userInfo) {
      const redirectPath = location.state?.from || '/'
      navigate(redirectPath)
    }
  }, [userInfo, navigate, location])

  const handleInputChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(login(credentials.email, credentials.password))
  }

  return (
    <div className="signin-container">
      <div className="signin-logo text-center mb-3">
        <Link to="/">
          <img src={amazonLogo} alt="Amazon" style={{ width: '120px', height: 'auto' }} />
        </Link>
      </div>

      <div className="signin-box">
        <h2 className="signin-title">Sign in</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit}>
          <label className="fw-bold mb-1">Email or mobile phone number</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            required
            className="form-control mb-3"
            disabled={loading}
          />

          <label className="fw-bold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
            className="form-control mb-2"
            disabled={loading}
          />
          <Link to="#" className="small text-amazon-link d-block mb-3">Forgot Password?</Link>

          <button type="submit" className="amazon-btn w-100" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                Signing in...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>

        <p className="text-muted small mt-3">
          By continuing, you agree to Amazon's
          <Link to="#" className="text-amazon-link"> Conditions of Use </Link>
          and
          <Link to="#" className="text-amazon-link"> Privacy Notice</Link>.
        </p>

        <hr />
        <Link to="#" className="small text-amazon-link">Need help?</Link>
      </div>

      <div className="new-account text-center mt-4">
        <span className="small text-muted">New to Amazon?</span>
        <Link to="/register" className="btn btn-outline amazon-outline-btn mt-2">
          Create your Amazon account
        </Link>
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

export default SignIn
