import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = ({ onLogin, onRegister }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Rider');
  const [isRegistered, setIsRegistered] = useState(false); // Track if user is registered
  const [error, setError] = useState(null);

  // Check if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      onLogin(user.role, user.email);
    }
  }, [onLogin]);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (email && isValidEmail(email)) {
      // Simulate checking if the user exists in the system
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email) {
          console.log(`Logging in user: ${email}`);
          onLogin(user.role, email);
          return;
        }
      }
      setError('User not found. Please register first.');
    } else {
      setError('Please enter a valid email!');
    }
  };

  const handleRegister = () => {
    if (name && email && isValidEmail(email)) {
      // Simulate registering the user
      console.log(`User registered: ${name}, ${email}`);
      onRegister(role, name, email);
      localStorage.setItem('user', JSON.stringify({ name, email, role }));
    } else {
      setError('Please fill in all fields and enter a valid email!');
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="/images/carpool.png" alt="Rydex Logo" className="logo" />
      </div>
      <h2>Welcome to Rydex</h2>
      <p>Blockchain-powered Peer-to-Peer Carpooling</p>
      {error && <div className="error-message">{error}</div>}

      {!isRegistered ? (
        <div className="form-container">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Owner">Owner</option>
            <option value="Rider">Rider</option>
          </select>
          <button onClick={handleRegister}>Register</button>
          <p>
            Already have an account?{' '}
            <span onClick={() => setIsRegistered(true)} className="link">
              Login here
            </span>
          </p>
        </div>
      ) : (
        <div className="form-container">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <p>
            Don't have an account?{' '}
            <span onClick={() => setIsRegistered(false)} className="link">
              Register here
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
