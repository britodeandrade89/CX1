import { Tournament, Group, PlayerStats, Match } from '../types.ts';

function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function generateRoundRobinSchedule(playerNames: string[]): Match[] {
    const schedule: Match[] = [];
    const players = [...playerNames];

    if (players.length % 2 !== 0) {
        players.push('BYE');
    }

    const numPlayers = players.length;
    const numRounds = numPlayers - 1;
    const half = numPlayers / 2;

    for (let round = 0; round < numRounds; round++) {
        for (let i = 0; i < half; i++) {
            const player1 = players[i];
            const player2 = players[numPlayers - 1 - i];
            
            const match: Match = {
                round: round + 1,
                player1: round % 2 === 1 ? player2 : player1,
                player2: round % 2 === 1 ? player1 : player2,
                result: null,
            };
            
            if (match.player1 !== 'BYE' && match.player2 !== 'BYE') {
                 schedule.push(match);
            } else if (match.player1 === 'BYE') {
                schedule.push({ ...match, player1: match.player2, player2: 'BYE' });
            } else {
                 schedule.push(match);
            }
        }

        const lastPlayer = players.pop();
        if (lastPlayer) {
            players.splice(1, 0, lastPlayer);
        }
    }

    return schedule;
}

export function createTournament(tournamentName: string, playerNames: string[]): Tournament {
    const shuffledPlayers = shuffleArray(playerNames);
    const numPlayers = shuffledPlayers.length;
    const groups: Group[] = [];
    
    if (numPlayers <= 6) {
        const playerStats: PlayerStats[] = shuffledPlayers.map(name => ({ name, points: 0, wins: 0, draws: 0, losses: 0, gamesPlayed: 0 }));
        const schedule = generateRoundRobinSchedule(shuffledPlayers);
        groups.push({ name: 'Grupo A', players: playerStats, schedule });
    } else {
        const MAX_GROUP_SIZE = 6;
        let numGroups = Math.ceil(numPlayers / MAX_GROUP_SIZE);
        const baseGroupSize = Math.floor(numPlayers / numGroups);
        let remainder = numPlayers % numGroups;

        let playerIndex = 0;
        for (let i = 0; i < numGroups; i++) {
            const groupSize = baseGroupSize + (remainder > 0 ? 1 : 0);
            const groupPlayers = shuffledPlayers.slice(playerIndex, playerIndex + groupSize);
            const playerStats: PlayerStats[] = groupPlayers.map(name => ({ name, points: 0, wins: 0, draws: 0, losses: 0, gamesPlayed: 0 }));
            const schedule = generateRoundRobinSchedule(groupPlayers);
            
            groups.push({
                name: `Grupo ${String.fromCharCode(65 + i)}`,
                players: playerStats,
                schedule
            });

            playerIndex += groupSize;
            if (remainder > 0) remainder--;
        }
    }

    const defaultRules = [
        "Tempo de Jogo: 10 minutos para cada jogador.",
        "Condições de Vitória: Xeque-mate, tempo do oponente esgotado ou 2 faltas cometidas pelo oponente.",
        "Limite de Faltas: O acúmulo de 2 faltas resulta em derrota imediata da partida.",
        "Anotação: A anotação dos lances não é obrigatória.",
        "Falta - Relógio: Esquecer de acionar o relógio após realizar um lance é considerado falta.",
        "Falta - Peça Tocada: Tocar em uma peça e não realizar um lance válido com ela é considerado falta (regra peça tocada, peça jogada).",
        "Sorteio dos Grupos: Os grupos serão definidos por sorteio automatizado no início do torneio.",
        "Formato: Fase de grupos em sistema de rodízio. O 1º colocado de cada grupo avança para a fase final. O vencedor da fase final é o campeão.",
    ];

    return {
        // FIX: Added missing 'id' property to align with the Tournament type.
        id: Date.now().toString(),
        name: tournamentName,
        players: playerNames,
        groups,
        phase: 'group',
        finalists: [],
        finalSchedule: [],
        champion: null,
        rules: defaultRules,
    };
}

export function sortPlayers(players: PlayerStats[], schedule: Match[]): PlayerStats[] {
    return [...players].sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points;
        }

        const match = schedule.find(m =>
            (m.player1 === a.name && m.player2 === b.name) ||
            (m.player1 === b.name && m.player2 === a.name)
        );

        if (match && match.result) {
            if (match.result === 'P1_WIN' && match.player1 === a.name) return -1;
            if (match.result === 'P1_WIN' && match.player1 === b.name) return 1;
            if (match.result === 'P2_WIN' && match.player2 === a.name) return -1;
            if (match.result === 'P2_WIN' && match.player2 === b.name) return 1;
        }
        
        return a.name.localeCompare(b.name);
    });
}
