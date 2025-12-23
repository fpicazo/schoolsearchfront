import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState, useMemo } from 'react';
import { Filter, ArrowLeft, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SchoolCard from '../components/SchoolCard';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://mejoresescuelasmexico.infinitecmexico.com/api';

export default function SchoolsPage() {
  const router = useRouter();
  const { level, type, city } = router.query;
  const [schools, setSchools] = useState([]);
  const [filters, setFilters] = useState({
    cities: [],
    levels: [],
    types: ['Privada', 'Publica'],
  });
  const [loading, setLoading] = useState(true);

  // Fetch schools from backend API
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/schools`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }
        
        const data = await response.json();
        setSchools(data);

        // Extract unique cities and levels
        const cities = [...new Set(data.map(s => s.city))].sort();
        const levels = [...new Set(data.map(s => s.level))].sort();

        setFilters({
          cities,
          levels,
          types: ['Privada', 'Publica'],
        });
      } catch (error) {
        console.error('Failed to fetch schools:', error);
        setSchools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  // Filter schools based on URL query parameters
  const filteredSchools = useMemo(() => {
    return schools.filter(school => {
      if (level && school.level !== level) return false;
      if (type === 'Privada' && !school.isPrivate) return false;
      if (type === 'Publica' && school.isPrivate) return false;
      if (city && school.city !== city) return false;
      return true;
    });
  }, [schools, level, type, city]);

  const getTitle = () => {
    let title = 'Escuelas';
    if (level) title += ` de ${level}`;
    if (city) title += ` en ${city}`;
    return `${title} | Encuentra Tu Escuela`;
  };

  const getDescription = () => {
    let desc = `Encuentra ${filteredSchools.length} escuelas. `;
    if (level) desc += `${level}. `;
    if (type) desc += `${type}. `;
    if (city) desc += `En ${city}. `;
    desc += 'Compara información, programas y costos.';
    return desc;
  };

  return (
    <>
      <Head>
        <title>{getTitle()}</title>
        <meta name="description" content={getDescription()} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourdomain.com/schools" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
        <Header currentPage="schools" />

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link 
              href="/"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver al Inicio
            </Link>

            <div className="grid md:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filtros
                  </h3>

                  <div className="space-y-6">
                    {/* Level Filter */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-3">
                        Nivel Educativo
                      </label>
                      <select
                        value={level || ''}
                        onChange={(e) => {
                          const params = new URLSearchParams();
                          if (e.target.value) params.set('level', e.target.value);
                          if (type) params.set('type', type);
                          if (city) params.set('city', city);
                          router.push(`/schools${params.toString() ? '?' + params.toString() : ''}`);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Todos los niveles</option>
                        {filters.levels.map(l => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                    </div>

                    {/* Type Filter */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-3">
                        Tipo de Escuela
                      </label>
                      <select
                        value={type || ''}
                        onChange={(e) => {
                          const params = new URLSearchParams();
                          if (level) params.set('level', level);
                          if (e.target.value) params.set('type', e.target.value);
                          if (city) params.set('city', city);
                          router.push(`/schools${params.toString() ? '?' + params.toString() : ''}`);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Todos los tipos</option>
                        {filters.types.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* City Filter */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 block mb-3">
                        Ciudad
                      </label>
                      <select
                        value={city || ''}
                        onChange={(e) => {
                          const params = new URLSearchParams();
                          if (level) params.set('level', level);
                          if (type) params.set('type', type);
                          if (e.target.value) params.set('city', e.target.value);
                          router.push(`/schools${params.toString() ? '?' + params.toString() : ''}`);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Todas las ciudades</option>
                        {filters.cities.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  <button
                    onClick={() => router.push('/schools')}
                    className="w-full mt-6 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>

              {/* Schools Grid */}
              <div className="md:col-span-3">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Escuelas Disponibles
                  <span className="text-gray-500 text-lg ml-2">({filteredSchools.length})</span>
                </h2>

                {loading ? (
                  <div className="bg-white rounded-lg p-12 text-center">
                    <p className="text-gray-600 text-lg">Cargando escuelas...</p>
                  </div>
                ) : filteredSchools.length === 0 ? (
                  <div className="bg-white rounded-lg p-12 text-center">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">No se encontraron escuelas con estos filtros.</p>
                    <button
                      onClick={() => router.push('/schools')}
                      className="mt-6 text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredSchools.map(school => (
                      <SchoolCard key={school._id || school.id} school={school} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}