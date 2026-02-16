import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../responsive.css"; 

function Welcome() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  const handleLearnMore = () => {
    navigate("/learn-more");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div className="welcome-page">
      
      <header className="navbar">
        <div className="navbar-content">
          <h2 className="logo">🌾 EcoLabs</h2>
        </div>
      </header>

      
      <section className="hero">
        <div className="hero-content">
          <h1>Empowering Local Farmers</h1>
          <p className="hero-subtitle">
            Connect directly with farmers. Fair prices, fresh produce, no middlemen.
          </p>
          <p className="hero-description">
            EcoLabs is a digital marketplace revolutionary direct-to-consumer platform that transforms how communities access fresh, locally-sourced produce while ensuring farmers receive fair compensation.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={handleGetStarted}>
              Get Started Today
            </button>
            <button className="secondary-btn" onClick={handleLearnMore}>
              Explore Features
            </button>
          </div>
        </div>
      </section>

      
      <section className="features">
        <div className="features-header">
          <h2>Why Choose EcoLabs?</h2>
          <p>Three core values that drive our mission</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌾</div>
            <h3>Support Local Farmers</h3>
            <p>Farmers earn 40% more by selling directly to buyers. Eliminate intermediaries and middlemen.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Fresh & Affordable</h3>
            <p>Get locally sourced, farm-fresh produce at prices 30% lower than traditional markets.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Fair & Transparent</h3>
            <p>Complete transparency in pricing, sourcing, and transactions. No hidden fees or surprises.</p>
          </div>
        </div>
      </section>

      
      <section className="stats-section">
        <div className="stat-item">
          <h3 className="stat-number">500+</h3>
          <p className="stat-label">Active Farmers</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">50K+</h3>
          <p className="stat-label">Happy Customers</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number">₱10M+</h3>
          <p className="stat-label">Farmer Income</p>
        </div>
      </section>

      
      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>Join thousands of farmers and consumers transforming the agricultural market.</p>
        <button className="primary-btn large-btn" onClick={handleGetStarted}>
          Start Your Journey
        </button>
      </section>

      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>EcoLabs</h4>
            <p>Connecting farmers to consumers. Fair trade. Fresh produce. Better prices.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><button className="link-btn" onClick={handleGetStarted}>Get Started</button></li>
              <li><button className="link-btn" onClick={handleLearnMore}>Learn More</button></li>
              <li><button className="link-btn" onClick={handleLogin}>Login</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Account</h4>
            <p className="footer-description">Already a member? Log in to your account.</p>
            <button className="login-footer-btn" onClick={handleLogin}>Login to Your Account</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} EcoLabs. All rights reserved. Empowering communities, one harvest at a time.</p>
        </div>
      </footer>
    </div>
  );
}

export default Welcome;
