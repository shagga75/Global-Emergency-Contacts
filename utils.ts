export const getContactIcon = (type: string): string => {
  const icons: Record<string, string> = {
    emergency: 'fas fa-exclamation-triangle',
    police: 'fas fa-shield-alt',
    ambulance: 'fas fa-ambulance',
    fire: 'fas fa-fire',
    tourist_police: 'fas fa-camera',
    tourist_help: 'fas fa-info-circle',
    tourist_info: 'fas fa-map-marked',
    coast_guard: 'fas fa-anchor',
    civil_guard: 'fas fa-user-shield',
    carabinieri: 'fas fa-user-tie',
    traffic: 'fas fa-traffic-light',
    health_service: 'fas fa-hospital',
    non_emergency: 'fas fa-phone',
    poison_control: 'fas fa-skull-crossbones',
    women_helpline: 'fas fa-female',
    civil_police: 'fas fa-user-secret',
  };

  if (type.includes('embassy')) return 'fas fa-building-flag';
  return icons[type] || 'fas fa-phone';
};

export const getContactLabel = (type: string): string => {
  const labels: Record<string, string> = {
    emergency: 'Emergencias',
    emergency_alt: 'Emergencias (Alt)',
    police: 'Policía',
    ambulance: 'Ambulancia',
    fire: 'Bomberos',
    tourist_police: 'Policía Turística',
    tourist_help: 'Ayuda al Turista',
    tourist_info: 'Info Turística',
    coast_guard: 'Guardia Costera',
    civil_guard: 'Guardia Civil',
    civil_police: 'Policía Civil',
    carabinieri: 'Carabinieri',
    traffic: 'Tráfico',
    health_service: 'Servicio Salud',
    non_emergency: 'No Emergencia',
    police_non_emergency: 'Policía (No Emerg.)',
    poison_control: 'Centro Toxicológico',
    women_helpline: 'Ayuda Mujeres',
    info: 'Información'
  };

  if (labels[type]) return labels[type];

  // Dynamic handling for embassies
  if (type.includes('embassy')) {
    const suffix = type.split('_')[1];
    const countryMap: Record<string, string> = {
      es: 'España', us: 'EE.UU.', uk: 'Reino Unido', fr: 'Francia',
      de: 'Alemania', pt: 'Portugal', it: 'Italia', cn: 'China',
      ru: 'Rusia', au: 'Australia', in: 'India', ch: 'Suiza',
      be: 'Bélgica', et: 'Etiopía', eg: 'Egipto', za: 'Sudáfrica',
      ug: 'Uganda', th: 'Tailandia', nz: 'Nueva Zelanda', sa: 'Arabia S.'
    };
    return `Embajada ${countryMap[suffix] || suffix.toUpperCase()}`;
  }

  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const getContactColor = (type: string): string => {
  if (type === 'emergency' || type === 'emergency_alt') return 'text-red-600 bg-red-50';
  if (type === 'police' || type.includes('police') || type === 'carabinieri' || type === 'civil_guard') return 'text-blue-600 bg-blue-50';
  if (type === 'ambulance' || type === 'health_service') return 'text-emerald-600 bg-emerald-50';
  if (type === 'fire') return 'text-orange-600 bg-orange-50';
  if (type.includes('embassy')) return 'text-indigo-600 bg-indigo-50';
  if (type.includes('tourist')) return 'text-amber-600 bg-amber-50';
  return 'text-slate-600 bg-slate-100';
};