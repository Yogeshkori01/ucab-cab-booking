import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { Users, Car, Map, TrendingUp, AlertCircle, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [rides, setRides] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [uRes, dRes, rRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/drivers'),
        api.get('/admin/rides')
      ]);
      setUsers(uRes.data);
      setDrivers(dRes.data);
      setRides(rRes.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error('Error fetching admin data', err);
    }
  };

  const completedRides = rides.filter(r => r.status === 'completed');
  const totalRevenue = completedRides.reduce((acc, ride) => acc + ride.fare, 0);

  return (
    <div className="relative min-h-[90vh] py-8 overflow-hidden">
      {/* Ambient Animated Backgrounds */}
      <div className="absolute top-0 right-1/4 w-[35rem] h-[35rem] bg-accent-900/10 rounded-full blur-[100px] opacity-60 pointer-events-none -mt-20 animate-pulse-slow"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Info */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-primary-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
              Admin <span className="text-accent-glow text-accent-400">Overview</span>
            </h1>
            <p className="text-lg text-primary-400">Monitor system performance and metrics</p>
          </div>
        </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard 
          title="Total Users" 
          value={users.length} 
          icon={<Users className="w-8 h-8" />} 
          colorClass="text-blue-400" 
          bgColorClass="bg-blue-500/10 border border-blue-500/20" 
        />
        <StatsCard 
          title="Total Drivers" 
          value={drivers.length} 
          icon={<Car className="w-8 h-8" />} 
          colorClass="text-purple-400" 
          bgColorClass="bg-purple-500/10 border border-purple-500/20" 
        />
        <StatsCard 
          title="Total Rides" 
          value={rides.length} 
          icon={<Map className="w-8 h-8" />} 
          colorClass="text-green-400" 
          bgColorClass="bg-green-500/10 border border-green-500/20" 
        />
        <StatsCard 
          title="Platform Revenue" 
          value={`₹${(totalRevenue * 0.2).toFixed(0)}`} 
          icon={<TrendingUp className="w-8 h-8" />} 
          colorClass="text-yellow-400" 
          bgColorClass="bg-yellow-500/10 border border-yellow-500/20" 
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Recent Rides Table */}
        <div className="glass-panel w-full rounded-3xl border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-primary-800/50 bg-primary-900/20">
            <h2 className="text-xl font-bold text-white flex items-center">
              <div className="p-2 bg-primary-800 rounded-xl mr-3 shadow-inner">
                 <Clock className="w-5 h-5 text-accent-400" />
              </div>
              Recent System Activity
            </h2>
            <button className="text-sm font-bold text-accent-400 hover:text-accent-300 transition-colors bg-accent-900/20 px-4 py-2 rounded-xl border border-accent-800">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary-900/40">
                  <th className="py-4 px-6 text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-primary-800/50">Ride ID</th>
                  <th className="py-4 px-6 text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-primary-800/50">Rider</th>
                  <th className="py-4 px-6 text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-primary-800/50">Driver</th>
                  <th className="py-4 px-6 text-xs font-bold text-primary-400 uppercase tracking-wider border-b border-primary-800/50">Status</th>
                  <th className="py-4 px-6 text-xs font-bold text-primary-400 uppercase tracking-wider text-right border-b border-primary-800/50">Fare</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-800/50">
                {rides.slice(0, 10).map((ride) => (
                  <tr key={ride._id} className="hover:bg-primary-800/30 transition-colors group">
                    <td className="py-4 px-6 text-sm text-primary-400 font-mono group-hover:text-accent-300 transition-colors">{ride._id.substring(0,8)}...</td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-white">{ride.user?.name || 'N/A'}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-white">{ride.driver?.name || 'Unassigned'}</div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${ride.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                          ride.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                          ride.status === 'accepted' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                          'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                        {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-right font-bold text-white group-hover:text-accent-400 transition-colors">₹{ride.fare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {rides.length === 0 && (
              <div className="text-center py-16 text-primary-500 flex flex-col items-center">
                 <AlertCircle className="w-12 h-12 text-primary-700 mb-4 opacity-50" />
                 <p className="text-lg">No rides have been requested yet in the system.</p>
              </div>
            )}
          </div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default AdminDashboard;
