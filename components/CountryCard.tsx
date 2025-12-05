import React, { useState } from 'react';
import { Country } from '../types';
import { getContactIcon, getContactLabel, getContactColor } from '../utils';

interface CountryCardProps {
  country: Country;
}

const ContactItem: React.FC<{ type: string; number: string }> = ({ type, number }) => {
  const [copied, setCopied] = useState(false);
  const icon = getContactIcon(type);
  const label = getContactLabel(type);
  const colorClass = getContactColor(type);

  const handleCopy = () => {
    navigator.clipboard.writeText(number).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group/item border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
      <a href={`tel:${number}`} className="flex items-center space-x-3 flex-grow">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass} bg-opacity-20 flex-shrink-0`}>
          <i className={`${icon} text-sm`}></i>
        </div>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300 group-hover/item:text-slate-900 dark:group-hover/item:text-white">
          {label}
        </span>
      </a>
      <div className="flex items-center space-x-2 ml-2">
        <span className="text-blue-600 dark:text-blue-400 font-mono text-sm font-bold group-hover/item:underline decoration-blue-300 underline-offset-4">
          {number}
        </span>
        <button onClick={handleCopy} title="Copiar número" className="w-8 h-8 rounded-md flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-600 hover:text-slate-600 dark:hover:text-white transition-all">
          <i className={`fas ${copied ? 'fa-check text-emerald-500' : 'fa-copy'}`}></i>
        </button>
      </div>
    </div>
  );
};

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl dark:hover:shadow-blue-900/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <div className="p-5">
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-4xl drop-shadow-sm">{country.flag}</span>
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {country.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
              {country.code} • {country.region}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {Object.entries(country.contacts).map(([type, number]) => (
            <ContactItem key={type} type={type} number={number} />
          ))}
        </div>
      </div>
      
      <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
         <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 tracking-wide">
          <i className="fas fa-check-circle mr-1.5"></i> Verificado
        </span>
        <button 
           onClick={() => navigator.share ? navigator.share({title: `Emergency contacts for ${country.name}`, text: `Emergency numbers for ${country.name}`}) : null}
           className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
           title="Compartir"
        >
            <i className="fas fa-share-alt"></i>
        </button>
      </div>
    </div>
  );
};