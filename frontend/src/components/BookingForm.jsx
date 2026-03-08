import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import CabTypeCard from './CabTypeCard';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedCabType, setSelectedCabType] = useState('mini');

  const cabTypes = [
    { type: 'mini', name: 'Mini', description: 'Affordable, compact rides', priceMultiplier: 1 },
    { type: 'sedan', name: 'Sedan', description: 'Comfortable sedans', priceMultiplier: 1.5 },
    { type: 'suv', name: 'SUV', description: 'Extra seats and space', priceMultiplier: 2.2 },
  ];

  const handleBook = (e) => {
    e.preventDefault();
    if (!pickup || !dropoff) return;
    
    // Check if logged in
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
      return;
    }
    
    // If logged in, pass booking details via state to user dashboard or booking page
    navigate('/user', { state: { pickup, dropoff, cabType: selectedCabType } });
  };

  return (
    <div className="glass-panel w-full max-w-md mx-auto relative z-10 p-8 shadow-[0_0_40px_rgba(6,182,212,0.1)] rounded-3xl overflow-hidden hover:shadow-[0_0_50px_rgba(6,182,212,0.2)] transition-shadow duration-500 border border-white/5">
      {/* Subtle animated background glow inside the card */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-accent-500 opacity-20 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-accent-600 opacity-15 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <h2 className="text-3xl font-extrabold text-white mb-6 tracking-tight relative z-10 flex items-center">
         Get a ride
      </h2>
      <form onSubmit={handleBook} className="relative z-10">
        <div className="relative mb-4 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <div className="h-4 w-4 rounded-full border-4 border-primary-500 group-focus-within:border-accent-400 transition-colors duration-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]"></div>
          </div>
          <input
            type="text"
            className="input-field pl-12 h-14 bg-primary-800/40 hover:bg-primary-700/50 focus:bg-primary-900/60 text-white text-lg rounded-2xl border border-transparent focus:border-accent-500/50 focus:ring-accent-500/30 shadow-inner transition-all duration-300 placeholder-primary-400"
            placeholder="Pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />
        </div>

        <div className="relative mb-6 group">
          <div className="absolute top-0 bottom-0 left-6 -mt-4 w-0.5 bg-gradient-to-b from-primary-500/50 to-accent-600/50 z-0 h-4 shadow-[0_0_5px_rgba(6,182,212,0.3)]"></div>
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10 transform group-focus-within:scale-110 transition-transform duration-300">
             <MapPin className="h-5 w-5 text-primary-500 group-focus-within:text-accent-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] transition-colors" />
          </div>
          <input
            type="text"
            className="input-field pl-12 h-14 bg-primary-800/40 hover:bg-primary-700/50 focus:bg-primary-900/60 text-white text-lg rounded-2xl border border-transparent focus:border-accent-500/50 focus:ring-accent-500/30 shadow-inner transition-all duration-300 placeholder-primary-400"
            placeholder="Dropoff location"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
          />
        </div>

        {pickup && dropoff && (
          <div className="mb-6 animate-fade-in transition-all">
            <h3 className="text-sm font-bold text-primary-400 uppercase tracking-wider mb-3 flex items-center">
               <span className="w-2 h-2 rounded-full bg-accent-500 mr-2 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
               Select Ride
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {cabTypes.map((cab) => (
                <CabTypeCard
                  key={cab.type}
                  {...cab}
                  baseFare={150} // Base fare placeholder
                  selectedType={selectedCabType}
                  onSelect={setSelectedCabType}
                />
              ))}
            </div>
          </div>
        )}

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white font-extrabold h-14 text-lg rounded-2xl transition-all duration-300 mt-2 flex items-center justify-center border border-transparent shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transform hover:-translate-y-1"
        >
          {pickup && dropoff ? 'Request Ride' : 'See prices'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
