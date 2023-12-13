import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "../services/api";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import "./LoginPage.css";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      const formattedPhoneNumber = `+${phoneNumber}`;
      const response = await sendOTP(formattedPhoneNumber);

      if (response) {
        navigate("/verify-otp");
      } else {
        setError("Login failed. Please check your phone number and try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="login-login-page">
        <div className="phone-input-border">
        <PhoneInput
          country={"eg"}
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
            <div className="btn">
              <button className="btn-child" onClick={handleLogin}></button>
              <b className="sign-in">Sign In</b>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
      </div>
    </>
  );
};

export default LoginPage;
