import React from 'react';

export const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <defs>
            <linearGradient id="gold-podium" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFDF00"/>
                <stop offset="100%" stopColor="#FFA500"/>
            </linearGradient>
            <linearGradient id="silver-podium" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E0E0E0"/>
                <stop offset="100%" stopColor="#A0A0A0"/>
            </linearGradient>
            <linearGradient id="bronze-podium" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#CD7F32"/>
                <stop offset="100%" stopColor="#A0522D"/>
            </linearGradient>
        </defs>

        <g transform="skewY(-8) translate(0, 2)">
            {/* Base */}
            <rect x="1" y="20" width="22" height="3" fill="#57534e" rx="1"/>

            {/* Silver (2nd) */}
            <rect x="2" y="12" width="6" height="8" fill="url(#silver-podium)" stroke="#6b7280" strokeWidth="0.5"/>
            <text x="5" y="17.5" fill="#27272a" fontSize="5" fontWeight="bold">2</text>

            {/* Gold (1st) */}
            <rect x="9" y="8" width="6" height="12" fill="url(#gold-podium)" stroke="#ca8a04" strokeWidth="0.5"/>
            <text x="12" y="13.5" fill="#27272a" fontSize="5" fontWeight="bold">1</text>
            
            {/* Bronze (3rd) */}
            <rect x="16" y="15" width="6" height="5" fill="url(#bronze-podium)" stroke="#854d0e" strokeWidth="0.5"/>
            <text x="19" y="19" fill="#27272a" fontSize="5" fontWeight="bold">3</text>
        </g>
    </svg>
);
