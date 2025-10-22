import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <defs>
            <linearGradient id="gold-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#E6A100" />
            </linearGradient>
            <linearGradient id="gold-highlight" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FFF7B0" />
                <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
            <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                <feOffset dx="0" dy="1" />
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        <g style={{ filter: 'url(#drop-shadow)' }}>
            {/* Base */}
            <path fill="url(#gold-gradient)" stroke="#854D0E" strokeWidth="0.5" d="M4,21 H20 V19 H4 Z" />
            <path fill="url(#gold-gradient)" stroke="#854D0E" strokeWidth="0.5" d="M6,19 H18 V17 H6 Z" />
            
            {/* Body */}
            <path fill="url(#gold-gradient)" stroke="#854D0E" strokeWidth="0.5" d="M12,17 C15,17 16,15 16,12 C16,9 15,7 12,7 C9,7 8,9 8,12 C8,15 9,17 12,17 Z" />
             {/* Highlight on body */}
            <path fill="url(#gold-highlight)" d="M12,7.5 C14.5,7.5 15.5,9.5 15.5,12 C15.5,14.5 14.5,16.5 12,16.5 C9.5,16.5 8.5,14.5 8.5,12 C8.5,9.5 9.5,7.5 12,7.5 Z" opacity="0.5" />
            <path fill="none" stroke="url(#gold-highlight)" strokeWidth="0.75" opacity="0.6" d="M10,9.5 A 4 4 0 0 1 14 9.5" />


            {/* Collar */}
            <path fill="url(#gold-gradient)" stroke="#854D0E" strokeWidth="0.5" d="M7,7 H17 V6 H7 Z" />
            
            {/* Head */}
            <path fill="url(#gold-gradient)" stroke="#854D0E" strokeWidth="0.5" d="M9,6 C9,4 10,2.5 12,2.5 C14,2.5 15,4 15,6 H9 Z" />
            
            {/* Cross */}
            <rect fill="url(#gold-gradient)" stroke="#854D0E" strokeWidth="0.3" x="11" y="0.5" width="2" height="3.5" rx="0.5" />
            <rect fill="url(#gold-gradient)" stroke="#854D0E" strokeWidth="0.3" x="10" y="1.5" width="4" height="1.5" rx="0.5" />
        </g>
    </svg>
);
