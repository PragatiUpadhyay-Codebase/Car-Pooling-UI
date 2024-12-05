import React, { useState, useEffect } from 'react';
import Login from './Login';
import RideSearch from './RideSearch';
import RideManagement from './RideManagement';
import AddRideModal from './AddRideModal';
import './Dashboard.css';

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null); // Role after login
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [activeSection, setActiveSection] = useState('search');
  const [showAddRideModal, setShowAddRideModal] = useState(false);

  // Check if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role);
      setEmail(user.email);
      setName(user.name);
    }
  }, []);

  const handleLogin = (role, userEmail) => {
    setUserRole(role);
    setEmail(userEmail);
  };

  const handleRegister = (role, userName, userEmail) => {
    setUserRole(role);
    setEmail(userEmail);
    setName(userName);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    setUserRole(null);
    setEmail('');
    setName('');
  };

  const handleAddRide = () => {
    setShowAddRideModal(true);
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <img src="/images/carpool.png" alt="Rydex Logo" className="logo" />
        <h2>Rydex</h2>
        <p>{`Logged in as: ${name}`}</p>
        <nav>
          {userRole === 'Owner' && (
            <>
              <button onClick={() => setActiveSection('manage')}>Manage Rides</button>
              <button onClick={handleAddRide}>+ Add Ride</button>
            </>
          )}
          {userRole === 'Rider' && (
            <button onClick={() => setActiveSection('search')}>Search Rides</button>
          )}
        </nav>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {userRole === 'Owner' && activeSection === 'manage' && <RideManagement />}
        {userRole === 'Rider' && activeSection === 'search' && <RideSearch />}
      </main>

      {/* Add Ride Modal */}
      {showAddRideModal && userRole === 'Owner' && (
        <AddRideModal onClose={() => setShowAddRideModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;
