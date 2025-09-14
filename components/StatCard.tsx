import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, unit, icon }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 flex items-center space-x-4 transition-all duration-300 hover:bg-gray-800/80 hover:shadow-cyan-500/10 hover:shadow-lg">
      <div className="text-cyan-400">
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <div className="flex items-baseline space-x-2">
            <p className="text-4xl font-bold text-white tracking-tighter">{value}</p>
            <p className="text-gray-300">{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;