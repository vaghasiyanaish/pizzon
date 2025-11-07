import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const mockOrders = [
      {
        id: 'ORD-001',
        date: '2024-01-15',
        status: 'delivered',
        total: 13999,
        items: [
          {
            id: 1,
            title: 'Wireless Bluetooth Headphones',
            price: 13999,
            quantity: 1,
            image:
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
          },
        ],
        deliveryDate: '2024-01-20',
        address: {
          street: '123 Main Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
        },
      },
      {
        id: 'ORD-002',
        date: '2024-01-10',
        status: 'shipped',
        total: 8999,
        items: [
          {
            id: 2,
            title: 'Smart Watch Fitness Tracker',
            price: 8999,
            quantity: 1,
            image:
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop',
          },
        ],
        deliveryDate: '2024-01-25',
        address: {
          street: '123 Main Street',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
        },
      },
    ];

    setOrders(mockOrders);
  }, [userInfo, navigate]);

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { class: 'bg-warning', text: 'Pending' },
      shipped: { class: 'bg-info', text: 'Shipped' },
      delivered: { class: 'bg-success', text: 'Delivered' },
      cancelled: { class: 'bg-danger', text: 'Cancelled' },
    };

    const config = statusMap[status] || statusMap.pending;
    return <span className={`badge ${config.class} text-dark`}>{config.text}</span>;
  };

  const filteredOrders =
    filter === 'all' ? orders : orders.filter((order) => order.status === filter);

  if (!userInfo) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark">
              <h4 className="mb-0">
                <i className="fas fa-shopping-bag me-2"></i>
                Your Orders
              </h4>
            </div>

            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h5 className="text-muted">
                    {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
                  </h5>
                </div>
                <div className="col-md-6 text-end">
                  <div className="btn-group">
                    {['all', 'pending', 'shipped', 'delivered'].map((status) => (
                      <button
                        key={status}
                        className={`btn btn-sm ${
                          filter === status ? 'btn-warning' : 'btn-outline-warning'
                        }`}
                        onClick={() => setFilter(status)}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)} Orders
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-shopping-bag fa-3x text-muted mb-3"></i>
                  <h4 className="text-muted">No orders found</h4>
                  <p className="text-muted">
                    {filter === 'all'
                      ? "You haven't placed any orders yet."
                      : `No ${filter} orders found.`}
                  </p>
                  {filter === 'all' && (
                    <Link to="/" className="btn btn-warning mt-2">
                      <i className="fas fa-shopping-cart me-2"></i>
                      Start Shopping
                    </Link>
                  )}
                </div>
              ) : (
                <div className="orders-list">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="card order-card mb-3">
                      <div className="card-header bg-light">
                        <div className="row align-items-center">
                          <div className="col-md-4">
                            <small className="text-muted">ORDER PLACED</small>
                            <div className="fw-bold">{new Date(order.date).toLocaleDateString()}</div>
                          </div>
                          <div className="col-md-4">
                            <small className="text-muted">TOTAL</small>
                            <div className="fw-bold">₹{order.total.toLocaleString()}</div>
                          </div>
                          <div className="col-md-4 text-end">
                            <small className="text-muted">ORDER #{order.id}</small>
                            <div>{getStatusBadge(order.status)}</div>
                          </div>
                        </div>
                      </div>

                      <div className="card-body">
                        {order.items.map((item) => (
                          <div key={`${order.id}-${item.id}`} className="row align-items-center mb-3">
                            <div className="col-md-2">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="img-fluid rounded"
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                              />
                            </div>
                            <div className="col-md-6">
                              <h6 className="mb-1">
                                <Link to={`/product/${item.id}`} className="text-decoration-none">
                                  {item.title}
                                </Link>
                              </h6>
                              <small className="text-muted">Quantity: {item.quantity}</small>
                              <div className="mt-1">
                                <small className="text-success fw-bold">
                                  ₹{(item.price * item.quantity).toLocaleString()}
                                </small>
                              </div>
                            </div>
                            <div className="col-md-4 text-end">
                              <div className="btn-group">
                                <button className="btn btn-outline-warning btn-sm">
                                  <i className="fas fa-box me-1"></i>
                                  Track Package
                                </button>
                                <button className="btn btn-outline-secondary btn-sm">
                                  <i className="fas fa-undo me-1"></i>
                                  Return
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="row mt-3 pt-3 border-top">
                          <div className="col-md-6">
                            <small className="text-muted">Delivery Address</small>
                            <div className="small">
                              {order.address.street}, {order.address.city},<br />
                              {order.address.state} - {order.address.pincode}
                            </div>
                          </div>
                          <div className="col-md-6 text-end">
                            <small className="text-muted">
                              {order.status === 'delivered' ? 'Delivered on' : 'Expected delivery'}
                            </small>
                            <div className="small fw-bold">
                              {new Date(order.deliveryDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
