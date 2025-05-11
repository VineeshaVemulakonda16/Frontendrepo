import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function BookedCars() {
  const [bookedCars, setBookedCars] = useState([]);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchBookedCars = async () => {
      const storedCustomer = sessionStorage.getItem('customer');
      if (storedCustomer) {
        const customerData = JSON.parse(storedCustomer);
        setCustomer(customerData);
        try {
          const response = await axios.get(`${config.url}/customer/bookedcars/${customerData.id}`);
          setBookedCars(response.data);
        } catch (error) {
          console.error('Error fetching booked cars:', error);
        }
      } else {
        alert('Please log in to view your booked cars.');
      }
    };

    fetchBookedCars();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center', textDecoration: 'underline' }}>Your Booked Cars</h3>
      {customer ? (
        <div>
          <table style={{ width: '100%', textAlign: 'center', marginBottom: '30px' }}>
            <thead style={{ backgroundColor: '#f2f2f2' }}>
              <tr>
                <th>Booking ID</th>
                <th>Car Name</th>
                <th>Category</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Booking Time</th>
              </tr>
            </thead>
            <tbody>
              {
  bookedCars.length > 0 ? bookedCars.map((car, index) => (
    <tr key={index}>
      <td>{car.id}</td>
      <td>{car.car.name}</td>
      <td>{car.car.category}</td>
      <td>{car.startDate}</td>
      <td>{car.endDate}</td>
      <td>{car.status}</td>
      <td>{new Date(car.bookingTime).toLocaleString()}</td>
    </tr>
  )) : (
    <tr>
      <td colSpan="7">No booked cars found.</td>
    </tr>
  )
}

            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading your customer details...</p>
      )}
    </div>
  );
}