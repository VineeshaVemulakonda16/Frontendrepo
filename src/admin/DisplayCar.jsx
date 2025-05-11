import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

const DisplayCar = () => 
{
  const [cars, setCars] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [carDetails, setCarDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      const response = await axios.get(`${config.url}/car/viewallcars`);
      setCars(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch cars: ' + err.message);
    }
  };

  const fetchCarById = async (id) => {
    try {
      const response = await axios.post(`${config.url}/car/displaycarbyid?cid=${id}`);
      setCarDetails(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching car: ' + err.message);
    }
  };

  const handleSelection = (e) => 
  {
    const id = e.target.value;
    setSelectedId(id);
    if (id) 
    {
      fetchCarById(id);
    } 
    else 
    {
      setCarDetails(null);
    }
  };

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Display Car Details</h3>

      {error && <p className="text-danger text-center">{error}</p>}

      <div className="form-group mb-3">
        <label><strong>Select a Car:</strong></label>
        <select className="form-control" value={selectedId} onChange={handleSelection}>
          <option value="">-- Select Car --</option>
          {cars.map(car => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
      </div>

      {carDetails && (
        <div className="card mt-3">
          <img
            src={`${config.url}/car/displaycarimage?id=${carDetails.id}`}
            className="card-img-top"
            alt="Car"
            style={{ height: "300px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{carDetails.name}</h5>
            <p className="card-text">
              <strong>Category:</strong> {carDetails.category}<br />
              <strong>Description:</strong> {carDetails.description}<br />
              <strong>Cost:</strong> ₹{carDetails.cost}<br />
              <strong>Type:</strong> {carDetails.type}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayCar;