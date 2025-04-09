import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success or error

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // Simulate API call
    setStatus("loading");
    setMessage("Subscribing...");
    setTimeout(() => {
      // Assume success for now
      setStatus("success");
      setMessage("🎉 You're subscribed to our newsletter!");
      setEmail(""); // clear input
    }, 1500);
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">

        <div className="footer-logo">
          <h2>🌾 Farmer Utility</h2>
          <p>Empowering Farmers with Real-time Insights</p>

          <div className="footer-social" style={{ marginLeft: "25px", marginTop: "12px" }}>
            <h4>Follow Us</h4>
            <div className="social-icons">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedin />
            </div>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/view-crops">View Crops</a></li>
            <li><a href="/profit-sell">Profit Sell</a></li>
            <li><a href="/payments">Payments</a></li>
            <li><a href="/weather">Weather</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📞 +91 9528961698</p>
          <p>📧 support@farmerutility.in</p>
        </div>

        <div className="footer-address">
          <h4>Address</h4>
          <p>📍Greater Noida, 201310</p>
        </div>

        <div className="footer-newsletter">
          <h4>Subscribe to our Newsletter</h4>
          <p>Stay updated with the latest crop prices and farming insights.</p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && (
            <p style={{ color: status === "error" ? "red" : "lightgreen", marginTop: "10px" }}>
              {message}
            </p>
          )}
        </div>

      </div>

      <div className="footer-bottom">
        © 2024 Farmer Utility Corp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
