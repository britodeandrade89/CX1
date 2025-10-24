import React from 'react';
import { UsersIcon } from './icons/UsersIcon.tsx';
import { ChartBarIcon } from './icons/ChartBarIcon.tsx';
import { BookOpenIcon } from './icons/BookOpenIcon.tsx';
import { LogoIcon } from './icons/LogoIcon.tsx';
import { ChevronDownIcon } from './icons/ChevronDownIcon.tsx';
import { initialClassData } from '../constants.ts';
import { XIcon } from './icons/XIcon.tsx';
import { LogoutIcon } from './icons/LogoutIcon.tsx';

interface SidebarProps {
    onViewChange: (view: string, classId?: string) => void;
    activeItem: string;
    isOpen: boolean;
    onClose: () => void;
    expandedMenu: string | null;
    onToggleMenu: (menu: string | null) => void;
    onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onViewChange, activeItem, isOpen, onClose, expandedMenu, onToggleMenu, onLogout }) => {
    const toggleMenu = (menu: string) => {
        onToggleMenu(expandedMenu === menu ? null : menu);
    };

    const handleNav = (view: string, classId?: string) => {
        onViewChange(view, classId);
    };
    
    const classIds = Object.keys(initialClassData);
    
    const baseClasses = "w-72 bg-[var(--sidebar-bg)] text-[var(--text-on-sidebar)] p-6 flex flex-col flex-shrink-0 shadow-lg transition-transform duration-300 ease-in-out backdrop-blur-lg border-r border-white/10";
    const responsiveClasses = "fixed md:relative inset-y-0 left-0 z-40 transform";
    const stateClasses = isOpen ? "translate-x-0" : "-translate-x-full";
    const desktopClasses = "md:translate-x-0";

    return (
        <aside className={`${baseClasses} ${responsiveClasses} ${stateClasses} ${desktopClasses}`}>
            <div className="flex items-start justify-between mb-10">
                <div 
                    className="flex flex-col items-center cursor-pointer w-full"
                    onClick={() => handleNav('main-menu')}
                >
                    <LogoIcon className="h-14 w-14 mb-2 text-[var(--text-on-sidebar)]" />
                    <h1 className="text-xl font-bold text-center">CLUBE DO XADREZ</h1>
                </div>
                 <button onClick={onClose} className="md:hidden p-1" aria-label="Fechar menu">
                    <XIcon className="h-6 w-6" />
                </button>
            </div>
            <nav className="flex-1 overflow-y-auto">
                <ul>
                    <ExpandableNavItem
                        icon={<UsersIcon className="h-6 w-6" />}
                        text="Turmas"
                        isOpen={expandedMenu === 'classes'}
                        onClick={() => {
                            toggleMenu('classes');
                            handleNav('classes');
                        }}
                    >
                        {classIds.map(id => (
                            <SubNavItem 
                                key={id} 
                                text={initialClassData[id].name} 
                                onClick={() => handleNav('classes', id)}
                                isActive={activeItem === `classes-${id}`}
                             />
                        ))}
                    </ExpandableNavItem>

                    <ExpandableNavItem
                        icon={<ChartBarIcon className="h-6 w-6" />}
                        text="Classificações"
                        isOpen={expandedMenu === 'classification'}
                        onClick={() => {
                            toggleMenu('classification');
                            handleNav('classification');
                        }}
                    >
                        {classIds.map(id => (
                            <SubNavItem 
                                key={id} 
                                text={`Classificação ${id}`} 
                                onClick={() => handleNav('classification', id)}
                                isActive={activeItem === `classification-${id}`}
                            />
                        ))}
                    </ExpandableNavItem>
                    
                    <NavItem 
                        icon={<BookOpenIcon className="h-6 w-6" />} 
                        text="Notação Algébrica" 
                        onClick={() => handleNav('notation')}
                        isActive={activeItem === 'notation'}
                    />
                </ul>
            </nav>
            <div className="mt-auto pt-6 border-t border-[var(--border-color)]">
                 <button 
                    onClick={onLogout} 
                    className="flex items-center justify-center w-full p-3 my-1 rounded-lg transition-colors font-medium bg-red-500/20 text-red-300 hover:bg-red-500/40 hover:text-red-200"
                >
                    <LogoutIcon className="h-6 w-6" />
                    <span className="ml-4 text-lg">Sair</span>
                </button>
                <div className="text-center text-xs text-[var(--text-secondary)] opacity-70 mt-4">
                    <p>Desenvolvido por André Brito</p>
                    <p>Versão 1.1</p>
                </div>
            </div>
        </aside>
    );
};

interface NavItemProps {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
    isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, onClick, isActive }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClick();
    };

    return (
        <li>
            <a href="#" onClick={handleClick} className={`flex items-center p-3 my-1 rounded-lg transition-colors font-medium ${isActive ? 'bg-[var(--accent-hover)] text-[var(--btn-primary-text)]' : 'hover:bg-[var(--sidebar-hover-bg)]'}`}>
                {icon}
                <span className="ml-4 text-lg">{text}</span>
            </a>
        </li>
    );
};


interface ExpandableNavItemProps {
    icon: React.ReactNode;
    text: string;
    isOpen: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const ExpandableNavItem: React.FC<ExpandableNavItemProps> = ({ icon, text, isOpen, onClick, children }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
    };

    return (
        <li>
            <div 
                className="flex items-center justify-between p-3 my-1 rounded-lg hover:bg-[var(--sidebar-hover-bg)] transition-colors cursor-pointer font-medium"
                onClick={handleClick}
                role="button"
                aria-expanded={isOpen}
            >
                 <div className="flex items-center flex-1">
                    {icon}
                    <span className="ml-4 text-lg">{text}</span>
                 </div>
                 <ChevronDownIcon className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
            </div>
            {isOpen && <ul className="pl-8 border-l-2 border-[var(--accent-hover)] ml-5">{children}</ul>}
        </li>
    );
};


interface SubNavItemProps {
    text: string;
    onClick: () => void;
    isActive: boolean;
}

const SubNavItem: React.FC<SubNavItemProps> = ({ text, onClick, isActive }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClick();
    };
    
    return (
         <li>
            <a href="#" onClick={handleClick} className={`block p-2 my-1 rounded-lg transition-colors ${isActive ? 'bg-[var(--accent-hover)] text-[var(--btn-primary-text)]' : 'hover:bg-[var(--sidebar-hover-bg)]'}`}>
                {text}
            </a>
        </li>
    );
};