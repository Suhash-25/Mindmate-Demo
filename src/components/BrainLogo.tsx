
import React from 'react';
import { Brain } from 'lucide-react';

interface BrainLogoProps {
  size?: number;
}

const BrainLogo: React.FC<BrainLogoProps> = ({ size = 60 }) => {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer glowing circle */}
      <div 
        className="absolute w-full h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-600 opacity-20 animate-pulse-gentle"
        style={{ width: size + 20, height: size + 20 }}
      ></div>
      
      {/* Inner circle with gradient */}
      <div 
        className="relative rounded-full flex items-center justify-center bg-gradient-to-br from-black via-black to-purple-900 p-4 border border-purple-500/30 shadow-lg"
        style={{ width: size, height: size }}
      >
        {/* Animated rings */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full border border-purple-400/30 animate-pulse-gentle"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border border-gold-400/20 animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
        
        {/* Horizontal neon lines */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/70 to-transparent animate-pulse-gentle"></div>
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-gold-400/70 to-transparent rotate-90 animate-pulse-gentle" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Brain icon */}
        <Brain 
          size={size * 0.5} 
          className="text-white/90 animate-neon-glow drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" 
        />
      </div>
      
      {/* Bottom glow */}
      <div 
        className="absolute -bottom-4 w-3/4 h-1 bg-purple-500/40 rounded-full blur-md"
        style={{ width: size * 0.75 }}
      ></div>
    </div>
  );
};

export default BrainLogo;
