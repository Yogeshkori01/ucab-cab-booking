import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import RideCard from '../components/RideCard';
import StatsCard from '../components/StatsCard';
import { Wallet, Car, AlertCircle, CheckCircle } from 'lucide-react';

const DriverDashboard = () => {
  const [pendingRides, setPendingRides] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [driverName, setDriverName] = useState('');
  const [activeRide, setActiveRide] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || userInfo.type !== 'driver') {
      navigate('/login');
    } else {
      fetchEarnings();
      fetchPendingRides();
    }
  }, [navigate]);

  const fetchEarnings = async () => {
    try {
      const { data } = await api.get('/drivers/earnings');
      setEarnings(data.earnings);
      setDriverName(data.name);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPendingRides = async () => {
    try {
      const { data } = await api.get('/drivers/pending-rides');
      // Set active ride from server if accepted
      const accepted = data.find(ride => ride.status === 'accepted');
      if (accepted) {
         setActiveRide(accepted);
         setPendingRides([]); // Hide pending if on a ride
      } else {
         setPendingRides(data.filter(r => r.status === 'pending'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const acceptRideHandler = async (rideId) => {
    try {
      const { data } = await api.put(`/drivers/ride/${rideId}/accept`);
      setActiveRide(data);
      setPendingRides([]); // Clear pending once accepted
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept ride');
    }
  };

  const rejectRideHandler = (rideId) => {
    setPendingRides(prev => prev.filter(r => r._id !== rideId));
  };

  const updateRideStatusHandler = async (status) => {
    try {
      if (!activeRide) return;
      const { data } = await api.put(`/drivers/ride/${activeRide._id}/status`, { status });
      if (status === 'completed') {
        setActiveRide(null);
        fetchEarnings(); // Update earnings after completion
        fetchPendingRides(); // Fetch any new pending rides
      } else {
        setActiveRide(data);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div className="relative min-h-[90vh] py-8 overflow-hidden">
      {/* Ambient Animated Backgrounds */}
      <div className="absolute top-0 right-1/4 w-[35rem] h-[35rem] bg-accent-900/10 rounded-full blur-[100px] opacity-60 pointer-events-none -mt-20 animate-pulse-slow"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Info */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-primary-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
              Welcome back, <span className="text-accent-glow text-accent-400">{driverName}</span>
            </h1>
            <p className="text-lg text-primary-400">Go online to receive ride requests</p>
          </div>
          <div className="flex items-center gap-3 bg-primary-800/80 px-5 py-3 rounded-2xl border border-primary-700 shadow-inner">
             <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
             </div>
             <span className="font-bold text-accent-300 text-sm tracking-widest uppercase">Online & Ready</span>
          </div>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard 
          title="Total Earnings" 
          value={`₹${earnings}`} 
          icon={<Wallet className="w-8 h-8 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />} 
          colorClass="text-accent-400" 
          bgColorClass="bg-accent-500/10 border border-accent-500/30" 
        />
        <StatsCard 
          title="Acceptance Rate" 
          value="98%" 
          icon={<CheckCircle className="w-8 h-8" />} 
          colorClass="text-blue-400" 
          bgColorClass="bg-blue-500/10 border border-blue-500/20" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Ride Column */}
        <div className="glass-panel p-6 rounded-3xl border border-white/5 h-fit">
          <div className="flex items-center mb-6 pb-4 border-b border-primary-800/50">
            <h2 className="text-xl font-bold text-white flex items-center">
              <div className="p-2 bg-primary-800 rounded-xl mr-3 shadow-inner">
                 <Car className="w-5 h-5 text-accent-400" />
              </div>
              Current Assignment
            </h2>
          </div>
          
          {!activeRide ? (
             <div className="bg-primary-900/40 border border-primary-800 border-dashed rounded-3xl p-10 text-center text-primary-500 flex flex-col items-center shadow-inner">
               <AlertCircle className="w-12 h-12 text-primary-600 mb-4 opacity-50" />
               <p className="text-lg font-bold text-white mb-1">You are currently available</p>
               <p className="text-sm text-primary-400">Waiting for ride requests within your radius.</p>
             </div>
          ) : (
              <div className="relative">
               <RideCard ride={activeRide} isDriver={false} />
               <div className="mt-4 flex gap-4">
                 <button 
                  onClick={() => updateRideStatusHandler('completed')}
                  className="w-full bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white font-extrabold py-4 text-lg rounded-2xl transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transform hover:-translate-y-1"
                 >
                   <CheckCircle className="w-6 h-6 mr-2 drop-shadow-md" />
                   Mark Ride Completed
                 </button>
               </div>
              </div>
          )}
        </div>

        {/* Pending Requests Column */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />
            Ride Requests
            {pendingRides.length > 0 && !activeRide && (
              <span className="ml-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                {pendingRides.length} New
              </span>
            )}
          </h2>
          
          {activeRide ? (
            <div className="bg-primary-900 border border-primary-800 rounded-2xl p-8 text-center text-primary-400">
               <p>Finish your current ride to receive new requests.</p>
            </div>
          ) : pendingRides.length === 0 ? (
            <div className="bg-primary-900 border border-primary-800 rounded-2xl p-8 text-center text-primary-400">
              <p>No new requests right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendingRides.map(ride => (
                <RideCard 
                  key={ride._id} 
                  ride={ride} 
                  isDriver={true} 
                  onAccept={acceptRideHandler} 
                  onReject={rejectRideHandler} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
     </div>
    </div>
  );
};

export default DriverDashboard;
