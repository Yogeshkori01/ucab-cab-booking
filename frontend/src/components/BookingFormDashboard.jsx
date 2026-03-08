import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import CabTypeCard from './CabTypeCard';
import api from '../services/api';

const BookingFormDashboard = ({ onBookSuccess, initialState }) => {
  const [pickup, setPickup] = useState(initialState?.pickup || '');
  const [dropoff, setDropoff] = useState(initialState?.dropoff || '');
  const [selectedCabType, setSelectedCabType] = useState(initialState?.cabType || 'mini');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  // Clear passed state so it doesn't get preserved incorrectly on reload
  useEffect(() => {
    if (initialState) {
        window.history.replaceState({}, document.title)
    }
  }, [initialState]);

  const cabTypes = [
    { type: 'mini', name: 'Mini', description: 'Affordable, compact rides', priceMultiplier: 1 },
    { type: 'sedan', name: 'Sedan', description: 'Comfortable sedans', priceMultiplier: 1.5 },
    { type: 'suv', name: 'SUV', description: 'Extra seats and space', priceMultiplier: 2.2 },
  ];

  const handleBook = async (e) => {
    e.preventDefault();
    if (!pickup || !dropoff) return;
    
    setIsBooking(true);
    setMessage('');
    setError('');

    try {
      await api.post('/rides', {
        pickupLocation: { address: pickup },
        dropLocation: { address: dropoff },
        cabTypeRequested: selectedCabType.charAt(0).toUpperCase() + selectedCabType.slice(1)
      });
      setMessage('Cab booked successfully! Searching for drivers...');
      setPickup('');
      setDropoff('');
      if (onBookSuccess) onBookSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book cab');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="card bg-primary-900 border border-primary-800 border-t-4 border-t-primary-500">
      <h3 className="text-xl font-bold text-white mb-6">Book a Ride</h3>
      
      {message && <div className="mb-4 text-sm text-green-400 bg-green-500/10 p-3 rounded-xl border border-green-500/20">{message}</div>}
      {error && <div className="mb-4 text-sm text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20">{error}</div>}

      <form onSubmit={handleBook}>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <div className="h-3 w-3 rounded-full border-[3px] border-primary-500"></div>
          </div>
          <input
            type="text"
            className="input-field pl-10 bg-primary-800 border-primary-700 text-white focus:bg-primary-900 focus:ring-primary-500 placeholder-primary-400"
            placeholder="Pickup address"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
        </div>

        <div className="relative mb-6">
          <div className="absolute top-0 bottom-0 left-5 -mt-4 w-0.5 bg-primary-700 z-0 h-4"></div>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
             <MapPin className="h-4 w-4 text-primary-500" />
          </div>
          <input
            type="text"
            className="input-field pl-10 bg-primary-800 border-primary-700 text-white focus:bg-primary-900 focus:ring-primary-500 placeholder-primary-400"
            placeholder="Dropoff address"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
          />
        </div>

        {pickup && dropoff && (
          <div className="mb-6 animate-fade-in transition-all">
            <h4 className="text-xs font-bold text-primary-400 uppercase tracking-wider mb-2">Select Vehicle Type</h4>
            <div className="grid grid-cols-1 gap-2">
              {cabTypes.map((cab) => (
                <CabTypeCard
                  key={cab.type}
                  {...cab}
                  baseFare={150} 
                  selectedType={selectedCabType}
                  onSelect={setSelectedCabType}
                />
              ))}
            </div>
          </div>
        )}

        <button 
          type="submit" 
          disabled={!pickup || !dropoff || isBooking}
          className={`w-full font-bold py-3 px-4 rounded-xl shadow-sm text-sm transition duration-200 ${
              (!pickup || !dropoff) ? 'bg-primary-800 text-primary-500 cursor-not-allowed border border-primary-700' : 
              isBooking ? 'bg-primary-600 text-white cursor-wait' : 'btn-primary'
          }`}
        >
          {isBooking ? 'Processing Booking...' : 'Request Ride Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingFormDashboard;
