
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapView({ onMarkerClick }) {
  const [geoData, setGeoData] = useState(null);
  const [batasData, setBatasData] = useState(null);

  const centerPosition = [-8.3477, 115.0322];
  const maxBounds = [
    [-8.3700, 115.0100],
    [-8.3300, 115.0550]
  ];

  useEffect(() => {
    Promise.all([
      fetch('/data/batungsel.geojson').then(res => res.json()),
      fetch('/data/batas_batungsel.geojson').then(res => res.json()).catch(() => null)
    ])
    .then(([titik, batas]) => {
      setGeoData(titik);
      if (batas) setBatasData(batas);
    })
    .catch(error => console.error("Gagal memuat data spasial:", error));
  }, []);

  const getMarkerColor = (kategori) => {
    switch (kategori) {
      case 'KULINER': return 'bg-red-800';
      case 'UMKM LOKAL': return 'bg-slate-800';
      case 'AGROWISATA': return 'bg-sky-400';
      default: return 'bg-gray-500';
    }
  };

  const batasStyle = {
    color: "#ffcc00", weight: 3, opacity: 0.8,
    fillColor: "#ffffff", fillOpacity: 0.05, dashArray: "5, 10"
  };

  return (
    <MapContainer 
      center={centerPosition} zoom={15} minZoom={14} 
      maxBounds={maxBounds} maxBoundsViscosity={1.0} 
      className="w-full h-full" zoomControl={false} 
    >
      <TileLayer
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      
      {batasData && <GeoJSON key="batas-desa" data={batasData} style={batasStyle} />}

      {geoData && geoData.features.map((feature) => {
        if (!feature.geometry || !feature.geometry.coordinates) {
          console.warn(`Data spasial cacat terdeteksi pada UMKM ID: ${feature.properties?.id}. Marker tidak di-render.`);
          return null; 
        }

        const { id, kategori } = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;
        const bgColor = getMarkerColor(kategori);
        const displayId = id.toString().padStart(2, '0');

        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div class="${bgColor} text-white font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-white shadow-lg text-sm transition-transform hover:scale-110">${displayId}</div>`,
          iconSize: [32, 32], iconAnchor: [16, 16]
        });

        return (
          <Marker 
            key={id} 
            position={[lat, lng]} 
            icon={customIcon}
            eventHandlers={{
              click: () => onMarkerClick(feature.properties),
            }}
          />
        );
      })}
    </MapContainer>
  );
}