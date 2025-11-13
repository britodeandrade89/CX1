import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, enableIndexedDbPersistence, onSnapshot } from 'firebase/firestore';
import { saveDataToGithub, loadDataFromGithub } from './services/githubService';

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
import { GitHubSyncModal } from './components/GitHubSyncModal';
import type { ClassDataMap, ClassificationDataMap, ActivityLogData, Tournament, GithubConfig } from './types';
import { initialClassData, initialClassificationData } from './constants';
import { activityLogData as initialActivityLogData } from './activityLogData';
import { LogoIcon } from './components/icons/LogoIcon';

// --- Firebase Setup ---
const firebaseConfig = {
  apiKey: "AIzaSyD6Z97rMtCz3QHYBgvencJyyasU_UZUnC4",
  authDomain: "clube-do-xadrez.firebaseapp.com",
  projectId: "clube-do-xadrez",
  storageBucket: "clube-do-xadrez.firebasestorage.app",
  messagingSenderId: "299343156201",
  appId: "1:299343156201:web:68dfc841878ea394e87178",
  measurementId: "G-91RPKDDMRG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn("Firebase persistence failed, likely due to multiple tabs being open.");
    } else if (err.code === 'unimplemented') {
      console.warn("This browser does not support Firebase offline persistence.");
    }
  });

const DATA_DOC_ID = 'appData';
const DATA_COLLECTION_ID = 'main';
const docRef = doc(db, DATA_COLLECTION_ID, DATA_DOC_ID);

interface AppData {
    classData: ClassDataMap;
    classificationData: ClassificationDataMap;
    activityLog: ActivityLogData;
    tournaments: Record<string, Tournament>;
}

const saveDataToFirebase = async (data: AppData): Promise<void> => {
    try {
        await setDoc(docRef, data);
        console.log("Data saved to Firebase (or queued for offline sync).");
    } catch (error) {
        console.error("Error saving data to Firebase:", error);
        throw error;
    }
};

// --- End Firebase Setup ---

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

type SyncStatus = 'idle' | 'loading' | 'syncing' | 'synced' | 'error';

const AuthLoadingScreen: React.FC = () => (
    <main className="relative w-screen h-screen font-poppins flex items-center justify-center">
        <Background />
        <div className="flex flex-col items-center animate-pulse">
            <LogoIcon className="h-24 w-24 text-yellow-600" />
            <p className="mt-4 text-lg text-stone-300">Conectando...</p>
        </div>
    </main>
);

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [view, setView] = useState<View>('welcome');
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
    const [classData, setClassData] = useState<ClassDataMap>({});
    const [classificationData, setClassificationData] = useState<ClassificationDataMap>({});
    const [activityLog, setActivityLog] = useState<ActivityLogData>(initialActivityLogData);
    const [tournaments, setTournaments] = useState<Record<string, Tournament>>({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
    const debounceTimer = useRef<number | null>(null);
    const isSyncingFromFirebase = useRef(false);
    const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
    const [githubConfig, setGithubConfig] = useState<GithubConfig | null>(null);

    // Effect for Firebase authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Effect for loading initial local data once authenticated
    useEffect(() => {
        if (user) {
            const storedConfig = localStorage.getItem('githubConfig');
            if (storedConfig) {
                setGithubConfig(JSON.parse(storedConfig));
            }
            // Instantly load from local storage for a fast UI response
            try {
                const localClassData = JSON.parse(localStorage.getItem('classData') || 'null');
                const localClassificationData = JSON.parse(localStorage.getItem('classificationData') || 'null');
                const localActivityLog = JSON.parse(localStorage.getItem('activityLogData') || 'null');
                const localTournaments = JSON.parse(localStorage.getItem('tournaments') || 'null');
                setClassData(localClassData || initialClassData);
                setClassificationData(localClassificationData || initialClassificationData);
                setActivityLog(localActivityLog || initialActivityLogData);
                setTournaments(localTournaments || {});
            } catch {
                setClassData(initialClassData);
                setClassificationData(initialClassificationData);
                setActivityLog(initialActivityLogData);
                setTournaments({});
            }
        }
    }, [user]);

    // Effect for real-time Firebase synchronization
    useEffect(() => {
        if (!user) {
            return;
        }

        setSyncStatus('loading');
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                isSyncingFromFirebase.current = true; // Set flag to prevent immediate write-back
                const firebaseData = docSnap.data() as AppData;
                const { classData: fbClass, classificationData: fbClassification, activityLog: fbLog, tournaments: fbTournaments } = firebaseData;

                setClassData(fbClass || initialClassData);
                setClassificationData(fbClassification || initialClassificationData);
                setActivityLog(fbLog || initialActivityLogData);
                setTournaments(fbTournaments || {});
                
                console.log(`Data synced from Firebase. (From cache: ${docSnap.metadata.fromCache})`);
                setSyncStatus('synced');
            } else {
                console.log("No data in Firebase. Local data will be saved on next change.");
                setSyncStatus('idle'); 
            }
        }, (error) => {
            console.error("Firebase onSnapshot listener error:", error);
            setSyncStatus('error');
        });

        return () => unsubscribe();
    }, [user]);
    
    // Auto-save to localStorage and Firebase whenever data changes
    useEffect(() => {
        // If the state was just updated by Firebase, reset the flag and skip saving to prevent a loop.
        if (isSyncingFromFirebase.current) {
            isSyncingFromFirebase.current = false;
            return;
        }

        if (!user) return;

        setSyncStatus('syncing');
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = window.setTimeout(async () => {
            try {
                const allData: AppData = {
                    classData,
                    classificationData,
                    activityLog,
                    tournaments,
                };
                // Persist to localStorage for fast reloads
                localStorage.setItem('classData', JSON.stringify(classData));
                localStorage.setItem('classificationData', JSON.stringify(classificationData));
                localStorage.setItem('activityLogData', JSON.stringify(activityLog));
                localStorage.setItem('tournaments', JSON.stringify(tournaments));
                
                // Persist to Firebase
                await saveDataToFirebase(allData);
            } catch (error) {
                setSyncStatus('error');
                console.error("Auto-sync failed:", error);
            }
        }, 1500);

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [classData, classificationData, activityLog, tournaments, user]);


    const handleLoginSuccess = async () => {
        if (isLoggingIn) return;

        setIsLoggingIn(true);
        setLoginError(null); // Clear previous errors
        try {
            await signInAnonymously(auth);
        } catch (error: any) {
            console.error("Anonymous sign-in failed", error);
            if (error.code === 'auth/configuration-not-found') {
                const errorMessage = "Falha na Autenticação: Login anônimo não ativado.\n\n" +
                    "Para corrigir, por favor, ative o login anônimo no seu painel do Firebase:\n\n" +
                    "1. Abra o Console do Firebase do projeto 'clube-do-xadrez'.\n" +
                    "2. No menu, vá em 'Authentication'.\n" +
                    "3. Clique na aba 'Sign-in method' (Método de login).\n" +
                    "4. Na lista, encontre 'Anônimo' e clique para editar.\n" +
                    "5. Ative o provedor e salve.\n\n" +
                    "Depois, atualize esta página e tente entrar novamente.";
                setLoginError(errorMessage);
            } else {
                setLoginError(`Falha na autenticação. Por favor, verifique sua conexão. (Erro: ${error.message})`);
            }
            setIsLoggingIn(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setView('welcome');
            setClassData({});
            setClassificationData({});
            setActivityLog(initialActivityLogData);
            setTournaments({});
        } catch (error) {
            console.error("Sign out failed", error);
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
    }

    const handleUpdateTournaments = (updater: React.SetStateAction<Record<string, Tournament>>) => {
        setTournaments(prevState => {
            const newState = typeof updater === 'function'
                ? (updater as (prevState: Record<string, Tournament>) => Record<string, Tournament>)(prevState)
                : updater;
            return newState;
        });
    };

    const handleSaveGithubConfig = (config: GithubConfig) => {
        setGithubConfig(config);
        localStorage.setItem('githubConfig', JSON.stringify(config));
        alert('Configuração do GitHub salva com sucesso!');
    };

    const handleSyncToGithub = async (config: GithubConfig) => {
        handleSaveGithubConfig(config);
        try {
            const allData = { classData, classificationData, activityLog, tournaments };
            await saveDataToGithub(config, allData);
            alert('Backup salvo no GitHub com sucesso!');
            setIsGithubModalOpen(false);
        } catch (error: any) {
            console.error("Erro ao salvar no GitHub:", error);
            alert(`Falha ao salvar no GitHub: ${error.message}`);
        }
    };

    const handleLoadFromGithub = async (config: GithubConfig) => {
        handleSaveGithubConfig(config);
        if (!window.confirm("Isso substituirá todos os seus dados locais. Deseja continuar?")) {
            return;
        }
        try {
            const loadedData = await loadDataFromGithub(config);
            if (loadedData) {
                setClassData(loadedData.classData || initialClassData);
                setClassificationData(loadedData.classificationData || initialClassificationData);
                setActivityLog(loadedData.activityLog || initialActivityLogData);
                setTournaments(loadedData.tournaments || {});
                alert('Dados carregados do GitHub com sucesso! Sincronizando com a nuvem...');
                setIsGithubModalOpen(false);
            }
        } catch (error: any) {
            console.error("Erro ao carregar do GitHub:", error);
            alert(`Falha ao carregar do GitHub: ${error.message}`);
        }
    };

    const renderView = () => {
        switch (view) {
            case 'classes':
                return <ClassListView classDataMap={classData} onSelectClass={(id) => { setSelectedClassId(id); setView('class-view'); }} onBack={() => setView('welcome')} />;
            case 'class-view':
                return selectedClassId && classData[selectedClassId] ? <ClassView classId={selectedClassId} classData={classData[selectedClassId]} onBack={() => setView('classes')} onUpdate={handleUpdateAttendance} /> : <MainMenuView setView={(v) => setView(v as View)} />;
            case 'classifications':
                return <ClassificationListView classificationDataMap={classificationData} onSelectClassification={(id) => { setSelectedClassId(id); setView('classification-view'); }} onBack={() => setView('welcome')} />;
            case 'classification-view':
                 return selectedClassId && classificationData[selectedClassId] ? <ClassificationView classId={selectedClassId} classificationData={classificationData[selectedClassId]} onBack={() => setView('classifications')} onUpdate={handleUpdateClassification} /> : <MainMenuView setView={(v) => setView(v as View)} />;
            case 'tournament':
                return <TournamentView onBack={() => setView('welcome')} tournaments={tournaments} setTournaments={handleUpdateTournaments} />;
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
    
    if (authLoading) {
        return <AuthLoadingScreen />;
    }

    if (!user) {
        return (
            <main className="relative w-screen h-screen font-poppins">
                <Background />
                <LoginView onLoginSuccess={handleLoginSuccess} error={loginError} isLoading={isLoggingIn} />
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
                syncStatus={syncStatus}
                onOpenGithubModal={() => setIsGithubModalOpen(true)}
            />
            
            <main className="flex-1 p-4 md:p-6 flex justify-center items-start overflow-y-auto mt-16 md:mt-0">
                {renderView()}
            </main>

            <GitHubSyncModal
                isOpen={isGithubModalOpen}
                onClose={() => setIsGithubModalOpen(false)}
                onSave={handleSaveGithubConfig}
                onLoad={handleLoadFromGithub}
                onSync={handleSyncToGithub}
                currentConfig={githubConfig}
            />
        </div>
    );
};

export default App;
