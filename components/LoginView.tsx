import React from 'react';
import { LogoIcon } from './icons/LogoIcon.tsx';

interface LoginViewProps {
    onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {

    const handleEnter = (e: React.FormEvent) => {
        e.preventDefault();
        onLoginSuccess();
    };

    return (
        <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
            <div className="w-full max-w-sm p-8 space-y-8 bg-[var(--content-bg)] rounded-2xl shadow-lg backdrop-blur-lg border border-[var(--border-color)]">
                <div className="flex flex-col items-center">
                    <LogoIcon className="h-16 w-16 mb-2 text-[var(--accent-color)]" />
                    <h1 className="text-2xl font-bold text-center text-[var(--text-on-dark)]">CLUBE DO XADREZ</h1>
                </div>
                <form onSubmit={handleEnter}>
                    <button type="submit" className="w-full px-4 py-3 font-bold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-lg hover:bg-[var(--btn-primary-hover-bg)] transition-colors duration-300 text-lg">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};