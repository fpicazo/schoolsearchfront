export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold mb-4">Encuentra Tu Escuela</h4>
            <p className="text-sm">Tu plataforma de búsqueda de escuelas confiable.</p>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Navegación</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">Inicio</a></li>
              <li><a href="/schools" className="hover:text-white">Escuelas</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Recursos</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Ayuda</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-4">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacidad</a></li>
              <li><a href="#" className="hover:text-white">Términos</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 Encuentra Tu Escuela. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}