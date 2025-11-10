import React from 'react';

export const RookWIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 13h17v6h-17z" strokeLinejoin="miter"/>
            <path d="M12 36h21v-3H12zM15 33v-9h15v9zM12 9h21v4H12z"/>
        </g>
    </svg>
);