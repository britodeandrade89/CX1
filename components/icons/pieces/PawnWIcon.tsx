import React from 'react';

export const PawnWIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round">
            <path d="M22.5,38.5 C20.5,38.5 19.5,37.5 19.5,35.5 L19.5,32.5 C19.5,30.5 20.5,29.5 22.5,29.5 C24.5,29.5 25.5,30.5 25.5,32.5 L25.5,35.5 C25.5,37.5 24.5,38.5 22.5,38.5 Z" />
            <path d="M22.5,29.5 C22.5,26.5 24.5,25.5 24.5,22.5 C24.5,19.5 22.5,18.5 22.5,18.5 C22.5,18.5 20.5,19.5 20.5,22.5 C20.5,25.5 22.5,26.5 22.5,29.5 Z" />
            <circle cx="22.5" cy="13.5" r="4.5" />
        </g>
    </svg>
);
