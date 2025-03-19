import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Pages/Home';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import EmergencyButton from './components/Emergency/EmergencyButton';
import DoctorsList from './components/Doctors/DoctorsList';
import AppointmentBooking from './components/Doctors/AppointmentBooking';
import EmergencyContact from './components/Doctors/EmergencyContact';
import TextChatPage from './components/Doctors/TextChatPage';
import VideoChatPage from './components/Doctors/VideoChatPage';
import PharmacyPage from './components/Pharmacy/pharmacy';
import WalletPage from './components/WalletPage';
import Blogs from './components/Blogs/Blogs';
import BlogsDetail from './components/Blogs/BlogsDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogsDetail />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/appointmentBooking/:id" element={<AppointmentBooking />} />
          <Route path="/emergencyContact/:id" element={<EmergencyContact />} />
          <Route path="/emergencyContact/text-page/:id" element={<TextChatPage />} />
          <Route path="/emergencyContact/video-page/:id" element={<VideoChatPage />} />
          <Route path="/pharmacy" element={<PharmacyPage />} />
          <Route path="/wallet" element={<WalletPage />} />

          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;