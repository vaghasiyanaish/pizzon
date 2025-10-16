import React from 'react';
import { Link } from 'react-router-dom';
import amazonLogo from '../../assets/amazon-logo.webp'
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkSections = [
    {
      title: "Get to Know Us",
      links: [
        { label: "About Amazon", to: "/about" },
        { label: "Careers", to: "/careers" },
        { label: "Press Releases", to: "/press" },
        { label: "Amazon Science", to: "/science" }
      ]
    },
    {
      title: "Connect with Us",
      links: [
        { label: "Facebook", to: "#" },
        { label: "Twitter", to: "#" },
        { label: "Instagram", to: "#" }
      ]
    },
    {
      title: "Make Money with Us",
      links: [
        { label: "Sell on Amazon", to: "/sell" },
        { label: "Sell under Amazon Accelerator", to: "/accelerator" },
        { label: "Protect and Build Your Brand", to: "/protect-brand" },
        { label: "Amazon Global Selling", to: "/global-selling" },
        { label: "Supply to Amazon", to: "/supply" },
        { label: "Become an Affiliate", to: "/affiliate" },
        { label: "Fulfillment by Amazon", to: "/fulfillment" },
        { label: "Advertise Your Products", to: "/advertise" },
        { label: "Amazon Pay on Merchants", to: "/amazon-pay" }
      ]
    },
    {
      title: "Let Us Help You",
      links: [
        { label: "Your Account", to: "/account" },
        { label: "Returns Centre", to: "/returns" },
        { label: "Recalls and Product Safety Alerts", to: "/recalls" },
        { label: "100% Purchase Protection", to: "/protection" },
        { label: "Amazon App Download", to: "/app" },
        { label: "Help", to: "/help" }
      ]
    }
  ];

  const services = [
    { title: "Abelboks", desc: "Books, art & collectibles" },
    { title: "Shopbop", desc: "Designer Fashion Brands" },
    { title: "Amazon Web Services", desc: "Scalable Cloud Computing Services" },
    { title: "Amazon Business", desc: "Everything For Your Business" },
    { title: "Audible", desc: "Download Audio Books" },
    { title: "Prime", desc: "2-hour Delivery on Everyday Items" },
    { title: "IMDb", desc: "Movies, TV & Celebrities" },
    { title: "Amazon Prime Music", desc: "100M songs, ad-free; 15M podcasts" }
  ];

  return (
    <footer className="amazon-footer">
      <div className="back-to-top text-center py-3">
        <button className="btn btn-link text-white text-decoration-none" onClick={scrollToTop}>
          Back to top
        </button>
      </div>

      <div className="footer-main bg-dark pt-5 pb-4">
        <div className="container">
          <div className="row">
            {linkSections.map((section, idx) => (
              <div key={idx} className="col-6 col-md-3 mb-4">
                <h6 className="footer-title fw-bold text-white">{section.title}</h6>
                <ul className="list-unstyled footer-links">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      {link.to.startsWith('/') ? (
                        <Link to={link.to} className="footer-link">{link.label}</Link>
                      ) : (
                        <a href={link.to} className="footer-link">{link.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <hr className="footer-divider my-4" />

          <div className="row align-items-center mb-4 text-center">
            <div className="col-12 d-flex justify-content-center align-items-center mb-3">
              <img
                src={amazonLogo}
                alt="Amazon Logo"
                style={{ height: '40px', width: 'auto' }}
                className="me-2"
              />              <div className="language-selector text-white-50">
                <i className="fas fa-globe me-1"></i> English
                <span className="mx-2">|</span>
                <i className="fas fa-flag me-1"></i> India
              </div>
            </div>
          </div>

          <div className="row mb-4">
            {services.map((service, idx) => (
              <div key={idx} className="col-6 col-md-3 mb-3">
                <div className="service-item">
                  <h6 className="service-title text-white mb-1">{service.title}</h6>
                  <p className="service-desc text-white-50 small mb-0">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

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
