import React from 'react';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center h-8 w-14 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
      aria-label="Toggle dark mode"
    >
      <span className="sr-only">Cambiar tema</span>
      <span
        className={`${
          isDarkMode ? 'translate-x-7' : 'translate-x-1'
        } inline-flex items-center justify-center h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300`}
      >
        {isDarkMode ? (
            <i className="fas fa-moon text-blue-600 text-xs"></i>
        ) : (
            <i className="fas fa-sun text-amber-500 text-xs"></i>
        )}
      </span>
    </button>
  );
};
