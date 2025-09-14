import React from 'react';
import type { TrackingData } from '../types';
import StatCard from './StatCard';
import MapDisplay from './MapDisplay';
import { SpeedIcon, DistanceIcon, MaxSpeedIcon, TimeIcon } from './icons';

interface DashboardProps {
  isTracking: boolean;
  onStart: () => void;
  onStop: () => void;
  data: TrackingData;
}

const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');
    
    if (hours > 0) {
        return `${hours.toString()}:${paddedMinutes}:${paddedSeconds}`;
    }
    
    return `${paddedMinutes}:${paddedSeconds}`;
};

const Dashboard: React.FC<DashboardProps> = ({ isTracking, onStart, onStop, data }) => {
  return (
    <main className="w-full max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="현재 속도"
          value={data.currentSpeed.toFixed(1)}
          unit="km/h"
          icon={<SpeedIcon className="w-8 h-8"/>}
        />
        <StatCard
          title="누적 거리"
          value={data.distance.toFixed(2)}
          unit="km"
          icon={<DistanceIcon className="w-8 h-8"/>}
        />
        <StatCard
          title="최고 속도"
          value={data.maxSpeed.toFixed(1)}
          unit="km/h"
          icon={<MaxSpeedIcon className="w-8 h-8"/>}
        />
        <StatCard
          title="총 시간"
          value={formatTime(data.elapsedTime)}
          unit=""
          icon={<TimeIcon className="w-8 h-8"/>}
        />
      </div>
      
      <MapDisplay path={data.path} />

      <div className="flex justify-center pt-2">
        <button
          onClick={isTracking ? onStop : onStart}
          className={`px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg
            ${isTracking 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/30' 
              : 'bg-cyan-500 hover:bg-cyan-600 text-gray-900 shadow-cyan-500/30'
            }`}
        >
          {isTracking ? '주행 중지' : '주행 시작'}
        </button>
      </div>
    </main>
  );
};

export default Dashboard;