import React from 'react';
import { UsersIcon } from './icons/UsersIcon.tsx';
import { ChartBarIcon } from './icons/ChartBarIcon.tsx';
import { TrophyIcon } from './icons/TrophyIcon.tsx';
import { BookOpenIcon } from './icons/BookOpenIcon.tsx';
import { KnightIcon } from './icons/KnightIcon.tsx';
import { DocumentTextIcon } from './icons/DocumentTextIcon.tsx';
import { ClipboardListIcon } from './icons/ClipboardListIcon.tsx';
import { ChessIcon } from './icons/ChessIcon.tsx';

interface MainMenuViewProps {
    setView: (view: string) => void;
}

const MenuCard: React.FC<{ icon: React.ReactNode, title: string, onClick: () => void }> = ({ icon, title, onClick }) => (
    <button
        onClick={onClick}
        className="bg-stone-900/70 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-yellow-600/30 backdrop-blur-sm border border-stone-800 aspect-square"
    >
        <div className="mb-2 text-yellow-600">{icon}</div>
        <h2 className="text-base font-bold text-stone-100">{title}</h2>
    </button>
);


export const MainMenuView: React.FC<MainMenuViewProps> = ({ setView }) => {
    return (
        <div className="p-4 md:p-6 bg-stone-950/80 rounded-xl shadow-lg backdrop-blur-lg border border-stone-800 w-full max-w-6xl">
            <div className="text-center mb-8">
                 <h1 className="text-3xl font-bold text-stone-100">Painel de Xadrez Escolar</h1>
                 <p className="text-lg text-stone-400 mt-2">Bem-vindo! Selecione uma ferramenta para começar.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 <MenuCard
                    icon={<UsersIcon className="w-8 h-8" />}
                    title="Frequência"
                    onClick={() => setView('classes')}
                />
                 <MenuCard
                    icon={<ChartBarIcon className="w-8 h-8" />}
                    title="Classificação"
                    onClick={() => setView('classifications')}
                />
                 <MenuCard
                    icon={<TrophyIcon className="w-8 h-8" />}
                    title="Gerenciar Torneio"
                    onClick={() => setView('tournament')}
                />
                 <MenuCard
                    icon={<BookOpenIcon className="w-8 h-8" />}
                    title="Notação Algébrica"
                    onClick={() => setView('algebraic-notation')}
                />
                 <MenuCard
                    icon={<KnightIcon className="w-8 h-8 text-current" />}
                    title="Exercícios de Mate"
                    onClick={() => setView('checkmate-exercises')}
                />
                 <MenuCard
                    icon={<DocumentTextIcon className="w-8 h-8" />}
                    title="Ementa do Curso"
                    onClick={() => setView('ementa')}
                />
                 <MenuCard
                    icon={<ClipboardListIcon className="w-8 h-8 text-current" />}
                    title="Registro de Atividades"
                    onClick={() => setView('activity-log')}
                />
                 <MenuCard
                    icon={<ChessIcon className="w-8 h-8" />}
                    title="Jogar"
                    onClick={() => setView('play-game')}
                />
            </div>
        </div>
    );
};