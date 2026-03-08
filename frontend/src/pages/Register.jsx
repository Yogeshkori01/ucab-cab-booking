import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../services/api';
import { User, Mail, Lock, Car, Hash, Shield, AlertCircle } from 'lucide-react';

const Register = () => {
  const [type, setType] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [cabType, setCabType] = useState('Mini');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('type') === 'driver') {
      setType('driver');
    }
  }, [location]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const endpoint = type === 'driver' ? '/auth/register-driver' : '/auth/register-user';
      const payload = type === 'driver' 
        ? { name, email, password, plateNumber, cabType }
        : { name, email, password };
        
      const { data } = await api.post(endpoint, payload);
      localStorage.setItem('userInfo', JSON.stringify(data));

      if (data.type === 'driver') navigate('/driver');
      else navigate('/user');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop"
          alt="Driver navigating in car"
        />
        <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
      </div>
      
      <div className="max-w-md w-full relative z-10 w-full">
        {/* Glassmorphism Container */}
        <div className="bg-gray-900/60 backdrop-blur-xl py-10 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center transform -rotate-3 shadow-sm border border-white/20">
               <Shield className="w-8 h-8 text-white transform rotate-3" />
            </div>
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300 mb-8 font-medium">
            Join Ucab as a {type === 'driver' ? 'Driver Partner' : 'Rider'}
          </p>
          
          {/* Type Toggle */}
          <div className="flex p-1.5 bg-black/40 backdrop-blur-md rounded-2xl mb-8">
            <button
              type="button"
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                type === 'user' ? 'bg-white text-gray-900 shadow-md scale-[1.02]' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setType('user')}
            >
              Rider
            </button>
            <button
              type="button"
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                type === 'driver' ? 'bg-white text-gray-900 shadow-md scale-[1.02]' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setType('driver')}
            >
              <Car className="w-4 h-4" /> Driver
            </button>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl bg-red-500/20 backdrop-blur-sm p-4 border border-red-500/30 flex items-start shadow-inner">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-200 font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={submitHandler}>
            <div>
              <label className="block text-sm font-semibold text-gray-200 ml-1 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field pl-11 bg-black/30 focus:bg-black/50 backdrop-blur-sm shadow-inner h-12 text-white border-transparent focus:border-white/30"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 ml-1 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11 bg-black/30 focus:bg-black/50 backdrop-blur-sm shadow-inner h-12 text-white border-transparent focus:border-white/30"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 ml-1 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-11 bg-black/30 focus:bg-black/50 backdrop-blur-sm shadow-inner h-12 text-white border-transparent focus:border-white/30"
                  placeholder="••••••••"
                  minLength="6"
                />
              </div>
            </div>
            
            {type === 'driver' && (
              <div className="pt-2 border-t border-white/10 space-y-4 animate-fade-in mt-1">
                <div>
                  <label className="block text-sm font-semibold text-gray-200 ml-1 mb-1.5">
                    Vehicle Plate Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Hash className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value)}
                      className="input-field pl-11 uppercase bg-black/30 focus:bg-black/50 backdrop-blur-sm shadow-inner h-12 text-white border-transparent focus:border-white/30"
                      placeholder="ABC 1234"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-200 ml-1 mb-1.5">
                    Vehicle Class
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Car className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      className="input-field pl-11 appearance-none bg-black/30 focus:bg-black/50 backdrop-blur-sm shadow-inner h-12 text-white border-transparent focus:border-white/30"
                      value={cabType}
                      onChange={(e) => setCabType(e.target.value)}
                    >
                      <option value="Mini" className="bg-gray-900 text-white">Mini (4 seats)</option>
                      <option value="Sedan" className="bg-gray-900 text-white">Sedan (4 seats, more comfort)</option>
                      <option value="SUV" className="bg-gray-900 text-white">SUV (6 seats)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-bold tracking-wide transition-all duration-300 ${
                  isLoading ? 'bg-gray-600/50 text-gray-300 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-500'
                }`}
              >
                {isLoading ? 'Creating account...' : `Sign up as ${type === 'driver' ? 'Driver' : 'Rider'}`}
              </button>
            </div>
          </form>

          {type !== 'admin' && (
            <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm font-medium text-gray-400">
              Already have an account?{' '}
              <Link to={`/login?type=${type}`} className="font-bold text-primary-400 hover:text-primary-300 transition-colors ml-1">
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
