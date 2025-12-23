import Head from 'next/head';
import { useRouter } from 'next/router';
import { Search, Globe, Heart } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import SearchForm from '../components/SearchForm';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Encuentra Tu Escuela - Directorio de Escuelas en México</title>
        <meta name="description" content="Busca, compara y encuentra la mejor escuela para tu hijo. Información completa, programas educativos y costos." />
        <meta name="keywords" content="escuelas, colegios, educación, directorio escuelas, primaria, preescolar" />
        <meta property="og:title" content="Encuentra Tu Escuela - Directorio de Escuelas" />
        <meta property="og:description" content="Busca, compara y encuentra la mejor escuela para tu hijo." />
        <meta property="og:image" content="/heroimage.png" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://yourdomain.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
        <Header currentPage="home" />

        <main className="flex-1">
          {/* Hero Section with Form */}
          <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
                {/* Left Content */}
                <div>
                  <div className="inline-block bg-blue-100 px-4 py-2 rounded-full mb-4">
                    <p className="text-blue-700 text-sm font-semibold">Comparte, compara y decide mejor</p>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                    Encuentra la mejor escuela <span className="text-blue-600">para tu hijo</span>
                  </h1>
                  <p className="text-gray-600 text-base mb-6">
                    Busca y compara escuelas en tu ciudad. Revisa información clave, programas educativos y elige con confianza.
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 text-xs">✓</span>
                      </div>
                      <span>Búsqueda simple y rápida</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 text-xs">✓</span>
                      </div>
                      <span>Información completa de cada escuela</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 text-xs">✓</span>
                      </div>
                      <span>Contacto directo con instituciones</span>
                    </div>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative">
                  <img
                    src="/heroimage.png"
                    alt="Familia buscando escuela"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg p-4 max-w-xs">
                    <p className="text-sm text-gray-600 mb-2">Miles de familias encontraron la escuela perfecta</p>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Form */}
              <div className="max-w-5xl mx-auto">
                <SearchForm />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-gray-50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  ¿Por qué usar nuestra plataforma?
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Búsqueda Fácil</h3>
                  <p className="text-gray-600">
                    Encuentra escuelas filtrando por nivel educativo, tipo y ubicación en segundos.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <Globe className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Información Completa</h3>
                  <p className="text-gray-600">
                    Accede a detalles sobre instalaciones, programas educativos y costos.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <Heart className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">Contacto Directo</h3>
                  <p className="text-gray-600">
                    Solicita información y agenda visitas directamente desde la plataforma.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16 md:py-20 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para encontrar la escuela perfecta?</h2>
              <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
                Comienza tu búsqueda hoy y accede a información completa de miles de escuelas en tu ciudad.
              </p>
              
              {/* Link to Schools */}
              <Link 
                href="/schools"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition inline-flex items-center gap-2 text-lg shadow-lg"
                title="Ver todas las escuelas disponibles"
              >
                <Search className="w-5 h-5" />
                Explorar Escuelas
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}