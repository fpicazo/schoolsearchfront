import { useState } from 'react';
import { useRouter } from 'next/router';
import { Search } from 'lucide-react';
import { getLevels, getTypes } from '../lib/mockData';

export default function SearchForm() {
  const [filters, setFilters] = useState({
    level: '',
    type: '',
    city: ''
  });
  const router = useRouter();
  const levels = getLevels();
  const types = getTypes();

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.level) params.set('level', filters.level);
    if (filters.type) params.set('type', filters.type);
    if (filters.city) params.set('city', filters.city);
    
    router.push(`/schools${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
              <span className="text-lg">📚</span>
              Nivel Educativo
            </label>
            <select
              value={filters.level}
              onChange={(e) => setFilters({ ...filters, level: e.target.value })}
              className="w-full px-0 py-2 border-0 border-b border-gray-300 text-gray-600 placeholder-gray-400 focus:outline-none focus:border-b-2 focus:border-blue-600 bg-transparent appearance-none cursor-pointer"
            >
              <option value="">Selecciona el nivel</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
              <span className="text-lg">❤️</span>
              Tipo de Escuela
            </label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="w-full px-0 py-2 border-0 border-b border-gray-300 text-gray-600 placeholder-gray-400 focus:outline-none focus:border-b-2 focus:border-blue-600 bg-transparent appearance-none cursor-pointer"
            >
              <option value="">Selecciona el tipo</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
            <span className="text-lg">📍</span>
            Ciudad
          </label>
          <input
            type="text"
            placeholder="Usar mi ubicación"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="w-full px-0 py-2 border-0 border-b border-gray-300 text-gray-600 placeholder-gray-400 focus:outline-none focus:border-b-2 focus:border-blue-600 bg-transparent"
          />
        </div>

        <p className="text-sm text-gray-600 pt-2">
          Tip: prueba con tu colonia o municipio para mejores resultados.
        </p>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 text-base shadow-lg"
          >
            <Search className="w-5 h-5" />
            Buscar escuelas
          </button>
        </div>
      </form>
    </div>
  );
}