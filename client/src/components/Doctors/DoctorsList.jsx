import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaStethoscope, FaUserMd, FaStar, FaNotesMedical, FaCalendarCheck, FaHeartbeat } from 'react-icons/fa';

const DoctorsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [rating, setRating] = useState(0);
  const scrollRef = useRef(null);

  const specialties = [
    'Cardiology', 'Neurology', 'Pediatrics', 
    'Orthopedics', 'Oncology', 'Emergency Medicine'
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Cardiology',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 4.8,
      emergencyCases: 250,
      description: 'Experienced cardiologist specializing in heart disease prevention and treatment.',
      hospital: 'City Central Hospital'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4.6,
      emergencyCases: 180,
      description: 'Leading neurologist with expertise in complex neurological disorders.',
      hospital: 'Neurological Institute'
    },
    {
      id: 3,
      name: 'Dr. Sarah Thompson',
      specialty: 'Emergency Medicine',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4.9,
      emergencyCases: 350,
      description: 'Critical care specialist with extensive emergency room experience.',
      hospital: 'Metropolitan Emergency Center'
    },
    {
      id: 4,
      name: 'Dr. David Kim',
      specialty: 'Pediatrics',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 4.7,
      emergencyCases: 120,
      description: 'Compassionate pediatrician dedicated to children\'s health and wellness.',
      hospital: 'Children\'s Medical Center'
    },
    {
      id: 5,
      name: 'Dr. Olivia Martinez',
      specialty: 'Oncology',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 4.9,
      emergencyCases: 200,
      description: 'Renowned oncologist with breakthrough cancer treatment approaches.',
      hospital: 'Cancer Research Hospital'
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrameId;
    
    const autoScroll = () => {
      if (scrollContainer) {
        // Increment scroll position
        scrollContainer.scrollLeft += 1;
        
        // If we've reached the end, reset to the beginning
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      
      // Continue the animation
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    // Start auto-scrolling
    animationFrameId = requestAnimationFrame(autoScroll);

    // Pause animation on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (specialty === '' || doctor.specialty === specialty) &&
    doctor.rating >= rating
  );

  // Duplicate doctors to create infinite scroll effect
  const infiniteDoctors = [...filteredDoctors, ...filteredDoctors];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="container mx-auto">
        {/* Search and Filter Section (Previous implementation) */}
        <div className="mb-12 mt-20">
          
        <div className="max-w-2xl mx-auto mb-6 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search doctors by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          
          <div className="max-w-4xl mx-auto flex space-x-4 ">
            
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                <FaStethoscope className="inline mr-2" /> Specialty
              </label>
              <select 
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300"
              >
                <option value="">All Specialties</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                <FaStar className="inline mr-2" /> Minimum Rating
              </label>
              <select 
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-3 rounded-lg border border-gray-300"
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
              </select>
            </div>
          </div>
        </div>
        </div>

        {/* Doctors Infinite Scroll Container */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex overflow-x-scroll scrollbar-hide space-x-6 pb-6 px-4 animate-scroll"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, white 10%, white 90%, transparent 100%)'
            }}
          >
            {infiniteDoctors.map((doctor, index) => (
              <div 
                key={`${doctor.id}-${index}`}
                className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300 group"
              >
                {/* Doctor Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 rounded-full px-3 py-1 flex items-center">
                    <FaStar className="text-yellow-500 mr-1" />
                    {doctor.rating}
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="p-5">
                  <h2 className="text-xl font-bold mb-1">{doctor.name}</h2>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaUserMd className="mr-2" />
                    {doctor.specialty}
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <FaNotesMedical className="mr-2" />
                    {doctor.hospital}
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{doctor.description}</p>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-sm">
                      <FaCalendarCheck className="mr-2" /> Appointment
                    </button>
                    <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors animate-pulse flex items-center justify-center text-sm">
                      <FaHeartbeat className="mr-2" /> Emergency
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default DoctorsList;