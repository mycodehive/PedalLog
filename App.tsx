import React from 'react';
import Dashboard from './components/Dashboard';
import { useGeolocation } from './hooks/useGeolocation';

const App: React.FC = () => {
  const {
    isTracking,
    startTracking,
    stopTracking,
    trackingData,
    error,
  } = useGeolocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 tracking-tight">
          PedalLog
        </h1>
      </header>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6 max-w-2xl w-full text-center" role="alert">
          <strong className="font-bold">오류:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      <Dashboard
        isTracking={isTracking}
        onStart={startTracking}
        onStop={stopTracking}
        data={trackingData}
      />
      
      <footer className="mt-8 text-gray-500 text-sm text-center">
          <p>위치 정보는 사용자의 브라우저에서만 처리됩니다.</p>
      </footer>
    </div>
  );
};

export default App;