import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import 'useNavigate' instead of 'useHistory'
import { loginUser } from '../services/api';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use 'useNavigate' instead of 'useHistory'

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setError('Please enter a valid phone number.');
      return;
    }

    try {
      const response = await loginUser(phoneNumber);

      if (response.success) {
        // Redirect to the OTP verification page
        navigate('/verify-otp');
      } else {
        setError('Login failed. Please check your phone number and try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
