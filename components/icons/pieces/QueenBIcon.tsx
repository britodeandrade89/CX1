import React from 'react';

export const QueenBIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="#000" stroke="#fff" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 Z M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 Z" />
            <path d="M 12,32 C 12,28 14,26 14,26 C 14,26 13,24 13,21 C 13,18 14,16 14,16 C 14,16 12,14 12,11 C 12,8 15,6 22.5,6 C 30,6 33,8 33,11 C 33,14 31,16 31,16 C 31,16 32,18 32,21 C 32,24 31,26 31,26 C 31,26 33,28 33,32 L 12,32 Z" />
            <circle cx="11.5" cy="11.5" r="2" />
            <circle cx="22.5" cy="8.5" r="2" />
            <circle cx="33.5" cy="11.5" r="2" />
        </g>
    </svg>
);
