
import React from 'react';

export const ChessIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2l3 7h-6l3-7z"></path>
        <path d="M12 22V9"></path>
        <path d="M4 15h16"></path>
        <path d="M4 19h16"></path>
        <path d="M12 9c-2 0-4 2-4 4v2h8v-2c0-2-2-4-4-4z"></path>
    </svg>
);
