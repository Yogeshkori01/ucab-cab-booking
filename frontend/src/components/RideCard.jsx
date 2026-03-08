import React from 'react';
import { MapPin, Clock, CreditCard, CheckCircle2, Clock3, XCircle } from 'lucide-react';

const RideCard = ({ ride, isDriver, onAccept, onReject }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-accent-400 bg-accent-900/30 border-accent-800 shadow-[0_0_10px_rgba(6,182,212,0.2)]';
      case 'cancelled': return 'text-red-400 bg-red-900/30 border-red-800 shadow-[0_0_10px_rgba(248,113,113,0.2)]';
      case 'accepted': return 'text-accent-300 bg-accent-800/40 border-accent-500 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse';
      default: return 'text-yellow-400 bg-yellow-900/30 border-yellow-800 shadow-[0_0_10px_rgba(250,204,21,0.2)]';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 mr-1" />;
      case 'cancelled': return <XCircle className="w-4 h-4 mr-1" />;
      default: return <Clock3 className="w-4 h-4 mr-1" />;
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)] border border-white/5 hover:border-accent-500/30 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-white group-hover:text-accent-200 transition-colors">
            {new Date(ride.createdAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            })}
          </h3>
          <p className="text-sm text-primary-400 font-medium">
            {new Date(ride.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center border ${getStatusColor(ride.status)} backdrop-blur-sm`}>
          {getStatusIcon(ride.status)}
          {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
        </div>
      </div>

      <div className="space-y-5 mb-6 bg-primary-900/50 rounded-2xl p-4 border border-primary-800/50">
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-accent-400 mt-0.5 mr-3 flex-shrink-0 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
          <div>
            <p className="text-xs text-primary-500 uppercase tracking-wider font-bold mb-1">Pickup</p>
            <p className="text-white font-medium text-sm">
              {typeof ride.pickupLocation === 'object' ? ride.pickupLocation.address : ride.pickupLocation}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <MapPin className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0 drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]" />
          <div>
            <p className="text-xs text-primary-500 uppercase tracking-wider font-bold mb-1">Drop-off</p>
            <p className="text-white font-medium text-sm">
              {typeof ride.dropLocation === 'object' ? ride.dropLocation.address : ride.dropLocation}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-primary-800/50">
        <div className="flex items-center text-white">
          <CreditCard className="w-5 h-5 mr-2 text-primary-400 group-hover:text-accent-400 transition-colors" />
          <span className="font-bold text-lg">₹{ride.fare}</span>
        </div>
        
        {isDriver && ride.status === 'pending' && (
          <div className="flex gap-3">
            <button onClick={() => onReject(ride._id)} className="px-5 py-2 text-sm font-bold text-red-400 bg-red-900/20 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-colors">
              Reject
            </button>
            <button onClick={() => onAccept(ride._id)} className="px-5 py-2 text-sm font-bold text-primary-900 bg-gradient-to-r from-accent-400 to-accent-300 rounded-xl hover:from-accent-300 hover:to-accent-200 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-0.5">
              Accept
            </button>
          </div>
        )}
        
        {!isDriver && ride.driver && (
          <div className="text-sm bg-primary-800/60 backdrop-blur-md px-4 py-2 rounded-xl border border-primary-700/50 shadow-inner flex items-center gap-2">
            <span className="text-primary-400 font-medium">Driver:</span> 
            <span className="font-bold text-white tracking-wide">{ride.driver.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideCard;
