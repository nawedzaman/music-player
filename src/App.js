import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper";
import LoginPage from "./components/LoginPage";
import VerifyOTPPage from "./components/VerifyOTPPage";
import SongsListingPage from "./components/SongsListingPage";

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const login = () => {
    setAuthenticated(true);
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthWrapper isAuthenticated={isAuthenticated}>
              <SongsListingPage />
            </AuthWrapper>
          }
        />
        <Route path="/verify-otp" element={<VerifyOTPPage onVerifySuccess={login}/>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
