import Header from './components/Header';
import MapView from './components/MapView';

export default function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 overflow-hidden">
      
      <Header />
      
      <main className="flex-1 relative z-0">
        <MapView />
      </main>
      
    </div>
  );
}