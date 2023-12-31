import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOTP,sendOTP } from "../services/api";
import "./VerifyOTPPage.css";
const VerifyOTPPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLoginRoute = () => {
    navigate("/login");
  };
  const handleKeyDown = (index, e) => {
    // Handle backspace key
  if (e.key === "Backspace") {
    const newOtp = [...otp];

    // If the current input is empty, focus on the previous input
    if (!newOtp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }

    // Delete the current digit
    newOtp[index] = "";
    setOtp(newOtp);
  }
  };
  const handleInputChange = (index, value) => {
    // Validate input to allow only numeric values
    const isNumeric = /^[0-9]+$/;
    if (isNumeric.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input box automatically if a digit is entered
      if (value !== "" && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const enteredOtp = parseInt(otp.join(""), 10);
    try {
      setLoading(true);
      const isOtpValid = await verifyOTP(enteredOtp);
      if (isOtpValid) {
        localStorage.setItem('token', isOtpValid);
        navigate("/");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while verifying OTP. Please try again.");
    }finally {
      setLoading(false); 
    }
  };
  const handleResendOTP = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Retrieve phone number from session storage
      const storedPhoneNumber = sessionStorage.getItem("phoneNumber");

      if (!storedPhoneNumber) {
        setError("Phone number not found. Please go back and enter your phone number.");
        return;
      }

      const response = await sendOTP(storedPhoneNumber);

      if (response) {
        // Handle success
      } else {
        setError("Resend OTP failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Show the error message for a few seconds and then hide it
    if (error) {
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [error]);
  return (
    <div className="login-login-page-verify-otp">
      <div className="group-parent">
        <div className="use-another-number-parent">
          <div className="use-another-number" onClick={handleLoginRoute}>
            Use another number
          </div>
          <div className="resend-otp" onClick={handleResendOTP}>
            Resend OTP
          </div>
        </div>
        <div className="otp-btn" onClick={handleVerifyOTP}>
          <div className={`otp-btn-child ${loading ? 'loading' : ''}`} ></div> 
          <b className={`verify${loading ? 'loading' : ''}`}>Verify</b>
        </div>

        <div className="otp-container">
          <div className="otp-inputs-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                className="otp-input"
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
        </div>
        <div className="otp-description">
          We have sent an OTP . Please enter the code received to verify.
        </div>
        <div className="otp-verification">OTP Verification</div>
      </div>
      <div className={`error-message ${error ? 'show' : ''}`}>{error}</div>
    </div>
  );
};

export default VerifyOTPPage;
