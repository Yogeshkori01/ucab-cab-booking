import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Car, UserCircle } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Ride', path: '/user', show: userInfo?.type === 'user' && userInfo?.role !== 'admin' },
    { name: 'Drive', path: '/driver', show: userInfo?.type === 'driver' },
    { name: 'Admin', path: '/admin', show: userInfo?.role === 'admin' },
  ];

  return (
    <nav className="bg-primary-900 border-b border-primary-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="bg-primary-200 text-primary-900 p-1.5 rounded-lg group-hover:bg-white transition-colors">
                <Car className="h-6 w-6" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">Ucab</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.filter(link => link.show).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${
                  location.pathname === link.path
                    ? 'text-white font-semibold'
                    : 'text-primary-300 hover:text-white'
                } transition px-3 py-2 rounded-md text-sm font-medium`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-4 ml-4">
              {userInfo ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-primary-100 font-medium bg-primary-800 px-3 py-1.5 rounded-full border border-primary-700">
                    <UserCircle className="w-5 h-5 text-primary-300" />
                    <span>{userInfo.name.split(' ')[0]}</span>
                  </div>
                  <button onClick={logoutHandler} className="btn-secondary text-sm px-4 py-2 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20">
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-primary-300 hover:text-white font-medium px-3 py-2 transition-colors">
                    Log in
                  </Link>
                  <Link to="/register" className="btn-primary text-sm px-5 py-2">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-400 hover:text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary-900 border-t border-primary-800 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.filter(link => link.show).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`${
                  location.pathname === link.path
                    ? 'bg-primary-800 text-white'
                    : 'text-primary-300 hover:bg-primary-800 hover:text-white'
                } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-primary-800 pt-4 pb-2 mt-4 space-y-2">
              {userInfo ? (
                <>
                  <div className="px-3 py-2 flex items-center gap-3">
                    <div className="bg-primary-800 p-2 rounded-full border border-primary-700">
                      <UserCircle className="w-6 h-6 text-primary-300" />
                    </div>
                    <div>
                      <div className="text-base font-medium text-white">{userInfo.name}</div>
                      <div className="text-sm font-medium text-primary-400">{userInfo.email}</div>
                    </div>
                  </div>
                  <div className="px-2">
                    <button
                      onClick={() => {
                        logoutHandler();
                        setIsOpen(false);
                      }}
                      className="mt-3 w-full text-center px-4 py-2 border border-primary-700 shadow-sm text-base font-medium rounded-xl text-primary-200 bg-primary-800 hover:bg-primary-700 hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-4 py-3 flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center px-4 py-3 border border-primary-700 text-base font-medium rounded-xl text-primary-200 bg-primary-800 hover:bg-primary-700 hover:text-white transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center px-4 py-3 bg-primary-200 text-primary-900 font-bold rounded-xl hover:bg-white transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
