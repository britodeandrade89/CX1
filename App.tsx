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
import { PlayGameView } from './components/PlayGameView';
import { LoginView } from './components/LoginView';
import { Background } from './components/Background';
import { HamburgerIcon } from './components/icons/HamburgerIcon';
import { XIcon } from './components/icons/XIcon';
import type { ClassDataMap, ClassificationDataMap, ActivityLogData, GithubConfig } from './types';
import { initialClassData, initialClassificationData } from './constants';
import { activityLogData as initialActivityLogData } from './activityLogData';
import { GitHubSyncModal } from './components/GitHubSyncModal';
import { saveDataToGithub, loadDataFromGithub } from './services/githubService';

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
  | 'play-game';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [view, setView] = useState<View>('welcome');
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
    const [classData, setClassData] = useState<ClassDataMap>({});
    const [classificationData, setClassificationData] = useState<ClassificationDataMap>({});
    const [activityLog, setActivityLog] = useState<ActivityLogData>(initialActivityLogData);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
    const [githubConfig, setGithubConfig] = useState<GithubConfig | null>(null);


    useEffect(() => {
        const loggedIn = localStorage.getItem('isAuthenticated');
        if (loggedIn === 'true') {
            setIsAuthenticated(true);
        }

        try {
            const savedClassData = localStorage.getItem('classData');
            setClassData(savedClassData ? JSON.parse(savedClassData) : initialClassData);
        } catch (error) {
            console.error("Failed to load class data, falling back to initial data.", error);
            setClassData(initialClassData);
        }

        try {
            const savedClassificationData = localStorage.getItem('classificationData');
            setClassificationData(savedClassificationData ? JSON.parse(savedClassificationData) : initialClassificationData);
        } catch (error) {
            console.error("Failed to load classification data, falling back to initial data.", error);
            setClassificationData(initialClassificationData);
        }
        
        try {
            const savedActivityLog = localStorage.getItem('activityLogData');
            setActivityLog(savedActivityLog ? JSON.parse(savedActivityLog) : initialActivityLogData);
        } catch (error) {
            console.error("Failed to load activity log, falling back to initial data.", error);
            setActivityLog(initialActivityLogData);
        }

        try {
            const savedGithubConfig = localStorage.getItem('githubConfig');
            if (savedGithubConfig) {
                setGithubConfig(JSON.parse(savedGithubConfig));
            }
        } catch (error) {
            console.error("Failed to load github config.", error);
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
    
    const handleSaveConfig = (config: GithubConfig) => {
        setGithubConfig(config);
        localStorage.setItem('githubConfig', JSON.stringify(config));
        setIsGithubModalOpen(false);
        alert('Configuração salva com sucesso! Agora você pode salvar seus dados na nuvem.');
    };

    const handleTriggerSync = async () => {
        if (!githubConfig || !githubConfig.token) {
            setIsGithubModalOpen(true);
            return;
        }

        const tournaments = JSON.parse(localStorage.getItem('tournaments') || '{}');

        const allData = {
            classData,
            classificationData,
            activityLog,
            tournaments,
        };

        try {
            await saveDataToGithub(githubConfig, allData);
            alert('Backup realizado com sucesso no seu repositório do GitHub!');
        } catch (error) {
            console.error(error);
            alert(`Falha ao salvar no GitHub: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
    };

    const handleLoadFromCloud = async (config: GithubConfig) => {
        if (!window.confirm("Isso substituirá todos os seus dados locais pelos dados do GitHub. Deseja continuar?")) {
            return;
        }

        try {
            const data = await loadDataFromGithub(config);
            if (data) {
                // Update state
                setClassData(data.classData);
                setClassificationData(data.classificationData);
                setActivityLog(data.activityLog);

                // Update localStorage
                localStorage.setItem('classData', JSON.stringify(data.classData));
                localStorage.setItem('classificationData', JSON.stringify(data.classificationData));
                localStorage.setItem('activityLogData', JSON.stringify(data.activityLog));
                localStorage.setItem('tournaments', JSON.stringify(data.tournaments));
                
                setIsGithubModalOpen(false);
                alert('Dados carregados com sucesso! O aplicativo será recarregado.');
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            alert(`Falha ao carregar dados do GitHub: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
        }
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
                onSaveToCloud={handleTriggerSync}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            
            <main className="flex-1 p-4 md:p-6 flex justify-center items-start overflow-y-auto mt-16 md:mt-0">
                {renderView()}
            </main>
            
            <GitHubSyncModal
                isOpen={isGithubModalOpen}
                onClose={() => setIsGithubModalOpen(false)}
                onSave={handleSaveConfig}
                onLoad={handleLoadFromCloud}
                currentConfig={githubConfig}
            />
        </div>
    );
};

export default App;