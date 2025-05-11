import React from 'react';
import './style.css';

export default function About() {
  return (
    <div className="about-container">
      <h1>About DriveEasy Car Rentals</h1>
      <p>
        Welcome to <strong>DriveEasy</strong>, your trusted car rental service. We are committed to making your journeys comfortable, safe, and memorable with our wide fleet of well-maintained vehicles.
      </p>

      <div className="about-section">
        <h2>Why Choose DriveEasy?</h2>
        <ul>
          <li>✔ Wide range of vehicles – economy, luxury, and SUVs</li>
          <li>✔ 24/7 customer support</li>
          <li>✔ Transparent and affordable pricing</li>
          <li>✔ Easy booking and quick pick-up/drop-off process</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          To simplify travel by offering flexible and affordable car rental solutions that prioritize customer convenience and quality service.
        </p>
      </div>

      
    </div>
  );
}
