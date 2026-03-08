import React from 'react';
import BookingForm from '../components/BookingForm';
import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, CreditCard, ChevronRight, Car } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#121214]">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/30 rounded-full blur-[100px] animate-pulse-slow z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent-400/20 rounded-full blur-[120px] animate-pulse-slow z-0" style={{ animationDelay: '2s' }}></div>
        
        {/* Placeholder Map Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10 w-full animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-900/30 border border-accent-800 text-xs font-semibold text-accent-300 mb-8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-400"></span>
                </span>
                The Smartest Mobility Network
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
                Go anywhere with <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-400 to-accent-200 block mt-2">Ucab.</span>
              </h1>
              <p className="text-xl text-primary-400 mb-10 leading-relaxed">
                Request a ride, hop in, and go. The intelligent way to get around the city with reliable drivers and comfortable cars.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                 <Link to="/register?type=driver" className="group inline-flex items-center justify-center px-8 py-4 border border-transparent shadow-[0_0_20px_rgba(6,182,212,0.3)] text-base font-bold rounded-2xl text-white bg-accent-600 hover:bg-accent-500 backdrop-blur-md focus:outline-none transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(6,182,212,0.5)]">
                  Sign up to drive
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="relative lg:ml-auto w-full max-w-md mx-auto lg:mx-0">
               {/* Decorative floating elements around form */}
               <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent-900/40 border border-accent-800 rounded-3xl backdrop-blur-xl opacity-80 animate-float shadow-xl z-20 flex items-center justify-center rotate-12">
                 <Car className="w-10 h-10 text-accent-400 opacity-80" />
               </div>
               <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-accent-900/40 border border-accent-800 rounded-2xl backdrop-blur-xl opacity-80 animate-float shadow-xl z-20 flex items-center justify-center -rotate-12" style={{ animationDelay: '1.5s' }}>
                 <Clock className="w-6 h-6 text-accent-300 opacity-80" />
               </div>
               
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative border-y border-white/5 bg-[#18181b] overflow-hidden">
        {/* Subtle mesh gradient background */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-500/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Why choose Ucab?</h2>
            <p className="text-lg text-primary-400">Experience a mobility platform designed for safety, reliability, and absolute comfort.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl glass-card hover:bg-primary-900/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] border border-accent-900/50 hover:border-accent-500/50 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-900/80 to-primary-900 flex items-center justify-center mb-8 border border-accent-500/20 shadow-inner group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:border-accent-400">
                <Clock className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Fast & Reliable</h3>
              <p className="text-primary-400 leading-relaxed text-lg">Get a ride in minutes. Our advanced routing algorithm ensures you always take the most efficient path to your destination.</p>
            </div>
            
            <div className="group p-8 rounded-3xl glass-card hover:bg-primary-900/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] border border-accent-900/50 hover:border-accent-500/50 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-900/80 to-primary-900 flex items-center justify-center mb-8 border border-accent-500/20 shadow-inner group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:border-accent-400">
                <ShieldCheck className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Safety First</h3>
              <p className="text-primary-400 leading-relaxed text-lg">All drivers pass rigid background checks. Track your journey in real-time and share your trip status securely with loved ones.</p>
            </div>
            
            <div className="group p-8 rounded-3xl glass-card hover:bg-primary-900/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)] border border-accent-900/50 hover:border-accent-500/50 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-900/80 to-primary-900 flex items-center justify-center mb-8 border border-accent-500/20 shadow-inner group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:border-accent-400">
                <CreditCard className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Transparent Pricing</h3>
              <p className="text-primary-400 leading-relaxed text-lg">Know exactly what you'll pay before you confirm your booking. Zero hidden fees, no unexpected surge surprises during the ride.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-[#121214] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent-500/10 rounded-full blur-[120px] opacity-70 pointer-events-none -mt-40 -mr-40 animate-pulse-slow"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* Premium Abstract App Mockup */}
              <div className="relative mx-auto w-full max-w-[320px] lg:max-w-[360px] animate-float">
                 <div className="absolute inset-0 bg-accent-600 blur-[80px] opacity-20 rounded-full"></div>
                 <div className="aspect-[9/19] bg-[#09090b] rounded-[40px] p-4 border-[8px] border-primary-800/80 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden ring-1 ring-white/10">
                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-30">
                      <div className="w-24 h-6 bg-primary-800/80 rounded-b-2xl backdrop-blur-md"></div>
                    </div>
                    {/* Screen Content */}
                    <div className="w-full h-full bg-[#18181b] rounded-[24px] relative overflow-hidden">
                      {/* Map Background */}
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#52525b 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                      {/* Route Line Element */}
                      <svg className="absolute inset-0 w-full h-full opacity-50 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" viewBox="0 0 100 200" preserveAspectRatio="none">
                         <path d="M 20,180 C 40,120 80,80 50,20" stroke="#06b6d4" strokeWidth="3" fill="none" strokeDasharray="6 6" className="animate-pulse" />
                      </svg>
                      {/* Floating UI Elements inside App */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce flex flex-col items-center">
                        <div className="bg-accent-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)] mb-2">3 min</div>
                        <div className="w-12 h-12 bg-primary-800 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center border-2 border-[#18181b] ring-2 ring-accent-500">
                          <Car className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-6 inset-x-4 bg-primary-900/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/10">
                        <div className="flex items-center gap-4 mb-4">
                           <div className="w-12 h-12 rounded-full bg-accent-500/20 border border-accent-500/30 animate-pulse flex items-center justify-center"><div className="w-6 h-6 rounded-full bg-accent-500"></div></div>
                           <div className="space-y-2 flex-1">
                              <div className="h-4 bg-primary-600 rounded-lg w-2/3 animate-pulse"></div>
                              <div className="h-3 bg-primary-800 rounded-lg w-1/2 animate-pulse"></div>
                           </div>
                        </div>
                        <div className="w-full h-12 bg-white rounded-xl shadow-inner flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                           <div className="h-2 w-1/3 bg-accent-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 lg:pl-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Seamless from start to finish</h2>
              <p className="text-xl text-primary-400 mb-12">Experiencing Ucab is intuitively simple. Just effortless mobility at your fingertips.</p>
              
              <div className="space-y-10">
                <div className="flex group">
                  <div className="flex-shrink-0 mr-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-900/30 backdrop-blur-sm border border-accent-800/50 text-accent-400 font-bold text-xl group-hover:bg-accent-500 group-hover:text-white group-hover:border-accent-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300">1</div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-400 group-hover:to-accent-200 transition-colors">Request</h4>
                    <p className="text-lg text-primary-400 group-hover:text-primary-300 transition-colors">Open the app, enter your destination, and choose the ride category that suits your style and budget.</p>
                  </div>
                </div>
                
                <div className="flex group">
                  <div className="flex-shrink-0 mr-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-900/30 backdrop-blur-sm border border-accent-800/50 text-accent-400 font-bold text-xl group-hover:bg-accent-500 group-hover:text-white group-hover:border-accent-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300">2</div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-400 group-hover:to-accent-200 transition-colors">Track</h4>
                    <p className="text-lg text-primary-400 group-hover:text-primary-300 transition-colors">Watch your driver approach on the live map. You'll receive vehicle details and driver status for total peace of mind.</p>
                  </div>
                </div>
                
                <div className="flex group">
                  <div className="flex-shrink-0 mr-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-accent-900/30 backdrop-blur-sm border border-accent-800/50 text-accent-400 font-bold text-xl group-hover:bg-accent-500 group-hover:text-white group-hover:border-accent-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300">3</div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-400 group-hover:to-accent-200 transition-colors">Ride & Rate</h4>
                    <p className="text-lg text-primary-400 group-hover:text-primary-300 transition-colors">Enjoy the comfortable journey. Payments are processed seamlessly, leaving you to simply rate your experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
