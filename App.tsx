import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, enableIndexedDbPersistence } from 'firebase/firestore';

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
import type { ClassDataMap, ClassificationDataMap, ActivityLogData, Tournament } from './types';
import { initialClassData, initialClassificationData } from './constants';
import { activityLogData as initialActivityLogData } from './activityLogData';

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
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // This can happen if multiple tabs are open. Persistence will still work in the primary tab.
      console.warn("Firebase persistence failed, likely due to multiple tabs being open.");
    } else if (err.code === 'unimplemented') {
      // The browser doesn't support the necessary features.
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

const loadDataFromFirebase = async (): Promise<AppData | null> => {
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log(`Data loaded from Firebase. (From cache: ${docSnap.metadata.fromCache})`);
            return docSnap.data() as AppData;
        }
        console.log("No data found in Firebase.");
        return null;
    } catch (error) {
        console.error("Error loading data from Firebase:", error);
        return null;
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

type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [view, setView] = useState<View>('welcome');
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
    const [classData, setClassData] = useState<ClassDataMap>({});
    const [classificationData, setClassificationData] = useState<ClassificationDataMap>({});
    const [activityLog, setActivityLog] = useState<ActivityLogData>(initialActivityLogData);
    const [tournaments, setTournaments] = useState<Record<string, Tournament>>({});
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
    const debounceTimer = useRef<number | null>(null);

    useEffect(() => {
        const loggedIn = localStorage.getItem('isAuthenticated');
        if (loggedIn === 'true') {
            setIsAuthenticated(true);
            
            const loadData = async () => {
                const firebaseData = await loadDataFromFirebase();
                if (firebaseData) {
                    setClassData(firebaseData.classData || initialClassData);
                    setClassificationData(firebaseData.classificationData || initialClassificationData);
                    setActivityLog(firebaseData.activityLog || initialActivityLogData);
                    setTournaments(firebaseData.tournaments || {});
                    setSyncStatus('synced');
                } else {
                    // Fallback to localStorage if Firebase is unavailable or empty
                    console.log("Falling back to localStorage.");
                    try {
                        const savedClassData = localStorage.getItem('classData');
                        setClassData(savedClassData ? JSON.parse(savedClassData) : initialClassData);
                        const savedClassificationData = localStorage.getItem('classificationData');
                        setClassificationData(savedClassificationData ? JSON.parse(savedClassificationData) : initialClassificationData);
                        const savedActivityLog = localStorage.getItem('activityLogData');
                        setActivityLog(savedActivityLog ? JSON.parse(savedActivityLog) : initialActivityLogData);
                        const savedTournaments = localStorage.getItem('tournaments');
                        setTournaments(savedTournaments ? JSON.parse(savedTournaments) : {});
                    } catch (error) {
                         console.error("Failed to load data from localStorage, falling back to initial data.", error);
                         setClassData(initialClassData);
                         setClassificationData(initialClassificationData);
                         setActivityLog(initialActivityLogData);
                         setTournaments({});
                    }
                }
            };
            loadData();
        }
    }, []);
    
    // Auto-save to Firebase whenever data changes
    useEffect(() => {
        if (Object.keys(classData).length === 0 && Object.keys(tournaments).length === 0) {
            return;
        }
        if (syncStatus === 'idle' && !isAuthenticated) return;

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
                await saveDataToFirebase(allData);
                setSyncStatus('synced');
            } catch (error) {
                setSyncStatus('error');
                console.error("Auto-sync failed:", error);
            }
        }, 2000); // 2-second debounce

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [classData, classificationData, activityLog, tournaments, isAuthenticated]);


    const handleLoginSuccess = () => {
        localStorage.setItem('isAuthenticated', 'true');
        window.location.reload(); // Reload to trigger initial data load correctly
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
            localStorage.setItem('classData', JSON.stringify(newClassData)); // Also save to local for offline resilience
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
            localStorage.setItem('classificationData', JSON.stringify(newData)); // Also save to local for offline resilience
            return newData;
        });
    };

    const handleUpdateActivityLog = (newLogData: ActivityLogData) => {
        setActivityLog(newLogData);
        localStorage.setItem('activityLogData', JSON.stringify(newLogData)); // Also save to local for offline resilience
    }

    const handleUpdateTournaments = (newTournaments: Record<string, Tournament>) => {
        setTournaments(newTournaments);
        localStorage.setItem('tournaments', JSON.stringify(newTournaments)); // Also save to local for offline resilience
    }

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
                syncStatus={syncStatus}
            />
            
            <main className="flex-1 p-4 md:p-6 flex justify-center items-start overflow-y-auto mt-16 md:mt-0">
                {renderView()}
            </main>
        </div>
    );
};

export default App;