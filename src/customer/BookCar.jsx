import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../config';

export default function BookCar() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const carId = queryParams.get('carid');
  console.log("Loaded carId:", carId);

  const [customer, setCustomer] = useState(null);
  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    startdate: '',
    enddate: '',
    pickupLocation: '',
    deliveryOption: 'self-pickup',
  });

  const deliveryOptions = [
    { value: 'self-pickup', label: 'Self Pick Up' },
    { value: 'doorstep-delivery', label: 'Need car at your door step' },
  ];

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem("customer");
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    } else {
      alert("Customer not logged in!");
      navigate('/customerlogin');
    }

    if (carId) {
      fetchCarDetails(carId);
    }
  }, [navigate, carId]);

  const fetchCarDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:2030/car/getcarbyid/${carId}`);
      const data = await response.json();
      setCar(data);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer || !car) {
      alert("Customer or car information is missing.");
      return;
    }

    if (new Date(formData.enddate) < new Date(formData.startdate)) {
      alert("End date cannot be before start date.");
      return;
    }

    const bookingData = {
      car: { id: car.id },
      customer: { id: customer.id },
      startdate: new Date(formData.startdate).toISOString().split('T')[0],
      enddate: new Date(formData.enddate).toISOString().split('T')[0],
      bookedunits: 1,
      status: "BOOKED",
      pickupLocation: formData.pickupLocation,
      deliveryOption: formData.deliveryOption,
    };

    console.log("Booking data:", bookingData);

    try {
      const response = await fetch(`${config.url}/customer/bookcar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        alert("Car booked successfully!");
        navigate('/bookedcars');
      } else {
        const errorMessage = await response.text();
        alert(`Failed to book car. Server says: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>Book Car</h3>
      {car ? (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
          <h4>{car.name}</h4>
          <img
            src={`${config.url}/car/displaycarimage?id=${car.id}`}
            alt={car.name}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div>
              <label>Start Date: </label>
              <input
                type="date"
                name="startdate"
                value={formData.startdate}
                onChange={handleChange}
                required
                min={today}
              />
            </div>
            <div>
              <label>End Date: </label>
              <input
                type="date"
                name="enddate"
                value={formData.enddate}
                onChange={handleChange}
                required
                min={formData.startdate || today}
              />
            </div>
            <div>
              <label>Pickup Location: </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Delivery Option: </label>
              <select
                name="deliveryOption"
                value={formData.deliveryOption}
                onChange={handleChange}
              >
                {deliveryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button type="submit">Confirm Booking</button>
            </div>
          </form>
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>Loading car details...</p>
      )}
    </div>
  );
}

