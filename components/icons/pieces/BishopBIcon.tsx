import React from 'react';

export const BishopBIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="#000" stroke="#fff" strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 Z M 12.5,36 L 12.5,32 L 32.5,32 L 32.5,36 L 12.5,36 Z M 15,32 L 15,29 L 30,29 L 30,32 L 15,32 Z" />
            <path d="M 22.5,29 C 22.5,29 25,26 25,21 C 25,16 22.5,14 22.5,14 C 22.5,14 20,16 20,21 C 20,26 22.5,29 22.5,29 Z" />
            <circle cx="22.5" cy="11.5" r="2.5" />
        </g>
    </svg>
);
