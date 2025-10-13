import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateCartQuantity, clearCart } from '../../Services/actions/productActions'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)
  const { userInfo } = useSelector(state => state.auth)

  const [showCheckout, setShowCheckout] = useState(false)

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shipping = subtotal > 500 ? 0 : 40
  const total = subtotal + shipping // ✅ remove tax from here


  const navigate = useNavigate()

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId))
  }

  const handleQuantityChange = (productId, quantity) => {
    if (quantity === 0) {
      dispatch(removeFromCart(productId))
    } else {
      dispatch(updateCartQuantity(productId, quantity))
    }
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  const handleProceedToCheckout = () => {
    if (!userInfo) {
      alert('Please login to proceed with checkout')
      return
    }

    // Pass cartItems to Checkout page via state
    navigate('/checkout', { state: { cartItems } })
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mt-4 text-center py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <i className="fas fa-shopping-cart fa-4x text-muted mb-4"></i>
            <h2>Your Amazon Cart is empty</h2>
            <p className="text-muted mb-4">Shop today's deals</p>
            <Link to="/" className="btn btn-warning btn-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Shopping Cart</h2>
            <div>
              <span className="text-muted me-3">
                Price
              </span>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>

          {cartItems.map(item => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid rounded cart-item-image"
                    />
                  </div>

                  <div className="col-md-4">
                    <Link to={`/product/${item.id}`} className="text-decoration-none">
                      <h6 className="card-title text-dark">{item.title}</h6>
                    </Link>
                    <p className="text-success mb-1">In Stock</p>
                    <small className="text-muted">Ships from and sold by Amazon</small>

                    <div className="mt-2">
                      <select
                        className="form-select form-select-sm w-auto d-inline-block me-2"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>Qty: {num}</option>
                        ))}
                      </select>

                      <span className="text-primary cursor-pointer"
                        onClick={() => handleRemoveFromCart(item.id)}
                        style={{ cursor: 'pointer' }}>
                        Delete
                      </span>
                    </div>
                  </div>

                  <div className="col-md-3 text-end">
                    <h5 className="text-success">₹{item.price.toLocaleString()}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items):</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <hr />

              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-success">₹{total.toFixed(2)}</strong>
              </div>

              {subtotal < 500 && (
                <div className="alert alert-info">
                  <small>
                    Add ₹{(500 - subtotal).toFixed(2)} more for <strong>FREE shipping</strong>
                  </small>
                </div>
              )}

              <button
                className="btn btn-warning w-100 btn-lg"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>

              <div className="text-center mt-2">
                <small className="text-muted">
                  or <Link to="/">Continue Shopping</Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart