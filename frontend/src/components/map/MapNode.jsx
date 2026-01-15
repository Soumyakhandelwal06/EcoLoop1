import React from 'react';
import { Lock, Star, Play } from 'lucide-react';
import { motion } from 'framer-motion';

const MapNode = ({ level, status, x, y, onClick }) => {
  // Status: locked, unlocked, completed
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';
  const isUnlocked = status === 'unlocked';

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="relative group cursor-pointer" onClick={() => !isLocked && onClick(level)}>
        {/* Pulse effect for current level */}
        {isUnlocked && (
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
        )}

        <motion.div
            whileHover={{ scale: isLocked ? 1 : 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-lg transition-colors duration-300
              ${isLocked ? 'bg-gray-200 border-gray-400 text-gray-400' : ''}
              ${isUnlocked ? 'bg-green-500 border-white text-white' : ''}
              ${isCompleted ? 'bg-yellow-400 border-white text-yellow-900' : ''}
            `}
        >
          {isLocked && <Lock className="w-6 h-6" />}
          {isUnlocked && <Play className="w-8 h-8 fill-current" />}
          {isCompleted && <Star className="w-8 h-8 fill-current" />}
        </motion.div>

        {/* Level Tooltip/Label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <span className={`text-sm font-bold px-2 py-1 rounded-full bg-white/80 shadow-sm
            ${isLocked ? 'text-gray-500' : 'text-green-800'}
          `}>
            Level {level}
          </span>
        </div>
        
        {/* Stars for completed levels (Optional specific score) */}
        {isCompleted && (
           <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow">
             <div className="flex text-yellow-500">
               <Star size={12} fill="currentColor" />
               <Star size={12} fill="currentColor" />
               <Star size={12} fill="currentColor" />
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default MapNode;
