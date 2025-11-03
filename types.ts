// --- FIX: Added missing types for Class & Classification Views ---
// These types were missing, causing import errors in `constants.ts`, `components/ClassView.tsx`, and `components/ClassificationView.tsx`.
export interface Student {
    id: number;
    name: string;
    attendance: Record<string, 'P' | 'F'>;
}

export interface ClassData {
    name: string;
    dates: string[];
    students: Student[];
}

export interface ClassDataMap {
    [key: string]: ClassData;
}

export interface ClassificationStudent {
    position: string;
    name: string;
    points: string;
    wins: number;
    losses: number;
    draws: number;
}

export interface ClassificationData {
    name: string;
    students: ClassificationStudent[];
}

export interface ClassificationDataMap {
    [key: string]: ClassificationData;
}

// FIX: Add missing types for Tournament feature.
// These types were missing, causing import errors in `components/TournamentView.tsx` and `utils/tournamentLogic.ts`.
export type MatchResult = 'P1_WIN' | 'P2_WIN' | 'DRAW' | null;

export interface PlayerStats {
    name: string;
    points: number;
    wins: number;
    draws: number;
    losses: number;
    gamesPlayed: number;
}

export interface Match {
    round: number;
    player1: string;
    player2: string;
    result: MatchResult;
}

export interface Group {
    name: string;
    players: PlayerStats[];
    schedule: Match[];
}

export interface Tournament {
    name: string;
    players: string[];
    groups: Group[];
    phase: 'group' | 'knockout';
    finalists: PlayerStats[];
    finalSchedule: Match[];
    champion: string | null;
    rules: string[];
}

// --- Added types for Ementa View ---
export interface EmentaHeader {
    government: string;
    city: string;
    department: string;
    school: string;
    axis: string;
    professor: string;
    project: string;
}

export interface EmentaCourseInfo {
    name: string;
    targetAudience: string;
    prerequisite: string;
    objective: string;
}

export interface EmentaTopic {
    id: string;
    title: string;
    observation: string;
}

export interface EmentaModule {
    title: string;
    topics: EmentaTopic[];
}

export interface EmentaSectionItem {
    title: string;
    description: string;
}


export interface EmentaSection {
    title: string;
    items: EmentaSectionItem[];
}

export interface EmentaData {
    header: EmentaHeader;
    courseInfo: EmentaCourseInfo;
    modules: EmentaModule[];
    methodology: EmentaSection;
    evaluation: EmentaSection;
    didacticResources: EmentaSection;
    finalConsiderations: {
        title: string;
        text: string;
    };
}