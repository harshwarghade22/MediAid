import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Pages/Home';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import EmergencyButton from './components/Emergency/EmergencyButton';
import DoctorsList from './components/Doctors/DoctorsList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/emergency" element={<EmergencyButton />} />
          <Route path="/doctors" element={<DoctorsList />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;