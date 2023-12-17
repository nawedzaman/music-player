import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../services/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import "./LoginPage.css";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setLoading(true);
      const formattedPhoneNumber = `+${phoneNumber}`;
      sessionStorage.setItem("phoneNumber", formattedPhoneNumber);
      const response = await sendOTP(formattedPhoneNumber);

      if (response) {
        navigate("/verify-otp");
      } else {
        setError("Login failed. Please check your phone number and try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className="login-login-page">
        <div className="phone-input-border">
        <PhoneInput
          country={"in"}
          enableSearch={true}
          value={phoneNumber}
          onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
        </div>
        <div className="sign-in1">Sign In</div>
        <div className="description">
          Please enter your mobile number to login. We will send an OTP to
          verify your number.
        </div>
          <div className="btn-parent">
            <div className="btn"  onClick={handleLogin}>
              <button className={`btn-child ${loading ? 'loading' : ''}`} ></button>
              <b className={`sign-in${loading ? 'loading' : ''}`}>Sign In</b>
              <div className={`error-message ${error ? 'show' : ''}`}>{error}</div>
            </div>
          </div>
      </div>
    </>
  );
};

export default LoginPage;
