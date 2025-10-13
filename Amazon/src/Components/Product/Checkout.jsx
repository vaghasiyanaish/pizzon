import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { product, quantity, cartItems } = location.state || {}

  // For single product (Buy Now)
  const items = cartItems || (product ? [{ ...product, quantity }] : [])

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>No product selected!</h2>
        <Button variant="warning" onClick={() => navigate('/')}>Go Back</Button>
      </div>
    )
  }

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 40;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>

      {items.map((item, index) => (
        <div key={index} className="card p-4 mb-3">
          <div className="d-flex flex-wrap align-items-center">
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '150px', height: '150px', objectFit: 'cover', marginRight: '20px' }}
            />
            <div>
              <h5>{item.title}</h5>
              {item.selectedColor && <p>Color: {item.selectedColor}</p>}
              {item.selectedStorage && <p>Storage: {item.selectedStorage} GB</p>}
              <p>Quantity: {item.quantity}</p>
              <h6>Price: ₹{(item.price * item.quantity).toLocaleString()}</h6>
            </div>
          </div>
        </div>
      ))}

      <div className="card p-4 mb-4">
        <h5>Order Summary</h5>
        <div className="d-flex justify-content-between">
          <span>Subtotal:</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Shipping:</span>
          <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Tax:</span>
          <span>₹{tax.toFixed(2)}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <strong>Total:</strong>
          <strong>₹{total.toFixed(2)}</strong>
        </div>
      </div>

      <Button variant="success" size="lg" className="me-2">Proceed to Payment</Button>
      <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>Back</Button>
    </div>
  )
}

export default Checkout
