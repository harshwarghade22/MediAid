import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  ShoppingBag, 
  Filter, 
  X 
} from 'lucide-react';

const PharmacyPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('nearby');
  const [filters, setFilters] = useState({
    emergency: false,
    delivery: false,
    highestRated: false,
    nearestFirst: false
  });
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Mock data for pharmacies
  const pharmacies = [
    {
      id: 1,
      name: "LifeCare Pharmacy",
      distance: 0.8,
      address: "123 Main Street, Downtown",
      phone: "+1 555-123-4567",
      rating: 4.8,
      hours: "Open 24/7",
      isEmergency: true,
      hasDelivery: true
    },
    {
      id: 2,
      name: "MediPlus Drugstore",
      distance: 1.2,
      address: "456 Oak Avenue, Westside",
      phone: "+1 555-987-6543",
      rating: 4.5,
      hours: "Open until 10PM",
      isEmergency: true,
      hasDelivery: true
    },
    {
      id: 3,
      name: "QuickMeds Pharmacy",
      distance: 2.5,
      address: "789 Pine Road, Eastside",
      phone: "+1 555-567-8901",
      rating: 4.2,
      hours: "Open until 9PM",
      isEmergency: false,
      hasDelivery: true
    }
  ];
  
  // Mock data for medications
  const medications = [
    {
      id: 1,
      name: "Emergency First Aid Kit",
      price: "$29.99",
      category: "Emergency",
      prescription: false,
      inStock: true,
      imageUrl: "https://via.placeholder.com/80"
    },
    {
      id: 2,
      name: "Aspirin 325mg",
      price: "$8.99",
      category: "Pain Relief",
      prescription: false,
      inStock: true,
      imageUrl: "https://via.placeholder.com/80"
    },
    {
      id: 3,
      name: "Antibiotic Ointment",
      price: "$12.50",
      category: "First Aid",
      prescription: false,
      inStock: true,
      imageUrl: "https://via.placeholder.com/80"
    },
    {
      id: 4,
      name: "Blood Pressure Monitor",
      price: "$49.99",
      category: "Medical Devices",
      prescription: false,
      inStock: true,
      imageUrl: "https://via.placeholder.com/80"
    },
    {
      id: 5,
      name: "Epinephrine Auto-Injector",
      price: "$375.00",
      category: "Emergency",
      prescription: true,
      inStock: true,
      imageUrl: "https://via.placeholder.com/80"
    }
  ];

  // Advanced filtering function for pharmacies
  const filteredPharmacies = useMemo(() => {
    return pharmacies
      .filter(pharmacy => 
        pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter(pharmacy => !filters.emergency || pharmacy.isEmergency)
      .filter(pharmacy => !filters.delivery || pharmacy.hasDelivery)
      .sort((a, b) => {
        if (filters.highestRated) return b.rating - a.rating;
        if (filters.nearestFirst) return a.distance - b.distance;
        return 0;
      });
  }, [pharmacies, searchQuery, filters]);

  // Advanced filtering function for medications
  const filteredMedications = useMemo(() => {
    return medications
      .filter(med => 
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        med.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [medications, searchQuery]);

  // Filter modal component
  const FilterModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-11/12 max-w-md rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filter Pharmacies</h2>
          <button onClick={() => setShowFilterModal(false)}>
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          {[
            { key: 'emergency', label: 'Emergency 24/7' },
            { key: 'delivery', label: 'Delivery Available' },
            { key: 'highestRated', label: 'Highest Rated' },
            { key: 'nearestFirst', label: 'Nearest First' }
          ].map(({ key, label }) => (
            <div 
              key={key} 
              className="flex justify-between items-center"
            >
              <span>{label}</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={filters[key]}
                  onChange={() => setFilters(prev => ({
                    ...prev,
                    [key]: !prev[key]
                  }))}
                  className="hidden"
                />
                <span className={`slider ${filters[key] ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
              </label>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setShowFilterModal(false)}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white px-4 py-3 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">MediAid Pharmacy</h1>
          <ShoppingBag className="h-6 w-6" />
        </div>
      </header>
      
      {/* Search Bar */}
      <div className="p-4 bg-white shadow-sm w-[70vw] mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search pharmacies or medications..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white w-[70vw] mx-auto">
        <button
          className={`flex-1 py-3 text-center font-medium ${activeTab === 'nearby' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('nearby')}
        >
          Nearby Pharmacies
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium ${activeTab === 'medications' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('medications')}
        >
          Medications
        </button>
      </div>
      
      {/* Content based on active tab */}
      <div className="flex-1 overflow-y-auto p-4 w-[70vw] mx-auto">
        {activeTab === 'nearby' ? (
          <>
            {/* Filter options */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto py-2">
              <button 
                onClick={() => setShowFilterModal(true)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  Object.values(filters).some(f => f)
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-700'
                } text-sm whitespace-nowrap`}
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
              
              {/* Active Filters Chips */}
              {Object.entries(filters)
                .filter(([_, value]) => value)
                .map(([key]) => {
                  const labels = {
                    emergency: 'Emergency 24/7',
                    delivery: 'Delivery',
                    highestRated: 'Highest Rated',
                    nearestFirst: 'Nearest First'
                  };
                  return (
                    <span 
                      key={key}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                    >
                      {labels[key]}
                    </span>
                  );
                })
              }
            </div>
            
            {/* Pharmacy list */}
            <div className="space-y-4">
              {filteredPharmacies.map(pharmacy => (
                <div key={pharmacy.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{pharmacy.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{pharmacy.distance} km • {pharmacy.address}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{pharmacy.phone}</span>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <Clock className="h-4 w-4 mr-1 text-gray-600" />
                        <span className={pharmacy.isEmergency ? "text-green-600 font-medium" : "text-gray-600"}>
                          {pharmacy.hours}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="ml-1 text-sm font-medium">{pharmacy.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      {pharmacy.isEmergency && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          Emergency
                        </span>
                      )}
                      {pharmacy.hasDelivery && (
                        <span className="mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          Delivery
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                      Call Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Categories for medications */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto py-2">
              <button className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm whitespace-nowrap">
                All Categories
              </button>
              <button className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm whitespace-nowrap">
                Emergency
              </button>
              <button className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm whitespace-nowrap">
                First Aid
              </button>
              <button className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm whitespace-nowrap">
                Pain Relief
              </button>
              <button className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm whitespace-nowrap">
                Medical Devices
              </button>
            </div>
            
            {/* Medications grid */}
            <div className="grid grid-cols-2 gap-4">
              {filteredMedications.map(med => (
                <div key={med.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-2 flex justify-center bg-gray-100">
                    <img src={med.imageUrl} alt={med.name} className="h-20 w-20 object-contain" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 line-clamp-2">{med.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-blue-600">{med.price}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{med.category}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      {med.prescription ? (
                        <span className="text-xs text-orange-600">Prescription Required</span>
                      ) : (
                        <span className="text-xs text-green-600">No Prescription</span>
                      )}
                      {med.inStock ? (
                        <span className="text-xs text-green-600">In Stock</span>
                      ) : (
                        <span className="text-xs text-red-600">Out of Stock</span>
                      )}
                    </div>
                    <button className="w-full mt-2 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      
      {/* Emergency Action Button */}
      <div className="fixed bottom-20 right-4">
        <button className="h-14 w-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
          SOS
        </button>
      </div>
      
      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 py-3 px-4 flex justify-around">
        <button className="flex flex-col items-center">
          <MapPin className="h-6 w-6 text-gray-500" />
          <span className="text-xs text-gray-500 mt-1">Nearby</span>
        </button>
        <button className="flex flex-col items-center">
          <ShoppingBag className="h-6 w-6 text-blue-600" />
          <span className="text-xs text-blue-600 mt-1">Pharmacy</span>
        </button>
        <button className="flex flex-col items-center">
          <Search className="h-6 w-6 text-gray-500" />
          <span className="text-xs text-gray-500 mt-1">Search</span>
        </button>
        <button className="flex flex-col items-center">
          <div className="h-6 w-6 rounded-full bg-gray-300"></div>
          <span className="text-xs text-gray-500 mt-1">Profile</span>
        </button>
      </nav>

      {/* Filter Modal */}
      {showFilterModal && <FilterModal />}
    </div>
  );
};

export default PharmacyPage;