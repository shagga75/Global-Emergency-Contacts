import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Country, GroupedCountries } from './types';
import { SearchBar } from './components/SearchBar';
import { CountryCard } from './components/CountryCard';
import { ThemeToggle } from './components/ThemeToggle';

const App: React.FC = () => {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
  const [dataSource, setDataSource] = useState<'api' | 'local' | null>(null);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  const fetchCountries = useCallback(async () => {
    setStatus('loading');
    
    // Usamos una ruta relativa para que funcione en Vercel y Local
    // Intento 1: Conectar con el Backend (API)
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      // Cambiado de localhost:3001 a ruta relativa /api/countries
      const response = await fetch('/api/countries', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setAllCountries(data);
        setDataSource('api');
        setStatus('success');
        return;
      }
    } catch (apiError) {
      console.warn("API no disponible, intentando carga local directa.");
    }

    // Intento 2: Fallback directo al JSON (por si acaso el servidor falla pero el archivo está ahí)
    try {
      const response = await fetch('/countries.json');
      if (!response.ok) {
        throw new Error(`Fallback local falló: ${response.statusText}`);
      }
      const data = await response.json();
      setAllCountries(data);
      setDataSource('local');
      setStatus('success');
    } catch (error) {
      console.error("Error crítico de carga:", error);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCountries = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return allCountries;

    return allCountries.filter((country) =>
      country.name.toLowerCase().includes(query) ||
      country.code.toLowerCase().includes(query) ||
      country.region.toLowerCase().includes(query)
    );
  }, [searchQuery, allCountries]);

  const groupedCountries: GroupedCountries = useMemo(() => {
    if (status !== 'success') return {};
    const groups: GroupedCountries = {};
    filteredCountries.forEach((country) => {
      if (!groups[country.region]) {
        groups[country.region] = [];
      }
      groups[country.region].push(country);
    });
    return groups;
  }, [filteredCountries, status]);

  const sortedRegions = Object.keys(groupedCountries).sort();

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <div className="text-center py-20 px-4 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium">Cargando directorio global...</p>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div className="text-center py-20 px-4">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm inline-block max-w-md mx-auto">
                <div className="text-6xl mb-4 text-red-500">
                    <i className="fas fa-database"></i>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Error de Datos</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  No pudimos cargar los números de emergencia.
                </p>
                <button 
                    onClick={fetchCountries}
                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium flex items-center mx-auto"
                >
                    <i className="fas fa-sync-alt mr-2"></i>
                    Reintentar
                </button>
            </div>
        </div>
      );
    }
    
    if (filteredCountries.length === 0) {
        return (
            <div className="text-center py-20 px-4">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm inline-block max-w-md mx-auto">
                    <div className="text-6xl mb-4">🗺️</div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Sin resultados</h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      No encontramos nada para "{searchQuery}".
                    </p>
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
                    >
                        Ver todos
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {sortedRegions.map((region) => (
              <section key={region} className="relative">
                <div className="sticky top-[160px] md:top-[164px] z-40 py-3 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 mb-6">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400">
                        {region}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-bold">
                        {groupedCountries[region].length}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedCountries[region]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((country) => (
                      <CountryCard key={country.code} country={country} />
                    ))}
                </div>
              </section>
            ))}
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery} 
        count={filteredCountries.length} 
      />

      <main className="flex-grow max-w-7xl mx-auto p-4 md:p-6 w-full">
        {renderContent()}
      </main>

      <footer className="bg-white dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="mb-6">
                <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
            </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            <i className="fas fa-exclamation-circle text-amber-500 mr-2"></i>
            Información orientativa. Verifica siempre los números locales al llegar a tu destino.
          </p>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-4">
            &copy; {new Date().getFullYear()} Global Emergency Contacts.
          </p>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 hover:-translate-y-1 transition-all z-50 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Volver arriba"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
};

export default App;
