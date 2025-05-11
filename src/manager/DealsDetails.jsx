import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DealsDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`${config.url}/car/getcarbyid/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`${config.url}/car/deletecar/${car.id}`);
      alert("Car deleted successfully!");
      navigate("/Deals"); // redirect to list page or homepage
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete car.");
    }
  };
  

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ width: '30rem', padding: '20px' }}>
        <img 
          src={`${config.url}/car/displaycarimage?id=${car.id}`} 
          className="card-img-top" 
          alt="car"
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h4 className="card-title" style={{ textAlign: 'center' }}>{car.name}</h4>
          <p><strong>Category:</strong> {car.category}</p>
          <p><strong>Description:</strong> {car.description}</p>
          <p><strong>Cost:</strong> ₹{car.cost}</p>
          {car.type && (
            <p><strong>Type:</strong> {car.type}</p>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
    <Button variant="contained" color="primary" onClick={() => navigate(`/update-car/${car.id}`)}>
      Update
    </Button>
    <Button variant="contained" color="error" onClick={handleDelete}>
      Delete
    </Button>
  </div>
        </div>
      </div>
    </div>
  );
};

export default DealsDetails;