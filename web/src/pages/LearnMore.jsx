import React from "react";
import { useNavigate } from "react-router-dom";
import "./LearnMore.css";

function LearnMore() {
  const navigate = useNavigate();

  return (
    <div className="learn-more-page">
      {/* Navigation Header */}
      <header className="learn-more-header">
        <h1 className="logo">EcoLabs</h1>
        <div className="header-buttons">
          <button className="nav-btn-outline" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="nav-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="learn-more-hero">
        <h1>Our Mission & Vision</h1>
        <p className="hero-subtitle">
          Transforming agriculture through direct farmer-to-consumer connections
        </p>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              EcoLabs is committed to empowering local farmers by creating a digital marketplace
              that connects them directly to consumers. We eliminate middlemen, ensure fair prices,
              and promote sustainable agriculture while providing fresh, locally-sourced produce
              to communities.
            </p>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="goals-section">
        <h2>Our Goals</h2>
        <div className="goals-grid">
          <div className="goal-card">
            <div className="goal-icon">🌾</div>
            <h3>Empower Farmers</h3>
            <p>
              Provide farmers with tools and platform to reach customers directly, increasing
              their income and reducing dependence on intermediaries.
            </p>
          </div>

          <div className="goal-card">
            <div className="goal-icon">💰</div>
            <h3>Fair Pricing</h3>
            <p>
              Eliminate middlemen markups by connecting buyers and sellers directly, ensuring
              both parties benefit from fair and transparent pricing.
            </p>
          </div>

          <div className="goal-card">
            <div className="goal-icon">📦</div>
            <h3>Fresh Produce</h3>
            <p>
              Deliver fresh, locally-sourced, and affordable agricultural products directly to
              consumers' doors while reducing food miles and carbon footprint.
            </p>
          </div>

          <div className="goal-card">
            <div className="goal-icon">🤝</div>
            <h3>Community Building</h3>
            <p>
              Foster stronger connections between farmers and consumers, building trust and
              supporting local economies.
            </p>
          </div>

          <div className="goal-card">
            <div className="goal-icon">🌱</div>
            <h3>Sustainability</h3>
            <p>
              Promote sustainable farming practices and environmentally responsible commerce
              that benefits both people and the planet.
            </p>
          </div>

          <div className="goal-card">
            <div className="goal-icon">💻</div>
            <h3>Digital Innovation</h3>
            <p>
              Leverage technology to make agricultural commerce accessible, efficient, and
              user-friendly for all participants.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-container">
          <div className="value-item">
            <h3>Transparency</h3>
            <p>We believe in honest and open communication between farmers and consumers.</p>
          </div>
          <div className="value-item">
            <h3>Fairness</h3>
            <p>Everyone involved in our platform deserves fair treatment and equitable opportunities.</p>
          </div>
          <div className="value-item">
            <h3>Quality</h3>
            <p>We're committed to providing the highest quality fresh produce and services.</p>
          </div>
          <div className="value-item">
            <h3>Community</h3>
            <p>We support local communities and believe in the power of collective growth.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <h2>Our Impact</h2>
        <div className="impact-grid">
          <div className="impact-item">
            <h4>For Farmers</h4>
            <ul>
              <li>Direct market access without intermediaries</li>
              <li>Better profit margins on produce</li>
              <li>Digital tools to manage sales</li>
              <li>Reduced post-harvest losses</li>
            </ul>
          </div>
          <div className="impact-item">
            <h4>For Consumers</h4>
            <ul>
              <li>Fresh, locally-sourced produce</li>
              <li>Better prices than retail markets</li>
              <li>Direct connection to farmers</li>
              <li>Support for local agriculture</li>
            </ul>
          </div>
          <div className="impact-item">
            <h4>For Communities</h4>
            <ul>
              <li>Stronger local economies</li>
              <li>Food security and availability</li>
              <li>Reduced food miles</li>
              <li>Sustainable agriculture growth</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Make a Difference?</h2>
        <p>Join EcoLabs and be part of the agricultural revolution.</p>
        <div className="cta-buttons">
          <button className="cta-btn-primary" onClick={() => navigate("/dashboard")}>
            Explore Marketplace
          </button>
          <button className="cta-btn-secondary" onClick={() => navigate("/login")}>
            Join Us Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} EcoLabs. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LearnMore;
