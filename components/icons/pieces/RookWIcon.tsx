import React from 'react';

export const RookWIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinejoin="round">
            <path d="M9,39 L36,39 L36,36 L9,36 L9,39 Z M12,36 L12,32 L33,32 L33,36 L12,36 Z M12,32 L12,14 L33,14 L33,32 L12,32 Z" />
            <path d="M14,14 L14,9 L18,9 L18,14 L14,14 Z M21,14 L21,9 L24,9 L24,14 L21,14 Z M27,14 L27,9 L31,9 L31,14 L27,14 Z" />
        </g>
    </svg>
);
