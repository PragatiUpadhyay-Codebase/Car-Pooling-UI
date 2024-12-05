import React, { useState, useEffect } from "react";
import axios from "axios";

const RideRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/owner/requests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      await axios.post(`http://localhost:5000/api/owner/requests/${requestId}/accept`);
      alert("Request accepted!");
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(`http://localhost:5000/api/owner/requests/${requestId}/reject`);
      alert("Request rejected!");
      fetchRequests(); // Refresh the list
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div>
      <h2>Ride Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <p>Rider: {request.riderName}</p>
            <p>Ride: {request.rideDetails}</p>
            <button onClick={() => handleAccept(request.id)}>Accept</button>
            <button onClick={() => handleReject(request.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideRequests;
