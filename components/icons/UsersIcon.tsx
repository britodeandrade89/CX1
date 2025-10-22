import React from 'react';

export const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <defs>
            <linearGradient id="blue-pawn" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id="red-pawn" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <filter id="pawn-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
                <feOffset in="blur" dx="1" dy="1" result="offsetBlur" />
                <feMerge>
                    <feMergeNode in="offsetBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
        
        {/* Blue Pawn (left) */}
        <g transform="translate(-2, 0)" style={{ filter: 'url(#pawn-shadow)' }}>
            <circle cx="11" cy="8" r="3" fill="url(#blue-pawn)" />
            <path d="M8 11 C8 14, 14 14, 14 11 Z" fill="url(#blue-pawn)" />
            <rect x="7" y="14" width="8" height="3" rx="1.5" fill="url(#blue-pawn)" />
            <circle cx="11" cy="8" r="1.5" fill="#c7d2fe" opacity="0.7" />
        </g>

        {/* Red Pawn (right, slightly overlapping) */}
        <g transform="translate(4, 2)" style={{ filter: 'url(#pawn-shadow)' }}>
            <circle cx="11" cy="8" r="3" fill="url(#red-pawn)" />
            <path d="M8 11 C8 14, 14 14, 14 11 Z" fill="url(#red-pawn)" />
            <rect x="7" y="14" width="8" height="3" rx="1.5" fill="url(#red-pawn)" />
            <circle cx="11" cy="8" r="1.5" fill="#fecaca" opacity="0.7" />
        </g>
    </svg>
);
