import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  count: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, count }) => {
  return (
    <div className="sticky top-0 z-50 bg-blue-600 dark:bg-slate-800 shadow-lg text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-center tracking-tight">
          🌍 Global Emergency Contacts
        </h1>
        <p className="text-center mb-6 text-blue-100 dark:text-slate-300 text-sm md:text-base font-medium opacity-90">
          Guía de seguridad para viajeros en {count} países
        </p>
        <div className="relative max-w-xl mx-auto group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <i className="fas fa-search text-blue-300 dark:text-slate-400 group-focus-within:text-blue-500 transition-colors"></i>
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Buscar país, código o región..."
            className="w-full pl-11 pr-10 py-3.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-400/30 dark:focus:ring-blue-500/40 transition-all placeholder-slate-400 dark:placeholder-slate-300 font-medium"
          />
           {value && (
            <button
              onClick={() => onChange('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              aria-label="Limpiar búsqueda"
            >
              <i className="fas fa-times-circle"></i>
            </button>
          )}
        </div>
        <div className="text-center mt-3 text-xs text-blue-200 dark:text-slate-400 font-medium uppercase tracking-wider">
            Mostrando {count} resultados
        </div>
      </div>
    </div>
  );
};