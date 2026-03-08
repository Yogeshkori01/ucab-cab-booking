import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useLocation } from 'react-router-dom';
import RideCard from '../components/RideCard';
import BookingFormDashboard from '../components/BookingFormDashboard';
import { User, Mail, Map, Clock } from 'lucide-react';

const UserDashboard = () => {
  const [rides, setRides] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user || user.type !== 'user') {
      navigate('/login');
    } else {
      setUserInfo(user);
      fetchRides();
    }
  }, [navigate]);

  const fetchRides = async () => {
    try {
      const { data } = await api.get('/rides/my-rides');
      // Sort by newest first
      setRides(data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error(err);
    }
  };

  const cancelRideHandler = async (id) => {
    try {
      if(window.confirm('Are you sure you want to cancel this ride?')){
        await api.put(`/rides/${id}/cancel`);
        fetchRides();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const activeRides = rides.filter(r => r.status === 'pending' || r.status === 'accepted');
  const pastRides = rides.filter(r => r.status === 'completed' || r.status === 'cancelled');

  return (
    <div className="relative min-h-[90vh] py-8 overflow-hidden">
      {/* Ambient Animated Backgrounds */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent-900/10 rounded-full blur-[100px] opacity-60 pointer-events-none -mt-20 -mr-20 animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-accent-800/10 rounded-full blur-[100px] opacity-60 pointer-events-none -mb-20 -ml-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Info */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
            My <span className="text-accent-glow text-accent-400">Dashboard</span>
          </h1>
          <p className="text-lg text-primary-400">Manage your rides and account information</p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (User Info & Booking) */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 h-fit">
          
          {/* User Info Card */}
          {userInfo && (
            <div className="glass-panel p-6 rounded-3xl group hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] transition-shadow duration-500 border border-white/5">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-600 to-accent-800 text-white rounded-full flex items-center justify-center text-2xl font-extrabold shadow-[0_0_15px_rgba(6,182,212,0.5)] border border-accent-400/50 group-hover:scale-105 transition-transform duration-300">
                  {userInfo.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-wide">{userInfo.name}</h2>
                  <div className="flex items-center text-sm text-primary-400 mt-1 font-medium bg-primary-900/50 px-3 py-1 rounded-full border border-primary-800">
                    <Mail className="w-4 h-4 mr-2 text-accent-500" />
                    {userInfo.email}
                  </div>
                </div>
              </div>
              <div className="border-t border-primary-800/50 pt-5 mt-2 grid grid-cols-2 gap-4">
                <div className="bg-primary-900/40 rounded-2xl p-4 border border-primary-800 text-center">
                  <p className="text-xs text-primary-500 uppercase font-bold tracking-wider mb-1">Total Rides</p>
                  <p className="text-3xl font-extrabold text-white">{rides.length}</p>
                </div>
                <div className="bg-primary-900/40 rounded-2xl p-4 border border-primary-800 text-center flex flex-col justify-center items-center">
                  <p className="text-xs text-primary-500 uppercase font-bold tracking-wider mb-2">Status</p>
                  <div className="flex items-center">
                     <span className="w-2 h-2 rounded-full bg-accent-400 mr-2 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                     <span className="text-sm font-bold text-accent-300">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Booking Form Card */}
          <BookingFormDashboard onBookSuccess={fetchRides} initialState={location.state} />

        </div>
        
        {/* Right Column (Rides) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Rides */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Map className="w-5 h-5 mr-2 text-primary-400" />
                Active Rides
              </h2>
              {activeRides.length > 0 && (
                <span className="bg-primary-800 text-primary-200 border border-primary-700 text-xs font-bold px-2.5 py-1 rounded-full">{activeRides.length}</span>
              )}
            </div>
            
            {activeRides.length === 0 ? (
              <div className="bg-primary-900/40 border border-primary-800 border-dashed rounded-3xl p-12 text-center text-primary-500 shadow-inner">
                <Map className="w-12 h-12 mx-auto mb-4 opacity-50 text-accent-500" />
                <p className="text-lg">You have no ongoing rides at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeRides.map(ride => (
                  <div key={ride._id} className="relative group">
                    <RideCard ride={ride} isDriver={false} />
                    {ride.status === 'pending' && (
                      <button 
                        onClick={() => cancelRideHandler(ride._id)}
                        className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity bg-primary-800 border border-red-500/30 text-red-400 text-xs font-bold px-3 py-1 rounded-lg hover:bg-red-500/10 shadow-sm"
                      >
                        Cancel Ride
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Rides */}
          <div className="glass-panel p-6 rounded-3xl border border-white/5">
            <div className="flex items-center mb-6 pb-4 border-b border-primary-800/50">
              <h2 className="text-xl font-bold text-white flex items-center">
                <div className="p-2 bg-primary-800 rounded-xl mr-3 shadow-inner">
                   <Clock className="w-5 h-5 text-primary-400" />
                </div>
                Recent History
              </h2>
            </div>
            
            {pastRides.length === 0 ? (
              <div className="bg-primary-900/40 border border-primary-800 border-dashed rounded-2xl p-10 text-center text-primary-500 shadow-inner">
                <Clock className="w-10 h-10 mx-auto mb-3 opacity-50" />
                You haven't taken any rides yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {pastRides.slice(0, 5).map(ride => (
                  <RideCard key={ride._id} ride={ride} isDriver={false} />
                ))}
                {pastRides.length > 5 && (
                  <div className="text-center mt-4">
                    <button className="text-primary-400 font-medium hover:text-white text-sm transition-colors">
                      View all history
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          
        </div>
      </div>
     </div>
    </div>
  );
};

export default UserDashboard;
