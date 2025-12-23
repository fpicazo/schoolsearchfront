import Link from 'next/link';

export default function Header({ currentPage }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Encuentra Tu Escuela</h1>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/">
            <span className={`font-medium transition cursor-pointer ${
              currentPage === 'home'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}>
              Inicio
            </span>
          </Link>
          <Link href="/schools">
            <span className={`font-medium transition cursor-pointer ${
              currentPage === 'schools'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            }`}>
              Escuelas
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}