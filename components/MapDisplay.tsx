import React from 'react';
import type { Coordinates } from '../types';

interface MapDisplayProps {
  path: Coordinates[];
}

const MapDisplay: React.FC<MapDisplayProps> = ({ path }) => {
  const width = 500;
  const height = 300;
  const padding = 20;

  const getPathPoints = () => {
    if (path.length < 2) return '';
    
    const lats = path.map(p => p.lat);
    const lngs = path.map(p => p.lng);

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    
    const latRange = maxLat - minLat || 1;
    const lngRange = maxLng - minLng || 1;
    
    const scaleX = (width - 2 * padding) / lngRange;
    const scaleY = (height - 2 * padding) / latRange;
    
    return path
      .map(p => {
        const x = ((p.lng - minLng) * scaleX) + padding;
        const y = ((maxLat - p.lat) * scaleY) + padding;
        return `${x},${y}`;
      })
      .join(' ');
  };
  
  const pathPoints = getPathPoints();
  const startPoint = path.length > 0 ? pathPoints.split(' ')[0].split(',') : null;
  const endPoint = path.length > 0 ? pathPoints.split(' ')[pathPoints.split(' ').length-1].split(',') : null;


  return (
    <div className="w-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-4 overflow-hidden">
        <h3 className="text-lg font-semibold mb-2 text-gray-300">이동 경로</h3>
        <div className="relative aspect-[5/3]">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full bg-gray-900/50 rounded-lg">
            {path.length < 2 ? (
                <text x={width/2} y={height/2} textAnchor="middle" fill="#6b7280" className="text-lg font-medium">
                    주행을 시작하여 경로를 기록하세요.
                </text>
            ) : (
                <>
                    <polyline
                        points={pathPoints}
                        fill="none"
                        stroke="url(#path-gradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {startPoint && (
                         <circle cx={startPoint[0]} cy={startPoint[1]} r="5" fill="#10b981" />
                    )}
                    {endPoint && (
                        <circle cx={endPoint[0]} cy={endPoint[1]} r="6" fill="#38bdf8" className="animate-pulse" />
                    )}
                    <defs>
                        <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                    </defs>
                </>
            )}
            </svg>
        </div>
    </div>
  );
};

export default MapDisplay;