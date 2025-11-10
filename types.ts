// types.ts

export interface Student {
    id: number;
    name: string;
    attendance: { [date: string]: 'P' | 'F' };
}

export interface ClassData {
    name: string;
    dates: string[];
    students: Student[];
}

export interface ClassDataMap {
    [classId: string]: ClassData;
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
    [classId: string]: ClassificationData;
}

// Tournament types
export type MatchResult = 'P1_WIN' | 'P2_WIN' | 'DRAW' | null;

export interface Match {
    round: number;
    player1: string;
    player2: string;
    result: MatchResult;
}

export interface PlayerStats {
    name: string;
    points: number;
    wins: number;
    draws: number;
    losses: number;
    gamesPlayed: number;
}

export interface Group {
    name: string;
    players: PlayerStats[];
    schedule: Match[];
}

export interface Tournament {
    id: string;
    name: string;
    players: string[];
    groups: Group[];
    phase: 'group' | 'final';
    finalists: PlayerStats[];
    finalSchedule: Match[];
    champion: string | null;
    rules: string[];
}

// Ementa types
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

export interface EmentaFinalConsiderations {
    title: string;
    text: string;
}

export interface EmentaData {
    header: EmentaHeader;
    courseInfo: EmentaCourseInfo;
    modules: EmentaModule[];
    methodology: EmentaSection;
    evaluation: EmentaSection;
    didacticResources: EmentaSection;
    finalConsiderations: EmentaFinalConsiderations;
}

// Activity Log types
export interface ActivityLogHeader {
    government: string;
    city: string;
    department: string;
    school: string;
    axis: string;
    professor: string;
    project: string;
}

export interface ActivityLogEntry {
    date: string;
    activities: string[];
}

export interface ActivityLogData {
    title: string;
    header: ActivityLogHeader;
    log: ActivityLogEntry[];
}

// Checkmate Exercises types
export type PieceType = 'k' | 'q' | 'r' | 'b' | 'n' | 'p';
export type PieceColor = 'w' | 'b';
export type PieceSymbol = `${PieceColor}${PieceType}`;
export type Square = `${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'}${_Digit}`;
type _Digit = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

export type Position = { [key in Square]?: PieceSymbol };

export interface CheckmateExercise {
    id: number;
    difficulty: 'Fácil' | 'Médio' | 'Difícil';
    position: Position;
    turn: PieceColor;
    solution: {
        move: string;
        comment: string;
    };
    description: string;
}

// FIX: Added missing GithubConfig type for GitHub synchronization feature.
export interface GithubConfig {
    username: string;
    repo: string;
    token: string;
}
