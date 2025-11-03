import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainMenuView } from './components/MainMenuView';
import { ClassListView } from './components/ClassListView';
import { ClassView } from './components/ClassView';
import { ClassificationListView } from './components/ClassificationListView';
import { ClassificationView } from './components/ClassificationView';
import { TournamentView } from './components/TournamentView';
import { AlgebraicNotationView } from './components/AlgebraicNotationView';
import { CheckmateExercisesView } from './components/CheckmateExercisesView';
import { EmentaView } from './components/EmentaView';
import { ActivityLogView } from './components/ActivityLogView';
import { PlayGameView } from './components/PlayGameView'; // Import the new view
import { LoginView } from './components/LoginView';
import { Background } from './components/Background';
import { HamburgerIcon } from './components/icons/HamburgerIcon';
import { XIcon } from './components/icons/XIcon';
import type { ClassDataMap, ClassificationDataMap, ActivityLogData } from './types';
import { initialClassData, initialClassificationData } from './constants';
import { activityLogData as initialActivityLogData } from './activityLogData';

type View =
  | 'welcome'
  | 'classes'
  | 'class-view'
  | 'classifications'
  | 'classification-view'
  | 'tournament'
  | 'algebraic-notation'
  | 'checkmate-exercises'
  | 'ementa'
  | 'activity-log'
  | 'play-game'; // Add the new view type

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [view, setView] = useState<View>('welcome');
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
    const [classData, setClassData] = useState<ClassDataMap>({});
    const [classificationData, setClassificationData] = useState<ClassificationDataMap>({});
    const [activityLog, setActivityLog] = useState<ActivityLogData>(initialActivityLogData);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isAuthenticated');
        if (loggedIn === 'true') {
            setIsAuthenticated(true);
        }

        // Robust data loading from localStorage
        try {
            const savedClassData = localStorage.getItem('classData');
            if (savedClassData) {
                setClassData(JSON.parse(savedClassData));
            } else {
                setClassData(initialClassData);
            }
        } catch (error) {
            console.error("Failed to load class data, falling back to initial data.", error);
            setClassData(initialClassData);
        }

        try {
            const savedClassificationData = localStorage.getItem('classificationData');
            if (savedClassificationData) {
                setClassificationData(JSON.parse(savedClassificationData));
            } else {
                setClassificationData(initialClassificationData);
            }
        } catch (error) {
            console.error("Failed to load classification data, falling back to initial data.", error);
            setClassificationData(initialClassificationData);
        }
        
        try {
            const savedActivityLog = localStorage.getItem('activityLogData');
            if (savedActivityLog) {
                setActivityLog(JSON.parse(savedActivityLog));
            } else {
                setActivityLog(initialActivityLogData);
            }
        } catch (error) {
            console.error("Failed to load activity log, falling back to initial data.", error);
            setActivityLog(initialActivityLogData);
        }

    }, []);

    const handleLoginSuccess = () => {
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
        setView('welcome');
    };

    const handleUpdateAttendance = (classId: string, studentId: number, date: string, status: 'P' | 'F') => {
        setClassData(prevData => {
            const newClassData = JSON.parse(JSON.stringify(prevData));
            const student = newClassData[classId].students.find((s: any) => s.id === studentId);
            if (student) {
                if (!newClassData[classId].dates.includes(date)) {
                     newClassData[classId].dates.push(date);
                }
                student.attendance[date] = status;
            }
            return newClassData;
        });
    };

    const handleUpdateClassification = (classId: string, studentIndex: number, newStats: { wins: number; draws: number; losses: number }) => {
        setClassificationData(prevData => {
            const newData = JSON.parse(JSON.stringify(prevData));
            const student = newData[classId].students[studentIndex];
            if (student) {
                student.wins = newStats.wins;
                student.draws = newStats.draws;
                student.losses = newStats.losses;
                const points = (student.wins * 1) + (student.draws * 0.5);
                student.points = points.toLocaleString('pt-BR');
            }
            newData[classId].students.sort((a: any, b: any) => parseFloat(b.points.replace(',', '.')) - parseFloat(a.points.replace(',', '.')));
            return newData;
        });
    };

    const handleUpdateActivityLog = (newLogData: ActivityLogData) => {
        setActivityLog(newLogData);
        localStorage.setItem('activityLogData', JSON.stringify(newLogData));
    }

    const saveData = (): boolean => {
        try {
            localStorage.setItem('classData', JSON.stringify(classData));
            localStorage.setItem('classificationData', JSON.stringify(classificationData));
            return true;
        } catch (error) {
            console.error("Failed to save data to localStorage", error);
            return false;
        }
    };


    const renderView = () => {
        switch (view) {
            case 'classes':
                return <ClassListView classDataMap={classData} onSelectClass={(id) => { setSelectedClassId(id); setView('class-view'); }} onBack={() => setView('welcome')} />;
            case 'class-view':
                return selectedClassId && classData[selectedClassId] ? <ClassView classId={selectedClassId} classData={classData[selectedClassId]} onBack={() => setView('classes')} onUpdate={handleUpdateAttendance} onSave={saveData} /> : <MainMenuView setView={(v) => setView(v as View)} />;
            case 'classifications':
                return <ClassificationListView classificationDataMap={classificationData} onSelectClassification={(id) => { setSelectedClassId(id); setView('classification-view'); }} onBack={() => setView('welcome')} />;
            case 'classification-view':
                 return selectedClassId && classificationData[selectedClassId] ? <ClassificationView classId={selectedClassId} classificationData={classificationData[selectedClassId]} onBack={() => setView('classifications')} onUpdate={handleUpdateClassification} onSave={saveData} /> : <MainMenuView setView={(v) => setView(v as View)} />;
            case 'tournament':
                return <TournamentView onBack={() => setView('welcome')} />;
            case 'algebraic-notation':
                return <AlgebraicNotationView onBack={() => setView('welcome')} />;
            case 'checkmate-exercises':
                return <CheckmateExercisesView onBack={() => setView('welcome')} />;
            case 'ementa':
                return <EmentaView onBack={() => setView('welcome')} />;
            case 'activity-log':
                return <ActivityLogView onBack={() => setView('welcome')} activityLogData={activityLog} onUpdate={handleUpdateActivityLog} />;
            case 'play-game':
                return <PlayGameView onBack={() => setView('welcome')} />;
            case 'welcome':
            default:
                return <MainMenuView setView={(v) => setView(v as View)} />;
        }
    };
    
    if (!isAuthenticated) {
        return (
            <main className="relative w-screen h-screen font-poppins">
                <Background />
                <LoginView onLoginSuccess={handleLoginSuccess} />
            </main>
        );
    }

    return (
        <div className="relative w-screen h-screen font-poppins flex text-stone-200">
            <Background />

            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-stone-900/90 backdrop-blur-lg border-b border-stone-800 p-4 flex items-center justify-between h-[72px]">
                 <span className="text-lg font-bold">Painel de Xadrez</span>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1">
                    {isSidebarOpen ? <XIcon className="w-6 h-6" /> : <HamburgerIcon className="w-6 h-6" />}
                </button>
            </header>

            <Sidebar
                setView={(v) => {
                    setView(v as View);
                    setIsSidebarOpen(false);
                }}
                onLogout={handleLogout}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            
            <main className="flex-1 p-4 md:p-6 flex justify-center items-start overflow-y-auto mt-16 md:mt-0">
                {renderView()}
            </main>
        </div>
    );
};

export default App;