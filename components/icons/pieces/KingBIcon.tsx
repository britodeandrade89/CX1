import React from 'react';

export const KingBIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="#000" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.5 11.5V6M20 8h5"/>
            <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1.5-1-3-1s-3 1-3 1c1.5 3-3 10.5-3 10.5"/>
            <path d="M12.5 36c5.5-3 14.5-3 20 0v-5s-2.5-1.5-10-1.5-10 1.5-10 1.5v5z"/>
            <path d="M12.5 31s-2.5-1.5-10-1.5-10 1.5-10 1.5" transform="translate(10,0)"/>
            <path d="M32.5 31s2.5-1.5 10-1.5 10 1.5 10 1.5" transform="translate(-10,0)"/>
        </g>
    </svg>
);