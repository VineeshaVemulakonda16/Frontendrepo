import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const Deals = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${config.url}/car/viewallcars`);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleCarClick = (id) => {
    navigate(`/deal/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Luxury Car Deals</h2>

      <div className="deals-grid">
        {cars.map((car) => (
          <div 
            key={car.id} 
            className="deal-card"
            onClick={() => handleCarClick(car.id)}
          >
            <img 
              src={`${config.url}/car/displaycarimage?id=${car.id}`} 
              alt={car.name} 
              className="deal-image"
            />
            <div className="deal-name">{car.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;