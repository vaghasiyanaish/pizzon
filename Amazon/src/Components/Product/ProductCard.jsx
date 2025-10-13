import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../../Services/actions/productActions'
import { addToWishlist, removeFromWishlist } from '../../Services/actions/productActions'
import { useSelector } from 'react-redux'

const ProductCard = ({ product, onDelete }) => {
  const dispatch = useDispatch()
  const { wishlistItems } = useSelector(state => state.wishlist)

  const isInWishlist = wishlistItems.some(item => item.id === product.id)

  const handleAddToCart = () => {
    dispatch(addToCart(product, 1))
  }

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product))
    }
  }

  const renderRatingStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`fas fa-star ${i < Math.floor(rating) ? 'text-warning' : 'text-muted'}`}
      ></span>
    ))
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="card h-100 shadow-sm product-card">
      <div className="position-relative">
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <img
            src={product.image}
            alt={product.title}
            className="card-img-top product-image-placeholder"
            style={{ height: '200px', objectFit: 'cover' }}
          />
        </Link>
        {discount > 0 && (
          <span className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 small">
            {discount}% off
          </span>
        )}
        {!product.inStock && (
          <span className="position-absolute top-0 end-0 bg-secondary text-white px-2 py-1 small">
            Out of Stock
          </span>
        )}
        <button
          className="position-absolute top-0 end-0 btn btn-light btn-sm m-1"
          onClick={handleWishlistToggle}
        >
          <i className={`fas fa-heart ${isInWishlist ? 'text-danger' : 'text-muted'}`}></i>
        </button>
      </div>

      <div className="card-body d-flex flex-column">
        <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
          <h6 className="card-title product-title">{product.title}</h6>
        </Link>

        <div className="mb-2">
          <div className="d-flex align-items-center mb-1">
            {renderRatingStars(product.rating.rate)}
            <small className="text-muted ms-1">({product.rating.count})</small>
          </div>
        </div>

        <div className="mt-auto">
          <div className="d-flex align-items-center mb-2">
            <h5 className="text-success mb-0 me-2">₹{product.price.toLocaleString()}</h5>
            {product.originalPrice && (
              <small className="text-muted text-decoration-line-through">
                ₹{product.originalPrice.toLocaleString()}
              </small>
            )}
          </div>

          <div className="d-flex gap-2">
            {product.inStock ? (
              <button className="btn btn-warning btn-sm flex-grow-1" onClick={handleAddToCart}>
                <i className="fas fa-shopping-cart me-2"></i>
                Add to Cart
              </button>
            ) : (
              <button className="btn btn-secondary btn-sm flex-grow-1" disabled>
                Out of Stock
              </button>
            )}

            {onDelete && (
              <div className="dropdown">
                <button className="btn btn-outline-secondary btn-sm dropdown-toggle"
                  type="button" data-bs-toggle="dropdown">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={`/edit-product/${product.id}`}>
                      <i className="fas fa-edit me-2"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={() => onDelete(product.id)}>
                      <i className="fas fa-trash me-2"></i>Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard