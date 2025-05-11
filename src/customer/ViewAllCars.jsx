import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './customer.css'; // Make sure your CSS file is imported

export default function ViewAllCars() {
  const [cars, setCars] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    id: '',
    name: '',
    category: '',
    type: '',
    cost: '',
    description: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCars();
  }, []);

  const fetchAllCars = async () => {
    try {
      const response = await fetch(`${config.url}/customer/viewallcars`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setCars(data);
      } else {
        console.error('Expected array but got:', data);
        setCars([]); // fallback to empty array
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      setCars([]); // avoid .filter crash
    }
  };

  const handleRentNow = (carId) => {
    const customer = JSON.parse(sessionStorage.getItem("customer"));
    if (!customer || !customer.id) {
      alert("Customer not logged in");
      return;
    }
    console.log("Navigating to:", `/bookcar?carid=${carId}`);
    navigate(`/bookcar?carid=${carId}`);
  };

  const handleSearchChange = (e, field) => {
    setSearchTerms(prev => ({ ...prev, [field]: e.target.value }));
  };

  const filteredCars = cars.filter(car => {
    return (
      car.id.toString().includes(searchTerms.id) &&
      car.name.toLowerCase().includes(searchTerms.name.toLowerCase()) &&
      car.category.toLowerCase().includes(searchTerms.category.toLowerCase()) &&
      car.type.toLowerCase().includes(searchTerms.type.toLowerCase()) &&
      car.cost.toString().includes(searchTerms.cost) &&
      car.description.toLowerCase().includes(searchTerms.description.toLowerCase())
    );
  });

  return (
    <div className="event-container">
      <h3 className="event-heading">Available Cars</h3>
      <div className="car-listings-wrapper">
        {filteredCars.length > 0 ? (
          filteredCars.map(car => (
            <div key={car.id} className="car-listing">
              <img
                src={`${config.url}/car/displaycarimage?id=${car.id}`}
                alt={car.name}
                // REMOVED inline maxWidth style, now controlled by customer.css
                style={{ height: 'auto', borderRadius: '6px', marginRight: '20px' }}
              />
              <div className="car-details-container">
                <h2 className="car-title">{car.name}</h2>
                <p className="car-details"><strong>Category:</strong> {car.category}</p>
                <p className="car-details"><strong>Type:</strong> {car.type}</p>
                <p className="car-details"><strong>Cost:</strong> ₹{car.cost} per day</p>
                <p className="car-details"><strong>Description:</strong> {car.description}</p>
                <button className="rent-button" onClick={() => handleRentNow(car.id)}>Rent Now</button>
              </div>
            </div>
          ))
        ) : (
          <p>No matching cars found.</p>
        )}
      </div>
    </div>
  );
}