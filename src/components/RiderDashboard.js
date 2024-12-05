import React, { useState, useEffect } from 'react';
import './rider-dashboard.css';
import { fetchRecentRides, requestRide, cancelRideRequest } from '../api/RideAPI'; // API methods

const RiderDashboard = () => {
  const [recentRides, setRecentRides] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRides, setFilteredRides] = useState([]);

  useEffect(() => {
    // Fetch recent rides when the component loads
    fetchRecentRides()
      .then((rides) => setRecentRides(rides))
      .catch((err) => console.error('Error fetching rides:', err));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredRides(
      recentRides.filter((ride) =>
        ride.destination.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleRequestRide = (rideId) => {
    requestRide(rideId)
      .then(() => alert('Ride request sent successfully!'))
      .catch((err) => console.error('Error requesting ride:', err));
  };

  const handleCancelRideRequest = (rideId) => {
    cancelRideRequest(rideId)
      .then(() => alert('Ride request canceled successfully!'))
      .catch((err) => console.error('Error canceling ride request:', err));
  };

  return (
    <div className="rider-dashboard">
      <h2>Welcome, Rider!</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search rides by destination..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="rides-list">
      {(searchTerm ? filteredRides : recentRides).map((ride) => (
    <div className="ride-card" key={ride.id}>
      <h3>Destination: {ride.destination}</h3>
      <p>Pickup: {ride.pickupLocation}</p>
      <p>Date: {ride.date}</p>
      <p>Time: {ride.time}</p>
      <p>Seats Available: {ride.availableSeats}</p>
      {ride.status === 'Requested' ? (
        <button
          className="cancel-button"
          onClick={() => handleCancelRideRequest(ride.id)}
        >
          Cancel Request
        </button>
      ) : (
        <button
          className="request-button"
          onClick={() => handleRequestRide(ride.id)}
        >
          Request Ride
        </button>
      )}
    </div>
  ))}
      </div>
    </div>
  );
};

export default RiderDashboard;
