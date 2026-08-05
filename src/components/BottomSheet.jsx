// src/components/BottomSheet.jsx
import { X, Navigation } from 'lucide-react';

export default function BottomSheet({ feature, onClose }) {
  const isVisible = feature !== null;

  return (
    <>
      <div 
        className={`absolute inset-0 bg-black/40 z-[100] transition-opacity duration-300 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div 
        className={`absolute bottom-0 left-0 right-0 md:left-auto md:right-4 md:bottom-4 md:w-96 bg-white rounded-t-2xl md:rounded-2xl shadow-2xl z-[110] transform transition-transform duration-300 ease-out flex flex-col max-h-[85vh] ${isVisible ? 'translate-y-0' : 'translate-y-full md:translate-y-[150%]'}`}
      >
        <div className="flex justify-center p-3 relative shrink-0">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full md:hidden"></div>
          <button 
            onClick={onClose}
            className="absolute right-4 top-3 p-1.5 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {feature && (
          <div className="overflow-y-auto px-6 pb-6">
            <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden shadow-inner">
              <img 
                src={feature.foto_url} 
                alt={feature.nama}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Foto+Belum+Tersedia';
                }}
              />
            </div>

            {/* MODIFIKASI: Menambahkan penomoran di sebelah lencana kategori */}
            <div className="mb-3 flex items-center gap-2">
              {/* Lencana Angka (ID) */}
              <span className="flex items-center justify-center w-6 h-6 bg-gray-800 text-white text-xs font-bold rounded-full">
                {feature.id.toString().padStart(2, '0')}
              </span>
              
              {/* Lencana Kategori */}
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                {feature.kategori}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{feature.nama}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 text-justify">
              {feature.deskripsi}
            </p>

            <a 
              href={feature.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors shadow-md"
            >
              <Navigation size={18} />
              Buka di Google Maps
            </a>
          </div>
        )}
      </div>
    </>
  );
}