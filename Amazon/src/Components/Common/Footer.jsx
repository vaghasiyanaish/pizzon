import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="amazon-footer">
      {/* Back to Top Button */}
      <div className="back-to-top text-center py-3">
        <button 
          className="btn btn-link text-white text-decoration-none"
          onClick={scrollToTop}
        >
          Back to top
        </button>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main bg-dark pt-5 pb-4">
        <div className="container">
          {/* Links Sections */}
          <div className="row">
            {/* Get to Know Us */}
            <div className="col-6 col-md-3 mb-4">
              <h6 className="footer-title fw-bold text-white">Get to Know Us</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="/about" className="footer-link">About Amazon</Link></li>
                <li><Link to="/careers" className="footer-link">Careers</Link></li>
                <li><Link to="/press" className="footer-link">Press Releases</Link></li>
                <li><Link to="/science" className="footer-link">Amazon Science</Link></li>
              </ul>
            </div>

            {/* Connect with Us */}
            <div className="col-6 col-md-3 mb-4">
              <h6 className="footer-title fw-bold text-white">Connect with Us</h6>
              <ul className="list-unstyled footer-links">
                <li><a href="#" className="footer-link">Facebook</a></li>
                <li><a href="#" className="footer-link">Twitter</a></li>
                <li><a href="#" className="footer-link">Instagram</a></li>
              </ul>
            </div>

            {/* Make Money with Us */}
            <div className="col-6 col-md-3 mb-4">
              <h6 className="footer-title fw-bold text-white">Make Money with Us</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="/sell" className="footer-link">Sell on Amazon</Link></li>
                <li><Link to="/accelerator" className="footer-link">Sell under Amazon Accelerator</Link></li>
                <li><Link to="/protect-brand" className="footer-link">Protect and Build Your Brand</Link></li>
                <li><Link to="/global-selling" className="footer-link">Amazon Global Selling</Link></li>
                <li><Link to="/supply" className="footer-link">Supply to Amazon</Link></li>
                <li><Link to="/affiliate" className="footer-link">Become an Affiliate</Link></li>
                <li><Link to="/fulfillment" className="footer-link">Fulfillment by Amazon</Link></li>
                <li><Link to="/advertise" className="footer-link">Advertise Your Products</Link></li>
                <li><Link to="/amazon-pay" className="footer-link">Amazon Pay on Merchants</Link></li>
              </ul>
            </div>

            {/* Let Us Help You */}
            <div className="col-6 col-md-3 mb-4">
              <h6 className="footer-title fw-bold text-white">Let Us Help You</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="/account" className="footer-link">Your Account</Link></li>
                <li><Link to="/returns" className="footer-link">Returns Centre</Link></li>
                <li><Link to="/recalls" className="footer-link">Recalls and Product Safety Alerts</Link></li>
                <li><Link to="/protection" className="footer-link">100% Purchase Protection</Link></li>
                <li><Link to="/app" className="footer-link">Amazon App Download</Link></li>
                <li><Link to="/help" className="footer-link">Help</Link></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="footer-divider my-4" />

          {/* Amazon Logo and Language Selector */}
          <div className="row align-items-center mb-4">
            <div className="col-md-12 text-center mb-3">
              <div className="d-flex align-items-center justify-content-center">
                <span className="amazon-logo-text text-white me-3">Amazon</span>
                <div className="language-selector">
                  <span className="text-white-50 me-2">
                    <i className="fas fa-globe me-1"></i>
                    English
                  </span>
                  <span className="text-white-50 mx-2">|</span>
                  <span className="text-white-50">
                    <i className="fas fa-flag me-1"></i>
                    India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Amazon Services */}
          <div className="row mb-4">
            <div className="col-6 col-md-3 mb-3">
              <div className="service-item">
                <h6 className="service-title text-white mb-1">Abelboks</h6>
                <p className="service-desc text-white-50 small mb-0">Books, art & collectibles</p>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="service-item">
                <h6 className="service-title text-white mb-1">Shopbop</h6>
                <p className="service-desc text-white-50 small mb-0">Designer Fashion Brands</p>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="service-item">
                <h6 className="service-title text-white mb-1">Amazon Web Services</h6>
                <p className="service-desc text-white-50 small mb-0">Scalable Cloud Computing Services</p>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="service-item">
                <h6 className="service-title text-white mb-1">Amazon Business</h6>
                <p className="service-desc text-white-50 small mb-0">Everything For Your Business</p>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="service-item">
                <h6 className="service-title text-white mb-1">Audible</h6>
                <p className="service-desc text-white-50 small mb-0">Download Audio Books</p>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="service-item">
                <h6 className="service-title text-white mb-1">Prime</h6>
                <p className="service-desc text-white-50 small mb-0">2-hour Delivery on Everyday Items</p>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="service-item">
                <h6 className="service-title text-white mb-1">IMDb</h6>
                <p className="service-desc text-white-50 small mb-0">Movies, TV & Celebrities</p>
              </div>
            </div>
            <div className="col-6 col-md-3 mb-3">
              <div className="service-item">
                <h6 className="service-title text-white mb-1">Amazon Prime Music</h6>
                <p className="service-desc text-white-50 small mb-0">
                  100 million songs, ad-free<br />
                  Over 15 million podcast episodes
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Links and Copyright */}
          <div className="footer-bottom text-center pt-3">
            <div className="legal-links mb-2">
              <a href="#" className="text-white-50 small me-3">Conditions of Use & Sale</a>
              <a href="#" className="text-white-50 small me-3">Privacy Notice</a>
              <a href="#" className="text-white-50 small">Interest-Based Ads</a>
            </div>
            <div className="copyright">
              <small className="text-white-50">
                © 1996-2025, Amazon.com, Inc. or its affiliates
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;