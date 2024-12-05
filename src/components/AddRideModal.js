import React, { useState } from 'react';
import './AddRideModal.css';

const AddRideModal = ({ onClose }) => {
  const [rideDetails, setRideDetails] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    seats: '',
  });

  const handleChange = (e) => {
    setRideDetails({ ...rideDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // API call to save ride details
    console.log('Ride Details Submitted:', rideDetails);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Add New Ride</h3>
        <form>
          <label>
            Pickup Location:
            <input type="text" name="pickup" value={rideDetails.pickup} onChange={handleChange} />
          </label>
          <label>
            Destination:
            <input type="text" name="destination" value={rideDetails.destination} onChange={handleChange} />
          </label>
          <label>
            Date:
            <input type="date" name="date" value={rideDetails.date} onChange={handleChange} />
          </label>
          <label>
            Time:
            <input type="time" name="time" value={rideDetails.time} onChange={handleChange} />
          </label>
          <label>
            Available Seats:
            <input type="number" name="seats" value={rideDetails.seats} onChange={handleChange} />
          </label>
          <div className="modal-actions">
            <button type="button" onClick={handleSubmit}>Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRideModal;
