import Head from 'next/head';
import { useRouter } from 'next/router';
import { Star, MapPin, Trophy, ArrowLeft } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function RankingPage({ schools, rankingType, city, level, isPrivate }) {
  const router = useRouter();

  // Generate page title
  const getTitle = () => {
    if (isPrivate) {
      return `Mejores ${level}s Privadas en ${city}`;
    } else if (level) {
      return `Mejores ${level}s en ${city}`;
    } else {
      return `Mejores Escuelas en ${city}`;
    }
  };

  const getDescription = () => {
    const title = getTitle();
    return `${title}. Ranking de escuelas por calificación y opiniones. Encuentra la mejor escuela para tu hijo.`;
  };

  const getStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": getTitle(),
      "description": getDescription(),
      "url": `https://yourdomain.com${router.asPath}`,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": schools.map((school, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": school.name,
          "url": `https://yourdomain.com/school/${school.slug}`,
          "image": school.image,
          "description": school.description,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": school.rating,
            "reviewCount": school.reviews
          }
        }))
      }
    };
  };

  return (
    <>
      <Head>
        <title>{getTitle()} | Encuentra Tu Escuela</title>
        <meta name="description" content={getDescription()} />
        <meta name="keywords" content={`${getTitle()}, ranking escuelas, mejores escuelas, ${city}`} />
        <meta property="og:title" content={getTitle()} />
        <meta property="og:description" content={getDescription()} />
        <meta property="og:url" content={`https://yourdomain.com${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://yourdomain.com${router.asPath}`} />
        
        <script type="application/ld+json">
          {JSON.stringify(getStructuredData())}
        </script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
        <Header currentPage="ranking" />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 md:py-16 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-8 h-8" />
                <span className="text-sm font-semibold uppercase tracking-wide">Ranking</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{getTitle()}</h1>
              <p className="text-blue-100 text-lg max-w-2xl">
                Descubre el ranking de las mejores escuelas según calificaciones y opiniones de familias.
              </p>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-12 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Back Button */}
              <Link 
                href="/schools"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver a Buscar
              </Link>

              {/* Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
                <p className="text-gray-600">
                  Se encontraron <span className="font-bold text-blue-600">{schools.length}</span> escuelas en {city}
                  {level && ` de nivel ${level}`}
                  {isPrivate && ' (Privadas)'}
                </p>
              </div>

              {/* Schools List */}
              {schools.length > 0 ? (
                <div className="space-y-4">
                  {schools.map((school, index) => (
                    <div key={school._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden">
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          {/* Rank Badge */}
                          <div className="flex-shrink-0">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                              index === 0 ? 'bg-yellow-500' :
                              index === 1 ? 'bg-gray-400' :
                              index === 2 ? 'bg-orange-600' :
                              'bg-blue-500'
                            }`}>
                              {index + 1}
                            </div>
                          </div>

                          {/* School Info */}
                          <div className="flex-1 min-w-0">
                            <Link href={`/school/${school.slug}`}>
                              <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
                                {school.name}
                              </h3>
                            </Link>
                            <div className="flex items-center gap-2 mt-1 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{school.address}</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-2">{school.description.substring(0, 150)}...</p>
                            
                            {/* School Details */}
                            <div className="flex flex-wrap gap-4 mt-3">
                              <div>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  school.isPrivate
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-green-100 text-green-700'
                                }`}>
                                  {school.isPrivate ? 'Privada' : 'Pública'}
                                </span>
                              </div>
                              <div>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                  {school.level}
                                </span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600">Colegiatura: </span>
                                <span className="font-semibold text-gray-900">{school.tuition}</span>
                              </div>
                            </div>
                          </div>

                          {/* Rating */}
                          <div className="flex-shrink-0 text-right">
                            <div className="flex items-center gap-1 justify-end mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < Math.round(school.rating)
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{school.rating}</p>
                            <p className="text-sm text-gray-500">({school.reviews} opiniones)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <p className="text-gray-600 text-lg">No se encontraron escuelas con estos criterios.</p>
                </div>
              )}
            </div>
          </section>

          {/* Related Rankings CTA */}
          {schools.length > 0 && (
            <section className="bg-gray-50 py-12 md:py-16">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Otros Rankings</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Example related rankings */}
                  <Link href={`/ranking/mejores-escuelas/${city}`} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-100">
                    <Trophy className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">Todas las Escuelas</h3>
                    <p className="text-gray-600 text-sm">Ranking de todas las escuelas en {city}</p>
                  </Link>

                  {level && (
                    <Link href={`/ranking/mejores-primarias/${city}`} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-100">
                      <Trophy className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">Mejores Primarias</h3>
                      <p className="text-gray-600 text-sm">Ranking de las mejores primarias en {city}</p>
                    </Link>
                  )}

                  {isPrivate === false && (
                    <Link href={`/ranking/mejores-primarias-privadas/${city}`} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-100">
                      <Trophy className="w-8 h-8 text-blue-600 mb-3" />
                      <h3 className="font-bold text-gray-900 mb-2">Mejores Privadas</h3>
                      <p className="text-gray-600 text-sm">Ranking de las mejores escuelas privadas</p>
                    </Link>
                  )}
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  try {
    const { ranking, city } = params;
    let query = { city: decodeURIComponent(city) };

    // Build query based on ranking type
    if (ranking.includes('primarias') && !ranking.includes('privadas')) {
      query.level = 'Primaria';
    } else if (ranking.includes('preescolar')) {
      query.level = 'Preescolar';
    } else if (ranking.includes('secundaria')) {
      query.level = 'Secundaria';
    }

    if (ranking.includes('privadas')) {
      query.isPrivate = true;
    } else if (ranking.includes('publicas')) {
      query.isPrivate = false;
    }

    // Fetch from API (or you can query MongoDB directly)
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/ranking?${queryString}`);
    
    if (!response.ok) {
      return { notFound: true };
    }

    const data = await response.json();

    return {
      props: {
        schools: data.schools,
        rankingType: ranking,
        city: decodeURIComponent(city),
        level: query.level || null,
        isPrivate: query.isPrivate !== undefined ? query.isPrivate : null,
      },
      revalidate: 3600, // Revalidate every hour
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return { notFound: true };
  }
}

export async function getStaticPaths() {
  try {
    // Get all cities from database
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/schools`);
    const schools = await response.json();
    const cities = [...new Set(schools.map(s => s.city))];

    // Generate paths for different ranking types
    const paths = [];
    const rankingTypes = [
      'mejores-escuelas',
      'mejores-preescolar',
      'mejores-primarias',
      'mejores-primarias-privadas',
      'mejores-secundaria',
    ];

    for (const city of cities) {
      for (const ranking of rankingTypes) {
        paths.push({
          params: {
            ranking,
            city: encodeURIComponent(city),
          },
        });
      }
    }

    return {
      paths,
      fallback: 'blocking', // Generate new rankings on demand
    };
  } catch (error) {
    console.error('Error generating ranking paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}