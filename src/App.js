import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper";
import LoginPage from "./components/LoginPage";
import VerifyOTPPage from "./components/VerifyOTPPage";
import SongsListingPage from "./components/SongsListingPage";

const App = () => {



  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthWrapper>
              <SongsListingPage />
            </AuthWrapper>
          }
        />
        <Route path="/verify-otp" element={<VerifyOTPPage/>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
