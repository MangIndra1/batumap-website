// src/components/Header.jsx
import { MapPinned, Filter } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-md p-3 md:p-4 shrink-0 z-50 relative flex items-center justify-between">
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center shrink-0">
          <img src="/logo_batungsel.png" alt="Logo Desa Batungsel" className="w-8 h-8 object-contain" />
        </div>
        
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-gray-800 leading-tight">
            Peta Desa Batungsel
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            Sistem Informasi Spasial
          </p>
        </div>
      </div>
      
      <div>
        <button 
          className="flex items-center gap-2 p-2 bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors shadow-sm"
          onClick={() => alert("Fitur Filter Kategori akan dibangun di sini.")}
        >
          <Filter size={18} />
          <span className="text-sm font-semibold hidden md:block">Filter</span>
        </button>
      </div>

    </header>
  );
}