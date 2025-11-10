import React from 'react';

export const KnightWIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 22,10 C 32.5,10 31.5,23.5 25.5,23.5 L 29,28 C 29,30 22.5,32.5 22.5,32.5 C 22.5,32.5 15.5,30 15.5,28 L 19,23.5 C 13,23.5 12,10 22,10 Z" />
            <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 Z M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 Z" />
        </g>
    </svg>
);
