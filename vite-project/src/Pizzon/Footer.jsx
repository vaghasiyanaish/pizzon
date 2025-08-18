import { FaFacebookF } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

function Footer(){
    return(
        <footer className="footer">
      <div className="footer-main">
        <div className="footer-col">
          <h4>INFORMATION</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>TOP ITEMS</h4>
          <ul>
            <li><a href="#">Pepperoni</a></li>
            <li><a href="#">Swiss Mushroom</a></li>
            <li><a href="#">Barbeque Chicken</a></li>
            <li><a href="#">Vegetarian</a></li>
            <li><a href="#">Ham & Cheese</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>OTHERS</h4>
          <ul>
            <li><a href="#">Checkout</a></li>
            <li><a href="#">Cart</a></li>
            <li><a href="#">Product</a></li>
            <li><a href="#">Locations</a></li>
            <li><a href="#">Legal</a></li>
          </ul>
        </div>
        <div className="footer-col social">
          <h4>SOCIAL MEDIA</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaPinterestP /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
          </div>
          <p>Signup and get exclusive offers<br />and coupon codes</p>
          <button className="signup-btn">SIGN UP</button>
          <div className="app-links">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
            <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Privacy Policy</span>
        <span>|</span>
        <span>Refund Policy</span>
        <span>|</span>
        <span>Cookie Policy</span>
        <span>|</span>
        <span>Terms & Conditions</span>
      </div>
    </footer>
    );
}

export default Footer;