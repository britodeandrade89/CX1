import React from 'react';
import type { Match, MatchResult } from '../types';
import { MatchRow } from './TournamentView';
import { TrophyIcon } from './icons/TrophyIcon';

type MatchWithIndex = Match & { originalIndex: number };

interface NextMatchesProps {
    round: number;
    matches: MatchWithIndex[];
    onUpdate: (matchIndex: number, result: MatchResult) => void;
}

export const NextMatches: React.FC<NextMatchesProps> = ({ round, matches, onUpdate }) => {
    if (matches.length === 0) {
        return null;
    }

    return (
        <div className="mb-8 p-4 bg-yellow-900/50 rounded-lg border border-yellow-800">
            <h3 className="text-xl font-bold text-yellow-300 mb-3 flex items-center gap-3">
                <TrophyIcon className="w-6 h-6" />
                Próximos Jogos - Rodada {round}
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-stone-400">
                    <thead className="text-xs text-stone-100 uppercase bg-black/20">
                        <tr>
                            <th scope="col" className="px-4 py-2 font-semibold text-right rounded-l-lg w-2/5">Brancas</th>
                            <th scope="col" className="px-2 py-2 font-semibold text-center w-1/5">Resultado</th>
                            <th scope="col" className="px-4 py-2 font-semibold text-left rounded-r-lg w-2/5">Pretas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match) => (
                            <MatchRow
                                key={`${match.player1}-${match.player2}-${match.originalIndex}`}
                                match={match}
                                onUpdate={(result) => onUpdate(match.originalIndex, result)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};