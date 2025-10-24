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


// --- FIX: Replaced old tournament types with new, consistent types ---
// The new components (`components/TournamentView.tsx`, `utils/tournamentLogic.ts`) use a different data structure for tournaments,
// matches, and players than the old `App.tsx`. The original types caused conflicts. These new types align with the modern implementation,
// fixing property-not-found errors, type mismatches (e.g., MatchResult values), and incorrect data structures (e.g., `groups` is now an array).

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
    rankChange?: 'up' | 'down' | 'same' | null;
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
    phase: 'group' | 'final' | 'finished';
    finalists: PlayerStats[];
    finalSchedule: Match[];
    champion: string | null;
    rules: string[];
}
