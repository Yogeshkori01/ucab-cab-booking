import React from 'react';

const StatsCard = ({ title, value, icon, colorClass, bgColorClass }) => {
  return (
    <div className="glass-panel group flex items-center p-6 rounded-3xl hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] border border-white/5 relative overflow-hidden">
      {/* Subtle hover glow background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className={`relative p-4 rounded-2xl ${bgColorClass} ${colorClass} mr-6 shadow-inner group-hover:scale-110 transition-transform duration-300 z-10`}>
        {icon}
      </div>
      <div className="relative z-10">
        <p className="text-sm font-bold text-primary-400 uppercase tracking-wider mb-1">
          {title}
        </p>
        <p className="text-3xl font-extrabold text-white group-hover:text-accent-gl">
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
