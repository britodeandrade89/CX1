import React from 'react';

export const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <defs>
            <linearGradient id="trophy-gold" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="trophy-base" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#A16207" />
                <stop offset="100%" stopColor="#422006" />
            </linearGradient>
            <filter id="trophy-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
        </defs>

        <g style={{ filter: 'url(#trophy-glow)' }}>
            {/* Base */}
            <rect x="5" y="20" width="14" height="2" rx="1" fill="url(#trophy-base)" />
            <path d="M9 18 L15 18 L14 20 L10 20 Z" fill="url(#trophy-base)" />
            
            {/* Stem */}
            <rect x="11" y="13" width="2" height="5" fill="url(#trophy-gold)" />
            <circle cx="12" cy="13" r="1.5" fill="url(#trophy-gold)" />

            {/* Cup */}
            <path d="M4 4 C4 2, 8 2, 12 5 C16 2, 20 2, 20 4 L20 8 C20 12, 16 12, 12 12 C8 12, 4 12, 4 8 Z" fill="url(#trophy-gold)" />
            
            {/* Handles */}
            <path d="M4 6 C2 6, 2 9, 4 9" stroke="url(#trophy-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M20 6 C22 6, 22 9, 20 9" stroke="url(#trophy-gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            
             {/* Highlight */}
             <path d="M8 4.5 Q12 6, 16 4.5" stroke="#FFFBEB" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
        </g>
    </svg>
);
