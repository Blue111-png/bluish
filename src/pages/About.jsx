import React from 'react';
import './About.css'; // Optional: style it separately

export default function About() {
  return (
    <section className="about">
      <div className="about-container">
        <h1>About Us</h1>
        <p className="intro">
          Welcome to <strong>Bluish</strong> — your trusted source for premium military-grade gear, tactical apparel, and survival essentials.
        </p>

        <div className="about-section">
          <h2>🎯 Our Mission</h2>
          <p>
            We empower adventurers, professionals, and patriots with reliable, field-tested equipment. Whether you're on duty, off-grid, or on the move, we’ve got your six.
          </p>
        </div>

        <div className="about-section">
          <h2>🛡️ What We Offer</h2>
          <ul>
            <li>Authentic military surplus and tactical gear</li>
            <li>Durable outdoor and survival equipment</li>
            <li>Apparel engineered for performance and resilience</li>
            <li>Fast, secure shipping and mission-ready support</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>🤝 Why Choose Us</h2>
          <p>
            Our team includes veterans and outdoor experts who understand the demands of the field. We test every product to ensure it meets the highest standards of durability, functionality, and value.
          </p>
        </div>

        <div className="about-section">
          <h2>📍 Based in Cameroon</h2>
          <p>
            Proudly serving customers across the nation and beyond. Whether you're prepping for a mission or your next outdoor adventure, we're here to equip you.
          </p>
        </div>

        <p className="closing">
          Thank you for choosing <strong>Bluish</strong>. Gear up with confidence.
        </p>
      </div>
    </section>
  );
}
