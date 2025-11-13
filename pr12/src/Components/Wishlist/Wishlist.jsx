import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlistAsync, addToCartAsync } from '../../Services/actions/productActions';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector(state => state.wishlist);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlistAsync(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCartAsync(product, 1));
    alert('Product added to cart!');
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mt-4 text-center py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <i className="fas fa-heart fa-4x text-muted mb-4"></i>
            <h2>Your Wishlist is empty</h2>
            <p className="text-muted mb-4">Save items you love for later</p>
            <Link to="/" className="btn btn-warning btn-lg">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2>Your Wishlist</h2>
          <span className="text-muted">{wishlistItems.length} item{wishlistItems.length > 1 ? 's' : ''}</span>
        </div>
      </div>

      <div className="row">
        {wishlistItems.map(item => (
          <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div className="card h-100">

              <div className="position-relative">
                <Link to={`/product/${item.id}`}>
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                </Link>
                <button
                  className="position-absolute top-0 end-0 btn btn-light btn-sm m-1"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  <i className="fas fa-times text-danger"></i>
                </button>
              </div>

              <div className="card-body d-flex flex-column">
                <Link to={`/product/${item.id}`} className="text-decoration-none text-dark">
                  <h6 className="card-title">{item.title}</h6>
                </Link>

                <div className="mt-auto">
                  <div className="d-flex align-items-center mb-2">
                    <h5 className="text-success mb-0 me-2">₹{item.price.toLocaleString()}</h5>
                    {item.originalPrice && (
                      <small className="text-muted text-decoration-line-through">
                        ₹{item.originalPrice.toLocaleString()}
                      </small>
                    )}
                  </div>

                  <button
                    className="btn btn-warning btn-sm w-100"
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                  >
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
