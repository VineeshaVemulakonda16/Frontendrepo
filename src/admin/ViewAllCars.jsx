import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import './admin.css';

const ViewAllCars = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try 
    {
      const response = await axios.get(`${config.url}/car/viewallcars`);
      setCars(response.data);
      setError('');
    } 
    catch (err) 
    {
      setError('Failed to fetch cars. ' + err.message);
    }
  };

  return (
    <div className="car-table-container">
      <h3 className="car-heading">All Cars</h3>

      <p style={{textAlign: "center", color: "green", fontWeight: "bolder"}}>{error}</p>

      <div className="table-responsive">
        <table className="car-table" style={{textAlign:"center"}}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Type</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index}>
                <td>{car.id}</td>
                <td>{car.name}</td>
                <td>{car.category}</td>
                <td>{car.description}</td>
                <td>₹{car.cost}</td>
                <td>
                  {
                    car.type
                  }
                </td>
                <td>
                  <img
                    src={`${config.url}/car/displaycarimage?id=${car.id}`}
                    alt="Car"
                    className="table-image"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllCars;