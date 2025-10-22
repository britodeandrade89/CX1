import React from 'react';

export const BookOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <defs>
            <linearGradient id="book-cover" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#854d0e" />
                <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
        </defs>

        {/* Book Cover */}
        <path d="M2 5 C2 3, 4 2, 6 2 L18 2 C20 2, 22 3, 22 5 L22 19 C22 21, 20 22, 18 22 L6 22 C4 22, 2 21, 2 19 Z" fill="url(#book-cover)" />

        {/* Gutter Shadow */}
        <path d="M12 4 L12 20" stroke="#000000" strokeOpacity="0.3" strokeWidth="1" />
        
        {/* Left Page */}
        <path d="M4 4 L11 4 L11 20 L4 20 Q 4 12, 4 4" fill="#fef3c7" />

        {/* Right Page */}
        <path d="M13 4 L20 4 Q 20 12, 20 20 L13 20 Z" fill="#fef3c7" />

        {/* Page Lines (Left) */}
        <path d="M6 8 H9 M6 11 H10 M6 14 H9 M6 17 H10" stroke="#d1d5db" strokeWidth="0.5" strokeLinecap="round" />

        {/* Page Lines (Right) */}
        <path d="M15 7 H18 M14 10 H18 M15 13 H18 M14 16 H18" stroke="#d1d5db" strokeWidth="0.5" strokeLinecap="round" />
    </svg>
);
