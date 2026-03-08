import React from 'react';
import { Car, User } from 'lucide-react';

const CabTypeCard = ({ type, name, description, priceMultiplier, baseFare, selectedType, onSelect }) => {
  const isSelected = selectedType === type;
  const estimatedPrice = Math.round(baseFare * priceMultiplier);

  return (
    <div 
      onClick={() => onSelect(type)}
      className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-primary-500 bg-primary-800 shadow-md transform -translate-y-1' 
          : 'border-primary-700 bg-primary-900 hover:border-primary-500 hover:shadow-sm'
      }`}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary-500 text-white p-1 rounded-full shadow-md">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-2">
        <div className={`p-3 rounded-full ${isSelected ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-800 text-primary-400'}`}>
          <Car className="w-8 h-8" />
        </div>
        <div className="text-right">
          <p className="text-sm text-primary-400">Est. Fare</p>
          <p className="font-bold text-lg text-white">₹{estimatedPrice}</p>
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-white flex items-center">
          {name}
          <span className="ml-2 flex items-center text-xs text-primary-500 font-normal">
            <User className="w-3 h-3 mr-0.5" />
            {type === 'mini' ? '4' : type === 'sedan' ? '4' : '6'}
          </span>
        </h4>
        <p className="text-xs text-primary-400 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default CabTypeCard;
