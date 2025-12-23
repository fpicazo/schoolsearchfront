import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';

export default function SchoolCard({ school }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <div className="grid md:grid-cols-3 gap-0">
        <div className="md:col-span-1 h-48 md:h-auto overflow-hidden relative bg-gray-200">
          <img
            src={school.image}
            alt={school.name}
            className="w-full h-full object-cover hover:scale-105 transition"
          />
        </div>
        <div className="md:col-span-2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{school.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <p className="text-gray-600 text-sm">{school.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-gray-900">{school.rating}</span>
                <span className="text-sm text-gray-600">({school.reviews})</span>
              </div>
            </div>
            <p className="text-gray-600 mt-2 line-clamp-2">{school.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs">COLEGIATURA</p>
                <p className="font-semibold text-gray-900">{school.tuition}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">TIPO</p>
                <p className="font-semibold text-gray-900">{school.isPrivate ? 'Privada' : 'Pública'}</p>
              </div>
            </div>
            <Link href={`/school/${school.slug}`}>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                Ver Detalles
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}