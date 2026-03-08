import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../services/api';
import { Mail, Lock, Car, KeyRound, AlertCircle, Shield } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('user'); // 'user' or 'driver'
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Read type from URL query param if present
    const searchParams = new URLSearchParams(location.search);
    const typeParam = searchParams.get('type');
    if (typeParam === 'driver' || typeParam === 'user') {
      setType(typeParam);
    }
  }, [location.search]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password, type });
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      if (data.role === 'admin') navigate('/admin');
      else if (data.type === 'driver') navigate('/driver');
      else navigate('/user');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
      
      <div className="max-w-md w-full relative z-10">
        {/* Glassmorphism Container */}
        <div className="bg-gray-900/60 backdrop-blur-xl py-10 px-6 sm:px-10 shadow-2xl rounded-3xl border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center transform rotate-3 shadow-sm border border-white/20">
               <KeyRound className="w-8 h-8 text-white transform -rotate-3" />
            </div>
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300 mb-8 font-medium">
            Sign in to your {type === 'driver' ? 'driver' : type === 'admin' ? 'admin' : 'rider'} account
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
            <button
              type="button"
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                type === 'admin' ? 'bg-white text-gray-900 shadow-md scale-[1.02]' : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setType('admin')}
            >
              <Shield className="w-4 h-4" /> Admin
            </button>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl bg-red-500/20 backdrop-blur-sm p-4 border border-red-500/30 flex items-start shadow-inner">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-200 font-medium">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={submitHandler}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-200 ml-1 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11 bg-black/30 focus:bg-black/50 backdrop-blur-sm shadow-inner h-12 text-white border-transparent focus:border-white/30"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-200 ml-1 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-11 bg-black/30 focus:bg-black/50 backdrop-blur-sm shadow-inner h-12 text-white border-transparent focus:border-white/30"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500 border-gray-600 bg-black/30 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-primary-400 hover:text-primary-300 transition">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-2xl shadow-lg text-sm font-bold tracking-wide transition-all duration-300 ${
                  isLoading ? 'bg-gray-600/50 text-gray-300 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary-500'
                }`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          {type !== 'admin' && (
            <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm font-medium text-gray-400">
              Don't have an account?{' '}
              <Link to={`/register?type=${type}`} className="font-bold text-primary-400 hover:text-primary-300 transition-colors ml-1">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
