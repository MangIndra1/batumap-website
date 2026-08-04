// src/App.jsx
import { useState } from 'react';
import Header from './components/HeadBar';
import MapView from './components/MapView';
import BottomSheet from './components/BottomSheet';

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 overflow-hidden relative">
      <Header />
      
      <main className="flex-1 relative z-0">
        <MapView onMarkerClick={setSelectedFeature} />
      </main>
      
      <BottomSheet 
        feature={selectedFeature} 
        onClose={() => setSelectedFeature(null)} 
      />
    </div>
  );
}