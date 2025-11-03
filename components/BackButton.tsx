import React from 'react';

interface BackButtonProps {
    onClick: () => void;
    text?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, text = "Voltar" }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center px-4 py-2 mb-6 text-sm font-medium text-stone-100 bg-white/5 rounded-lg hover:bg-white/10 transition-colors shadow-sm"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {text}
        </button>
    );
};