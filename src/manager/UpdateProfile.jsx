import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    mobileno: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedManager = sessionStorage.getItem('manager');
    if (storedManager) {
      setFormData(JSON.parse(storedManager));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${config.url}/manager/updateprofile`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        sessionStorage.setItem('manager', JSON.stringify(formData)); // update session
      }
    } catch (error) {
      setMessage('');
      if (error.response) {
        setError(error.response.data);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h3 style={{ textAlign: "center", textDecoration: "underline" }}>Update Profile</h3>
      {
        message ?
          <p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>{message}</p> :
          <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>{error}</p>
      }

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" id="name" value={formData.name} onChange={handleChange} required />

        <label>Gender</label>
        <select id="gender" value={formData.gender} onChange={handleChange} required disabled>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label>Date of Birth</label>
        <input type="date" id="dob" value={formData.dob} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange} required />

        <label>Username</label>
        <input type="text" id="username" value={formData.username} onChange={handleChange} required disabled />

        <label>Password</label>
        <input type="password" id="password" value={formData.password} onChange={handleChange} required />

        <label>Mobile No</label>
        <input type="text" id="mobileno" value={formData.mobileno} onChange={handleChange} required />

        <button type="submit" style={{ marginTop: '10px' }}>Update</button>
      </form>
    </div>
  );
}