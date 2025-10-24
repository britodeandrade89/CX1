import React, { useState, useEffect } from 'react';
import { Background } from './components/Background.tsx';
import { LoginView } from './components/LoginView.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { MainMenuView } from './components/MainMenuView.tsx';
import { HamburgerIcon } from './components/icons/HamburgerIcon.tsx';
import { WelcomeScreen } from './components/WelcomeScreen.tsx';
import { ClassView } from './components/ClassView.tsx';
import { ClassificationView } from './components/ClassificationView.tsx';
import { AlgebraicNotationView } from './components/AlgebraicNotationView.tsx';
import { TournamentView } from './components/TournamentView.tsx';
import { initialClassData, initialClassificationData } from './constants.ts';
import type { ClassDataMap, ClassificationDataMap } from './types.ts';
import { ClassListView } from './components/ClassListView.tsx';
import { ClassificationListView } from './components/ClassificationListView.tsx';

const App: React.FC = () => {
    // State management
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
    const [view, setView] = useState('main-menu');
    const [activeClassId, setActiveClassId] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [expandedMenu, setExpandedMenu] = useState<string | null>('classes');

    // Data state with localStorage persistence
    const [classData, setClassData] = useState<ClassDataMap>(() => {
        try {
            const saved = localStorage.getItem('classData');
            return saved ? JSON.parse(saved) : initialClassData;
        } catch (e) {
            console.error("Failed to load class data from localStorage", e);
            return initialClassData;
        }
    });

    const [classificationData, setClassificationData] = useState<ClassificationDataMap>(() => {
        try {
            const saved = localStorage.getItem('classificationData');
            return saved ? JSON.parse(saved) : initialClassificationData;
        } catch (e) {
            console.error("Failed to load classification data from localStorage", e);
            return initialClassificationData;
        }
    });

    useEffect(() => {
        localStorage.setItem('isAuthenticated', String(isAuthenticated));
    }, [isAuthenticated]);

    // Save class data to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('classData', JSON.stringify(classData));
        } catch (e) {
            console.error("Failed to save class data to localStorage", e);
        }
    }, [classData]);

    // Save classification data to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('classificationData', JSON.stringify(classificationData));
        } catch (e) {
            console.error("Failed to save classification data to localStorage", e);
        }
    }, [classificationData]);


    const handleLogin = () => setIsAuthenticated(true);
    const handleLogout = () => {
        setIsAuthenticated(false);
        setView('main-menu'); // Reset to main menu on logout
    };

    const handleViewChange = (newView: string, classId?: string) => {
        if (newView === 'classes' || newView === 'classification') {
            if (classId) {
                setView(newView);
                setActiveClassId(classId);
            } else {
                 // When a main category is clicked (e.g., from the main menu),
                 // switch to that view (which will show a welcome/prompt)
                 // and expand the corresponding sidebar menu.
                setView(newView);
                setExpandedMenu(newView);
                setActiveClassId(null);
            }
        } else {
            setView(newView);
            setActiveClassId(null);
        }
        setIsSidebarOpen(false); // Close sidebar on navigation
    };

    const handleAttendanceUpdate = (classId: string, studentId: number, date: string, status: 'P' | 'F') => {
        setClassData(prevData => {
            const classToUpdate = prevData[classId];
            if (!classToUpdate) return prevData;
    
            const newDates = classToUpdate.dates.includes(date)
                ? classToUpdate.dates
                : [...classToUpdate.dates, date];
            
            const newStudents = classToUpdate.students.map(student => {
                if (student.id === studentId) {
                    return {
                        ...student,
                        attendance: {
                            ...student.attendance,
                            [date]: status,
                        },
                    };
                }
                return student;
            });
    
            return {
                ...prevData,
                [classId]: {
                    ...classToUpdate,
                    dates: newDates,
                    students: newStudents,
                },
            };
        });
    };

    const handleClassificationUpdate = (classId: string, studentIndex: number, newStats: { wins: number; draws: number; losses: number }) => {
        setClassificationData(prevData => {
            const classToUpdate = prevData[classId];
            if (!classToUpdate) return prevData;

            const updatedStudents = classToUpdate.students.map((student, index) => {
                if (index === studentIndex) {
                    const points = (newStats.wins * 1) + (newStats.draws * 0.5);
                    return {
                        ...student,
                        ...newStats,
                        points: points.toLocaleString('pt-BR'),
                    };
                }
                return student;
            });

            // Sort and update positions
            updatedStudents.sort((a, b) => {
                const pointsA = parseFloat(a.points.replace(',', '.'));
                const pointsB = parseFloat(b.points.replace(',', '.'));
                return pointsB - pointsA;
            });

            const finalStudents = updatedStudents.map((s, index) => ({
                ...s,
                position: `${index + 1}º`,
            }));

            return {
                ...prevData,
                [classId]: {
                    ...classToUpdate,
                    students: finalStudents,
                },
            };
        });
    };

    const renderView = () => {
        switch (view) {
            case 'main-menu':
                return <MainMenuView onMenuAction={(menu) => handleViewChange(menu)} />;
            case 'classes':
                if (activeClassId && classData[activeClassId]) {
                    return <ClassView 
                                classId={activeClassId} 
                                classData={classData[activeClassId]} 
                                onBack={() => handleViewChange('classes')} 
                                onUpdate={handleAttendanceUpdate} 
                            />;
                }
                return <ClassListView 
                            classDataMap={classData}
                            onSelectClass={(classId) => handleViewChange('classes', classId)}
                            onBack={() => handleViewChange('main-menu')}
                        />;
            case 'classification':
                if (activeClassId && classificationData[activeClassId]) {
                    return <ClassificationView 
                                classId={activeClassId}
                                classificationData={classificationData[activeClassId]} 
                                onBack={() => handleViewChange('classification')}
                                onUpdate={handleClassificationUpdate}
                            />;
                }
                return <ClassificationListView 
                            classificationDataMap={classificationData}
                            onSelectClassification={(classId) => handleViewChange('classification', classId)}
                            onBack={() => handleViewChange('main-menu')}
                        />;
            case 'notation':
                return <AlgebraicNotationView onBack={() => handleViewChange('main-menu')} />;
            case 'tournament':
                 return <TournamentView onBack={() => handleViewChange('main-menu')} />;
            default:
                return <WelcomeScreen />;
        }
    };

    if (!isAuthenticated) {
        return (
            <main className="relative min-h-screen w-full">
                <Background />
                <LoginView onLoginSuccess={handleLogin} />
            </main>
        );
    }

    const activeItem = activeClassId ? `${view}-${activeClassId}` : view;

    return (
        <div className="relative min-h-screen w-full flex">
            <style>{/* CSS Variables */ `
                :root {
                    --main-bg: #1c1917;
                    --content-bg: rgba(41, 37, 36, 0.8);
                    --sidebar-bg: rgba(28, 25, 23, 0.9);
                    --sidebar-hover-bg: rgba(252, 211, 77, 0.1);
                    --card-bg: rgba(41, 37, 36, 0.6);
                    --text-on-dark: #fde68a;
                    --text-on-light: #fef3c7;
                    --text-on-sidebar: #fef3c7;
                    --text-secondary: #a8a29e;
                    --accent-color: #facc15;
                    --accent-hover: #f59e0b;
                    --border-color: rgba(250, 204, 21, 0.2);
                    --glow-color: rgba(250, 204, 21, 0.3);
                    --btn-primary-bg: #ca8a04;
                    --btn-primary-hover-bg: #a16207;
                    --btn-primary-text: #1c1917;
                    --table-header-bg: rgba(250, 204, 21, 0.1);
                    --status-win: #4ade80;
                    --status-loss: #f87171;
                    --status-draw: #60a5fa;
                }
            `}</style>
            <Background />
            
            <Sidebar
                onViewChange={handleViewChange}
                activeItem={activeItem}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                expandedMenu={expandedMenu}
                onToggleMenu={(menu) => setExpandedMenu(menu)}
                onLogout={handleLogout}
            />

            <main className="flex-1 flex flex-col p-4 md:p-6 relative z-10 md:ml-72 transition-all duration-300">
                 <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="md:hidden p-2 bg-[var(--sidebar-bg)] rounded-full fixed top-4 left-4 z-50 shadow-lg"
                    aria-label="Abrir menu"
                >
                    <HamburgerIcon className="h-6 w-6 text-[var(--accent-color)]" />
                </button>
                <div className="w-full h-full flex items-center justify-center">
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

export default App;