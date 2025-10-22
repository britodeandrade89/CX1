import React from 'react';

const WelcomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
    </svg>
);

export const WelcomeScreen: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <WelcomeIcon className="h-24 w-24 mb-6 text-[var(--accent-color)]" />
            <h1 className="text-4xl font-bold mb-2 text-[var(--text-on-dark)]">Bem-vindo ao Painel de Xadrez Escolar</h1>
            <p className="text-lg text-[var(--text-secondary)]">Selecione uma opção no menu lateral para começar.</p>
        </div>
    );
};