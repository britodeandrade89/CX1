import React from 'react';
import { LogoIcon } from './icons/LogoIcon.tsx';
import { UsersIcon } from './icons/UsersIcon.tsx';
import { ChartBarIcon } from './icons/ChartBarIcon.tsx';
import { TrophyIcon } from './icons/TrophyIcon.tsx';
import { BookOpenIcon } from './icons/BookOpenIcon.tsx';
import { DocumentTextIcon } from './icons/DocumentTextIcon.tsx';
import { ClipboardListIcon } from './icons/ClipboardListIcon.tsx';
import { KnightIcon } from './icons/KnightIcon.tsx';
import { ChessIcon } from './icons/ChessIcon.tsx';
import { LogoutIcon } from './icons/LogoutIcon.tsx';
import { XIcon } from './icons/XIcon.tsx';
import { CloudIcon } from './icons/CloudIcon.tsx';
import { GitHubIcon } from './icons/GitHubIcon.tsx';

type SyncStatus = 'idle' | 'loading' | 'syncing' | 'synced' | 'error';

interface SidebarProps {
    setView: (view: string) => void;
    onLogout: () => void;
    isOpen: boolean;
    onClose: () => void;
    syncStatus: SyncStatus;
    onOpenGithubModal: () => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex items-center w-full px-4 py-3 text-sm font-medium text-left text-stone-400 rounded-lg hover:bg-yellow-600/20 hover:text-stone-100 transition-colors duration-200">
        <div className="w-6 h-6 mr-4">{icon}</div>
        <span>{label}</span>
    </button>
);

const SyncStatusIndicator: React.FC<{ status: SyncStatus }> = ({ status }) => {
    let text;
    let colorClass;

    switch (status) {
        case 'loading':
            text = 'Carregando dados...';
            colorClass = 'text-stone-400';
            break;
        case 'syncing':
            text = 'Sincronizando...';
            colorClass = 'text-yellow-400';
            break;
        case 'synced':
            text = 'Salvo (offline)';
            colorClass = 'text-green-400';
            break;
        case 'error':
            text = 'Erro de sincronização';
            colorClass = 'text-red-400';
            break;
        default:
            return <div className="px-4 py-3 h-[42px]"></div>; // Placeholder for consistent height
    }

    return (
        <div className={`flex items-center w-full px-4 py-3 text-sm font-medium text-left ${colorClass}`}>
            <div className="w-6 h-6 mr-4">
                <CloudIcon className="w-full h-full" />
            </div>
            <span>{text}</span>
        </div>
    );
};


export const Sidebar: React.FC<SidebarProps> = ({ setView, onLogout, isOpen, onClose, syncStatus, onOpenGithubModal }) => {
    return (
        <>
            <aside className={`fixed md:relative z-50 md:z-auto h-full bg-stone-900/90 backdrop-blur-lg border-r border-stone-800 w-64 flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="flex items-center justify-between p-4 border-b border-stone-800 h-[72px]">
                    <div className="flex items-center gap-3">
                        <LogoIcon className="h-8 w-8 text-yellow-600" />
                        <span className="text-xl font-bold text-stone-100">Xadrez Escolar</span>
                    </div>
                    <button onClick={onClose} className="md:hidden p-1">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <NavItem icon={<UsersIcon className="w-full h-full" />} label="Frequência das Turmas" onClick={() => setView('classes')} />
                    <NavItem icon={<ChartBarIcon className="w-full h-full" />} label="Classificação" onClick={() => setView('classifications')} />
                    <NavItem icon={<TrophyIcon className="w-full h-full" />} label="Gerenciar Torneio" onClick={() => setView('tournament')} />
                    <NavItem icon={<BookOpenIcon className="w-full h-full" />} label="Notação Algébrica" onClick={() => setView('algebraic-notation')} />
                    <NavItem icon={<KnightIcon className="w-full h-full text-current" />} label="Exercícios de Mate" onClick={() => setView('checkmate-exercises')} />
                    <NavItem icon={<DocumentTextIcon className="w-full h-full" />} label="Ementa do Curso" onClick={() => setView('ementa')} />
                    <NavItem icon={<ClipboardListIcon className="w-full h-full text-current" />} label="Registro de Atividades" onClick={() => setView('activity-log')} />
                    <NavItem icon={<ChessIcon className="w-full h-full" />} label="Jogar" onClick={() => setView('play-game')} />
                </nav>

                <div className="p-4 border-t border-stone-800 space-y-2">
                    <SyncStatusIndicator status={syncStatus} />
                    <NavItem icon={<GitHubIcon className="w-full h-full" />} label="Sincronizar com GitHub" onClick={onOpenGithubModal} />
                    <NavItem icon={<LogoutIcon className="w-full h-full" />} label="Sair" onClick={onLogout} />
                </div>
            </aside>
            {/* Overlay for mobile */}
            {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose}></div>}
        </>
    );
};