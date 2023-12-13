import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {verifyOTP} from '../services/api'

const VerifyOTPPage = ( {onVerifySuccess}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const isOtpValid = await verifyOTP(otp);

    if (isOtpValid) {
        onVerifySuccess();
        navigate('/');
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerifyOTP}>
        <label>
          OTP:
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Verify OTP</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default VerifyOTPPage;
