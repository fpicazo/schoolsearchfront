import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { ArrowLeft, MapPin, Star, Phone, Mail, Globe, Map } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { getSchoolBySlug, getAllSchools } from '../../lib/api';
import Link from 'next/link';

// Dynamically import SchoolMap with ssr: false (client-only)
const SchoolMap = dynamic(() => import('../../components/SchoolMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
      <p className="text-gray-500">Cargando mapa...</p>
    </div>
  ),
});

export default function SchoolDetail({ school }) {
  const router = useRouter();

  if (!school) {
    return (
      <>
        <Head>
          <title>Escuela no encontrada | Encuentra Tu Escuela</title>
        </Head>
        <Header currentPage="schools" />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Escuela no encontrada</p>
        </div>
        <Footer />
      </>
    );
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://yourdomain.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Escuelas",
        "item": "https://yourdomain.com/schools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": school.name,
        "item": `https://yourdomain.com/school/${school.slug}`
      }
    ]
  };

  // Educational Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": school.name,
    "description": school.description,
    "image": school.image,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": school.address,
      "addressLocality": school.city,
      "addressCountry": "MX"
    },
    "telephone": school.phone,
    "email": school.email,
    "url": `https://yourdomain.com/school/${school.slug}`,
    "foundingDate": school.founded.toString(),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": school.rating,
      "reviewCount": school.reviews
    }
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{`${school.name} en ${school.city} | Encuentra Tu Escuela`}</title>
        <meta name="description" content={school.description.substring(0, 160)} />
        <meta name="keywords" content={`${school.name}, ${school.city}, ${school.level}, escuela`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://yourdomain.com/school/${school.slug}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://yourdomain.com/school/${school.slug}`} />
        <meta property="og:title" content={school.name} />
        <meta property="og:description" content={school.description.substring(0, 160)} />
        <meta property="og:image" content={school.image} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://yourdomain.com/school/${school.slug}`} />
        <meta name="twitter:title" content={school.name} />
        <meta name="twitter:description" content={school.description.substring(0, 160)} />
        <meta name="twitter:image" content={school.image} />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        
        {/* JSON-LD Schemas */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>

        {/* Leaflet CSS */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
        <Header currentPage="schools" />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a Resultados
            </button>

            {/* Breadcrumbs */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link 
                    href="/"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Inicio
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link 
                    href="/schools"
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Escuelas
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-700 font-medium">{school.name}</li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Left - School Info */}
              <div className="md:col-span-2 space-y-6">
                {/* Hero Image */}
                <div className="w-full h-96 bg-gray-300 rounded-lg overflow-hidden">
                  <img 
                    src={school.image} 
                    alt={`Instalaciones de ${school.name} en ${school.city}`}
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Basic Info */}
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{school.name}</h1>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-5 h-5 text-gray-500" />
                        <p className="text-gray-600">{school.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-4 py-2 rounded-full">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-gray-900">{school.rating}</span>
                      <span className="text-sm text-gray-600">({school.reviews})</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{school.description}</p>
                  <div className="mt-4 flex gap-2">
                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                      {school.level}
                    </span>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      school.isPrivate
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {school.isPrivate ? 'Privada' : 'Pública'}
                    </span>
                  </div>
                </div>

                {/* Key Info Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="font-semibold text-gray-900 mb-2">Colegiatura</h2>
                    <p className="text-2xl font-bold text-gray-900">{school.tuition}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="font-semibold text-gray-900 mb-2">Capacidad</h2>
                    <p className="text-2xl font-bold text-gray-900">{school.capacity}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="font-semibold text-gray-900 mb-2">Horario</h2>
                    <p className="text-gray-700 font-semibold">{school.hours}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="font-semibold text-gray-900 mb-2">Fundación</h2>
                    <p className="text-2xl font-bold text-gray-900">{school.founded}</p>
                  </div>
                </div>

                {/* Programs */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Programas Académicos</h2>
                  <div className="flex flex-wrap gap-2">
                    {school.programs && school.programs.map(program => (
                      <span key={program} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        {program}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Instalaciones</h2>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {school.facilities && school.facilities.map(facility => (
                      <li key={facility} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        <span className="text-gray-700">{facility}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Teléfono</p>
                        <a href={`tel:${school.phone}`} className="font-semibold text-gray-900 hover:text-blue-600">
                          {school.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <a href={`mailto:${school.email}`} className="font-semibold text-gray-900 hover:text-blue-600">
                          {school.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Sitio Web</p>
                        <a href={`https://${school.website}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-700">
                          {school.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Section - Moved to End */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Map className="w-5 h-5 text-blue-600" />
                    Ubicación en Mapa
                  </h2>
                  <SchoolMap school={school} />
                  <p className="text-sm text-gray-500 mt-3">
                    📍 {school.address}, {school.city}
                  </p>
                </div>
              </div>

              {/* Right - Contact Form */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Solicita Información</h2>
                  <p className="text-gray-600 text-sm mb-6">Completa el formulario</p>

                  <form className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Tu nombre" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input 
                      type="email" 
                      placeholder="tu@email.com" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input 
                      type="tel" 
                      placeholder="55-1234-5678" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Nombre del estudiante" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea 
                      placeholder="Tu pregunta..." 
                      rows={3} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <button 
                      type="submit" 
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  try {
    const school = await getSchoolBySlug(params.slug);
    
    if (!school) {
      return { notFound: true };
    }

    return {
      props: { school },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching school:', error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    const schools = await getAllSchools();

    const paths = schools.map(school => ({
      params: { slug: school.slug },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}