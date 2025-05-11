import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

export default function UpdateCarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    description: '',
    cost: '',
    type: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`${config.url}/car/getcarbyid/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
        setError('Failed to load car data.');
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${config.url}/car/updatecar`, formData);
      setMessage(response.data);
      setError('');
  
      // Wait 2 seconds, then go back to the car details page
      setTimeout(() => {
        navigate(`/deal/${id}`);  // Replace `deals` with your actual route name
      }, 2000);
  
    } catch (error) {
      setMessage('');
      setError(error.response?.data || 'Update failed');
    }
  };
  

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Update Car Details</h3>
      {
        message ?
          <p style={{ color: "green", fontWeight: "bold", textAlign: "center" }}>{message}</p> :
          <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>{error}</p>
      }

      <form onSubmit={handleSubmit}>
        <div>
          <label>Car Name</label>
          <input type="text" id="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Category</label>
          <input type="text" id="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea id="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Cost</label>
          <input type="number" id="cost" value={formData.cost} onChange={handleChange} required />
        </div>
        <div>
          <label>Type</label>
          <input type="text" id="type" value={formData.type} onChange={handleChange} required />
        </div>
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
}