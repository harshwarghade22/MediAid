// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaUserMd, FaBars, FaTimes } from 'react-icons/fa';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-lg fixed w-full z-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <FaUserMd className="h-8 w-8 text-blue-600" />
//               <span className="ml-2 text-2xl font-bold text-gray-800">MediAid</span>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
//             <Link to="/emergency" className="text-gray-600 hover:text-blue-600">Emergency</Link>
//             <Link to="/doctors" className="text-gray-600 hover:text-blue-600">Doctors</Link>
//             <Link to="/pharmacy" className="text-gray-600 hover:text-blue-600">Pharmacy</Link>
//             <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
//             <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
//               Login
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
//               {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <Link to="/" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">Home</Link>
//               <Link to="/emergency" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">Emergency</Link>
//               <Link to="/doctors" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">Doctors</Link>
//               <Link to="/pharmacy" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">Pharmacy</Link>
//               <Link to="/about" className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md">About</Link>
//               <Link to="/login" className="block px-3 py-2 bg-blue-600 text-white rounded-md">Login</Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserMd, FaBars, FaTimes, FaHeartbeat } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status (e.g., from localStorage or context)
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    // Perform logout logic
    localStorage.removeItem('authToken');
    // Clear any other authentication-related data
    setIsLoggedIn(false);
    // Redirect to home or login page
    navigate('/');
  };

  const AuthButton = () => {
    if (isLoggedIn) {
      return (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      );
    }
    
    return (
      <div className="flex space-x-4">
        <Link
          to="/signin"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-all duration-300"
        >
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <FaHeartbeat className="h-8 w-8 text-red-500 group-hover:scale-110 transition-transform duration-300" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MediAid
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/emergency">Emergency</NavLink>
            <NavLink to="/doctors">Doctors</NavLink>
            <NavLink to="/pharmacy">Pharmacy</NavLink>
            <NavLink to="/about">About</NavLink>
            
            {/* Auth Button */}
            <div className="flex items-center">
              <AuthButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/emergency" onClick={() => setIsOpen(false)}>Emergency</Link>
            <Link to="/doctors" onClick={() => setIsOpen(false)}>Doctors</Link>
            <Link to="/pharmacy" onClick={() => setIsOpen(false)}>Pharmacy</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            
            {/* Mobile Auth Buttons */}
            <div className="space-y-2 pt-2">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full bg-red-500 text-white px-4 py-2 rounded-full"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-full"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// NavLink and MobileNavLink components remain the same as in previous implementation

export default Navbar;