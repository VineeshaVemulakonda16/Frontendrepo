import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const AddCar = () => {
  const [car, setCar] = useState({
    category: '',
    name: '',
    description: '',
    cost: '',
    type: ''
  });
  const [carImage, setCarImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setCarImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('carimage', carImage);
    formData.append('category', car.category);
    formData.append('name', car.name);
    formData.append('description', car.description);
    formData.append('cost', car.cost);
    formData.append('type', car.type);

    try {
      const response = await axios.post(`${config.url}/car/addcar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(response.data);
      setError('');

      setCar({
        category: '',
        name: '',
        description: '',
        cost: '',
        type: ''
      });
      setCarImage(null);

    } catch (error) {
      console.log(error.message);
      setMessage('');
      setError(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Add Car</h3>
      {
        message ?
          <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>{message}</p> :
          <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>{error}</p>
      }
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <div className="mb-3">
          <label>Category:</label>
          <select className="form-control" name="category" onChange={handleChange} required>
            <option value="">-- Select Category --</option>
            <option value="Luxury">Luxury</option>
            <option value="SUV">SUV</option>
            <option value="Sports">Sports</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Name:</label>
          <input type="text" className="form-control" name="name" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea className="form-control" name="description" rows="3" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Cost:</label>
          <input type="number" step="0.01" className="form-control" name="cost" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Type:</label>
          <input type="text" className="form-control" name="type" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Car Image:</label>
          <input type="file" className="form-control" onChange={handleImageChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;