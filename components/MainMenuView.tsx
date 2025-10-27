import React from 'react';
import { UsersIcon } from './icons/UsersIcon.tsx';
import { ChartBarIcon } from './icons/ChartBarIcon.tsx';
import { BookOpenIcon } from './icons/BookOpenIcon.tsx';
import { TrophyIcon } from './icons/TrophyIcon.tsx';

interface MainMenuViewProps {
    onMenuAction: (menu: string) => void;
}

const MenuCard: React.FC<{ icon: React.ReactNode, title: string, onClick: () => void }> = ({ icon, title, onClick }) => (
    <button 
        onClick={onClick}
        className="bg-[var(--card-bg)] p-6 md:p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_25px_var(--glow-color)] backdrop-blur-sm border border-white/30"
    >
        <div className="mb-4 text-[var(--accent-color)]">
            {icon}
        </div>
        <h2 className="text-base md:text-lg font-semibold uppercase tracking-widest text-[var(--text-on-light)]">{title}</h2>
    </button>
);


export const MainMenuView: React.FC<MainMenuViewProps> = ({ onMenuAction }) => {
    return (
        <div className="flex flex-col items-center justify-start md:justify-center h-full w-full pt-20 md:pt-0">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-12 md:mb-16 uppercase tracking-wider" style={{ textShadow: '0 0 10px var(--glow-color), 0 0 20px var(--glow-color)'}}>
                CLUBE DO XADREZ
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-6xl">
                <MenuCard 
                    icon={<UsersIcon className="w-16 h-16"/>}
                    title="Turmas"
                    onClick={() => onMenuAction('classes')}
                />
                <MenuCard 
                    icon={<ChartBarIcon className="w-16 h-16"/>}
                    title="Classificações"
                    onClick={() => onMenuAction('classification')}
                />
                <MenuCard 
                    icon={<TrophyIcon className="w-16 h-16"/>}
                    title="Torneios"
                    onClick={() => onMenuAction('tournament')}
                />
                <MenuCard 
                    icon={<BookOpenIcon className="w-16 h-16"/>}
                    title="Notação Algébrica"
                    onClick={() => onMenuAction('notation')}
                />
            </div>
        </div>
    );
};