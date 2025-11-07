// Components/Header/Header.jsx
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../Services/actions/authActions'
import { setSearchQuery, getProductsAsync } from '../../Services/actions/productActions'
import { 
  selectUserInfo, 
  selectCartItems, 
  selectWishlistItems, 
  selectFilters 
} from '../../Services/selectors'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import amazonLogo from '../../assets/amazon-logo.webp'
import './Header.css'

import { FaMapMarkerAlt, FaHeart, FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa'
import { MdAccountCircle } from 'react-icons/md'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Use memoized selectors
  const userInfo = useSelector(selectUserInfo)
  const cartItems = useSelector(selectCartItems)
  const wishlistItems = useSelector(selectWishlistItems)
  const filters = useSelector(selectFilters)

  const [searchQuery, setSearchQueryLocal] = useState(filters.searchQuery || '')
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)

  useEffect(() => {
    setSearchQueryLocal(filters.searchQuery || '')
  }, [filters.searchQuery])

  const cartItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0)
  const wishlistItemsCount = wishlistItems.length

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setShowAccountDropdown(false)
  }

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    const query = searchQuery.trim()
    dispatch(setSearchQuery(query))
    dispatch(getProductsAsync())
    navigate('/')
  }

  const handleClearSearch = () => {
    setSearchQueryLocal('')
    dispatch(setSearchQuery(''))
    dispatch(getProductsAsync())
  }

  const toggleAccountDropdown = () => setShowAccountDropdown(!showAccountDropdown)
  const closeAllDropdowns = () => setShowAccountDropdown(false)

  useEffect(() => {
    const handleClickOutside = () => closeAllDropdowns()
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <>
      <nav className="navbar navbar-dark bg-amazon-dark sticky-top" style={{ height: '80px', width: '100%' }}>
        <div className="container-fluid d-flex align-items-center" style={{ maxWidth: '1580px', margin: '0 auto' }}>

          <Link className="navbar-brand me-3 d-flex align-items-center" to="/" onClick={closeAllDropdowns}>
            <img src={amazonLogo} alt="Amazon Logo" style={{ height: '40px', width: 'auto' }} />
          </Link>

          <form className="flex-grow-1 me-3" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                name="q"
                type="search"
                className="form-control"
                placeholder="Search Amazon.in"
                value={searchQuery}
                onChange={(e) => setSearchQueryLocal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                onClick={closeAllDropdowns}
              />

              {searchQuery && (
                <button type="button" className="btn btn-light" onClick={handleClearSearch}>
                  <FaTimes />
                </button>
              )}

              <button className="btn btn-warning" type="submit">
                <FaSearch />
              </button>
            </div>
          </form>

          <div className="d-flex align-items-center">

            <div className="dropdown me-3">
              <button
                type="button"
                className="btn text-white dropdown-toggle d-flex align-items-center"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleAccountDropdown()
                }}
              >
                <MdAccountCircle className="me-1" size={20} />
                <div className="text-start lh-1">
                  <div className="small">{userInfo ? `Hello, ${userInfo.name}` : 'Hello, sign in'}</div>
                  <div className="fw-bold small">Account & Lists</div>
                </div>
              </button>

              <ul
                className={`dropdown-menu dropdown-menu-end ${showAccountDropdown ? 'show' : ''}`}
                style={{ display: showAccountDropdown ? 'block' : 'none' }}
              >
                {userInfo ? (
                  <>
                    <li className="dropdown-item-text small">Welcome, {userInfo.name}</li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item" to="/profile" onClick={() => setShowAccountDropdown(false)}>Your Profile</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/orders" onClick={() => setShowAccountDropdown(false)}>Your Orders</Link>
                    </li>
                    {userInfo.isAdmin && (
                      <li>
                        <Link className="dropdown-item" to="/add-product" onClick={() => setShowAccountDropdown(false)}>Add Product</Link>
                      </li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button type="button" className="dropdown-item" onClick={handleLogout}>Sign Out</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login" onClick={() => setShowAccountDropdown(false)}>Sign in</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register" onClick={() => setShowAccountDropdown(false)}>New customer? Start here</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <Link className="btn text-white position-relative me-3" to="/wishlist" onClick={closeAllDropdowns}>
              <FaHeart className="me-1" />
              <span className="fw-bold small">Wishlist</span>
              {wishlistItemsCount > 0 && (
                <span className="badge bg-warning text-dark rounded-pill position-absolute top-0 start-100 translate-middle">
                  {wishlistItemsCount}
                </span>
              )}
            </Link>

            <Link className="btn text-white position-relative" to="/cart" onClick={closeAllDropdowns}>
              <FaShoppingCart className="me-1" />
              <span className="fw-bold small">Cart</span>
              {cartItemsCount > 0 && (
                <span className="badge bg-warning text-dark rounded-pill position-absolute top-0 start-100 translate-middle">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-dark bg-amazon-secondary" style={{ height: '52px', width: '100%' }}>
        <div className="container-fluid d-flex align-items-center justify-content-start" style={{ maxWidth: '1580px', margin: '0 auto' }}>
          <Link className="nav-link text-white small me-3" to="/" onClick={closeAllDropdowns}>Home</Link>
          <Link className="nav-link text-white small me-3" to="/add-product" onClick={closeAllDropdowns}>Add Products</Link>
          <Link className="nav-link text-white small me-3" to="/categories" onClick={closeAllDropdowns}>Categories</Link>
          <Link className="nav-link text-white small me-3" to="/products" onClick={closeAllDropdowns}>Products</Link>
          <Link className="nav-link text-white small me-3" to="/orders" onClick={closeAllDropdowns}>Orders</Link>
          <Link className="nav-link text-white small me-3" to="/wishlist" onClick={closeAllDropdowns}>Wishlist</Link>
          {userInfo?.isAdmin && (
            <Link className="nav-link text-white small me-3" to="/add-product" onClick={closeAllDropdowns}>Add Product</Link>
          )}
        </div>
      </nav>
    </>
  )
}

export default Header