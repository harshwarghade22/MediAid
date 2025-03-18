// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaAmbulance, FaUserMd, FaClinicMedical, FaPills } from 'react-icons/fa';

// const Home = () => {
//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <div className="bg-blue-50 pt-24 pb-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//               Emergency Medical Assistance at Your Fingertips
//             </h1>
//             <p className="text-xl text-gray-600 mb-8">
//               Get immediate medical help, connect with healthcare professionals, and access emergency resources 24/7.
//             </p>
//             <Link
//               to="/emergency"
//               className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-red-700 transition duration-300"
//             >
//               Request Emergency Help
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Services Section */}
//       <div className="py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <ServiceCard
//               icon={<FaAmbulance className="h-12 w-12" />}
//               title="Ambulance Service"
//               description="Quick ambulance dispatch to your location"
//             />
//             <ServiceCard
//               icon={<FaUserMd className="h-12 w-12" />}
//               title="Online Doctors"
//               description="Connect with qualified medical professionals"
//             />
//             <ServiceCard
//               icon={<FaClinicMedical className="h-12 w-12" />}
//               title="Emergency Care"
//               description="24/7 emergency medical assistance"
//             />
//             <ServiceCard
//               icon={<FaPills className="h-12 w-12" />}
//               title="Pharmacy"
//               description="Quick access to essential medicines"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ServiceCard = ({ icon, title, description }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300">
//       <div className="text-blue-600 flex justify-center mb-4">{icon}</div>
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { Link } from 'react-router-dom';
import { FaAmbulance, FaUserMd, FaClinicMedical, FaPills, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-white"></div>
        
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Emergency Medical
              </span>
              <br />
              <span className="text-gray-900">Assistance at Your Fingertips</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Get immediate medical help, connect with healthcare professionals, and access emergency resources 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/emergency"
                className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Request Emergency Help
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                to="/doctors"
                className="inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 hover:shadow-lg transition-all duration-300"
              >
                Find a Doctor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed to provide immediate assistance when you need it most.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={<FaAmbulance />}
              title="Ambulance Service"
              description="Quick ambulance dispatch to your location with real-time tracking"
              color="red"
            />
            <ServiceCard
              icon={<FaUserMd />}
              title="Online Doctors"
              description="Connect with qualified medical professionals 24/7"
              color="blue"
            />
            <ServiceCard
              icon={<FaClinicMedical />}
              title="Emergency Care"
              description="Immediate medical assistance and emergency response"
              color="purple"
            />
            <ServiceCard
              icon={<FaPills />}
              title="Pharmacy"
              description="Quick access to essential medicines with home delivery"
              color="green"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    red: 'from-red-500 to-red-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
  };

  return (
    <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
      <div className={`inline-block p-4 rounded-full bg-gradient-to-r ${colorClasses[color]} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {React.cloneElement(icon, { className: 'h-8 w-8' })}
      </div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;