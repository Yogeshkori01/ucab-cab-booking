import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary-900 border-t border-primary-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ucab</h3>
            <p className="text-primary-300">Your everyday mobility app. Ride with convenience, speed, and safety.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-400 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-primary-400 hover:text-white transition">Careers</a></li>
              <li><a href="#" className="text-primary-400 hover:text-white transition">Newsroom</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-400 hover:text-white transition">Ride</a></li>
              <li><a href="#" className="text-primary-400 hover:text-white transition">Drive</a></li>
              <li><a href="#" className="text-primary-400 hover:text-white transition">Business</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-400 hover:text-white transition">Terms</a></li>
              <li><a href="#" className="text-primary-400 hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="text-primary-400 hover:text-white transition">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-800 mt-12 pt-8 text-center text-primary-400">
          <p>&copy; {new Date().getFullYear()} Ucab Technologies Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
