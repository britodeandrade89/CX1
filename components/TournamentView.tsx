import React, { useState, useMemo, useEffect } from 'react';
import type { Tournament, PlayerStats, Match, MatchResult, Group } from '../types';
import { createTournament, sortPlayers } from '../utils/tournamentLogic';
import { BackButton } from './BackButton.tsx';
import { TrophyIcon } from './icons/TrophyIcon.tsx';
import { PlusIcon } from './icons/PlusIcon.tsx';
import { Modal } from './Modal.tsx';
import { PencilIcon } from './icons/PencilIcon.tsx';
import { DocumentTextIcon } from './icons/DocumentTextIcon.tsx';
import { TrashIcon } from './icons/TrashIcon.tsx';

// Props
interface TournamentViewProps {
    onBack: () => void;
}

const TournamentSetup: React.FC<{ onStart: (name: string, playerCount: number) => void }> = ({ onStart }) => {
    const [tournamentName, setTournamentName] = useState('');
    const [playerCount, setPlayerCount] = useState(4);
    const [error, setError] = useState<string | null>(null);

    const handleStart = () => {
        if (!tournamentName.trim()) {
            setError('Por favor, dê um nome ao torneio.');
            return;
        }
        if (playerCount < 3 || playerCount > 64) {
            setError('O número de jogadores deve ser entre 3 e 64.');
            return;
        }
        setError(null);
        onStart(tournamentName, playerCount);
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center text-stone-100 mb-6">Criar Novo Torneio</h2>
            {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-center">{error}</div>}
            
            <div className="space-y-6">
                <div>
                    <label htmlFor="tournament-name" className="block text-sm font-medium text-stone-400 mb-2">Nome do Torneio</label>
                    <input
                        id="tournament-name"
                        type="text"
                        value={tournamentName}
                        onChange={(e) => setTournamentName(e.target.value)}
                        placeholder="Ex: Copa Escolar de Xadrez"
                        className="w-full p-3 bg-white/5 rounded-lg border border-stone-800 focus:ring-2 focus:ring-yellow-600 focus:outline-none text-stone-100"
                    />
                </div>

                <div>
                    <label htmlFor="player-count" className="block text-sm font-medium text-stone-400 mb-2">Número de Participantes</label>
                    <input
                        id="player-count"
                        type="number"
                        min="3"
                        max="64"
                        value={playerCount}
                        onChange={(e) => setPlayerCount(parseInt(e.target.value, 10))}
                        className="w-full p-3 bg-white/5 rounded-lg border border-stone-800 focus:ring-2 focus:ring-yellow-600 focus:outline-none text-stone-100"
                    />
                </div>

                <button
                    onClick={handleStart}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 font-bold text-stone-900 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors duration-300 text-lg"
                >
                    <PlusIcon className="w-6 h-6" />
                    Gerar Torneio
                </button>
            </div>
        </div>
    );
};

const EditPlayersModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    players: string[];
    onSave: (nameMap: Record<string, string>) => void;
}> = ({ isOpen, onClose, players, onSave }) => {
    const [playerNames, setPlayerNames] = useState<Record<string, string>>({});

    React.useEffect(() => {
        if (isOpen) {
            const initialNames = players.reduce((acc, name) => {
                acc[name] = name;
                return acc;
            }, {} as Record<string, string>);
            setPlayerNames(initialNames);
        }
    }, [isOpen, players]);

    const handleNameChange = (originalName: string, newName: string) => {
        setPlayerNames(prev => ({ ...prev, [originalName]: newName }));
    };

    const handleSaveChanges = () => {
        const changes = Object.entries(playerNames).reduce((acc: Record<string, string>, [original, current]: [string, string]) => {
            if (original !== current) {
                acc[original] = current;
            }
            return acc;
        }, {});
        onSave(changes);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar Nomes dos Jogadores">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {players.map(originalName => (
                    <div key={originalName}>
                        <label className="block text-sm font-medium text-stone-400 mb-1">{originalName}</label>
                        <input
                            type="text"
                            value={playerNames[originalName] || ''}
                            onChange={(e) => handleNameChange(originalName, e.target.value)}
                            className="w-full p-2 bg-white/10 rounded-lg border border-stone-800 focus:ring-2 focus:ring-yellow-600 focus:outline-none text-stone-100"
                        />
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-stone-100 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">Cancelar</button>
                <button onClick={handleSaveChanges} className="px-4 py-2 text-sm font-bold text-stone-900 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors">Salvar Alterações</button>
            </div>
        </Modal>
    );
};

const PlayerRanking: React.FC<{ players: PlayerStats[], schedule: Match[] }> = ({ players, schedule }) => {
    const sorted = useMemo(() => sortPlayers(players, schedule), [players, schedule]);
    
    return (
        <div className="mb-8">
            <h3 className="text-xl font-bold text-stone-100 mb-4">Classificação</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-stone-400">
                    <thead className="text-xs text-stone-100 uppercase bg-black/20">
                        <tr>
                            <th scope="col" className="px-4 py-3 rounded-l-lg font-semibold w-12 text-center">#</th>
                            <th scope="col" className="px-4 py-3 font-semibold">Jogador</th>
                            <th scope="col" className="px-4 py-3 font-semibold text-center">Pts</th>
                            <th scope="col" className="px-4 py-3 font-semibold text-center">V</th>
                            <th scope="col" className="px-4 py-3 font-semibold text-center">E</th>
                            <th scope="col" className="px-4 py-3 font-semibold text-center">D</th>
                            <th scope="col" className="px-4 py-3 rounded-r-lg font-semibold text-center">J</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((player, index) => (
                            <tr key={player.name} className="bg-white/5 border-b border-stone-800">
                                <td className="px-4 py-3 text-center font-medium text-stone-100">{index + 1}</td>
                                <td className="px-4 py-3 font-medium text-stone-100 whitespace-nowrap">{player.name}</td>
                                <td className="px-4 py-3 text-center font-bold text-yellow-600">{player.points}</td>
                                <td className="px-4 py-3 text-center text-green-400">{player.wins}</td>
                                <td className="px-4 py-3 text-center text-blue-400">{player.draws}</td>
                                <td className="px-4 py-3 text-center text-red-400">{player.losses}</td>
                                <td className="px-4 py-3 text-center">{player.gamesPlayed}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const MatchRow: React.FC<{ match: Match, onUpdate: (result: MatchResult) => void }> = ({ match, onUpdate }) => {
    if (match.player1 === 'BYE' || match.player2 === 'BYE') {
        const playingPlayer = match.player1 === 'BYE' ? match.player2 : match.player1;
        return (
             <tr className="bg-white/5 border-b border-stone-800 opacity-60">
                <td colSpan={3} className="px-4 py-3 text-center italic">{playingPlayer} descansa nesta rodada.</td>
            </tr>
        );
    }
    
    const getButtonClass = (isActive: boolean) =>
        `px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            isActive ? 'bg-yellow-600 text-stone-900' : 'bg-white/10 hover:bg-white/20'
        }`;

    return (
        <tr className="bg-white/5 border-b border-stone-800">
            <td className="px-4 py-3 font-medium text-right text-stone-100 w-2/5">{match.player1}</td>
            <td className="px-2 py-3 text-center w-1/5">
                <div className="flex justify-center items-center gap-2">
                    <button onClick={() => onUpdate('P1_WIN')} className={getButtonClass(match.result === 'P1_WIN')}>V1</button>
                    <button onClick={() => onUpdate('DRAW')} className={getButtonClass(match.result === 'DRAW')}>E</button>
                    <button onClick={() => onUpdate('P2_WIN')} className={getButtonClass(match.result === 'P2_WIN')}>V2</button>
                </div>
            </td>
            <td className="px-4 py-3 font-medium text-left text-stone-100 w-2/5">{match.player2}</td>
        </tr>
    );
};

const MatchSchedule: React.FC<{ schedule: Match[], onUpdate: (matchIndex: number, result: MatchResult) => void }> = ({ schedule, onUpdate }) => {
    const matchesByRound = schedule.reduce((acc, match, index) => {
        const round = `Rodada ${match.round}`;
        if (!acc[round]) {
            acc[round] = [];
        }
        acc[round].push({ ...match, originalIndex: index });
        return acc;
    }, {} as Record<string, (Match & { originalIndex: number })[]>);

    return (
        <div>
            <h3 className="text-xl font-bold text-stone-100 mb-4">Confrontos</h3>
            {Object.entries(matchesByRound).map(([round, matches]: [string, (Match & { originalIndex: number })[]]) => (
                <div key={round} className="mb-6">
                    <h4 className="text-lg font-semibold text-stone-100 mb-3">{round}</h4>
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
                                        key={`${match.player1}-${match.player2}`}
                                        match={match}
                                        onUpdate={(result) => onUpdate(match.originalIndex, result)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

const GroupStage: React.FC<{ tournament: Tournament, setTournament: React.Dispatch<React.SetStateAction<Tournament>> }> = ({ tournament, setTournament }) => {
    
    const handleUpdateResult = (groupIndex: number, matchIndex: number, newResult: MatchResult) => {
        setTournament(prev => {
            if (!prev) return prev;

            const newGroups = prev.groups.map((group, gIdx) => {
                if (gIdx !== groupIndex) return group;

                const matchToUpdate = group.schedule[matchIndex];
                const oldResult = matchToUpdate.result;

                const updatedPlayers = group.players.map(p => {
                    if (p.name !== matchToUpdate.player1 && p.name !== matchToUpdate.player2) {
                        return p;
                    }
                    
                    let newP = { ...p };

                    // Revert old stats
                    if (oldResult) {
                        newP.gamesPlayed--;
                        if (oldResult === 'P1_WIN') {
                            if (p.name === matchToUpdate.player1) { newP.wins--; newP.points--; }
                            if (p.name === matchToUpdate.player2) { newP.losses--; }
                        } else if (oldResult === 'P2_WIN') {
                            if (p.name === matchToUpdate.player2) { newP.wins--; newP.points--; }
                            if (p.name === matchToUpdate.player1) { newP.losses--; }
                        } else if (oldResult === 'DRAW') {
                            newP.draws--; newP.points -= 0.5;
                        }
                    }

                    // Apply new stats
                    if (newResult) {
                        newP.gamesPlayed++;
                        if (newResult === 'P1_WIN') {
                            if (p.name === matchToUpdate.player1) { newP.wins++; newP.points++; }
                            if (p.name === matchToUpdate.player2) { newP.losses++; }
                        } else if (newResult === 'P2_WIN') {
                            if (p.name === matchToUpdate.player2) { newP.wins++; newP.points++; }
                            if (p.name === matchToUpdate.player1) { newP.losses++; }
                        } else if (newResult === 'DRAW') {
                            newP.draws++; newP.points += 0.5;
                        }
                    }
                    return newP;
                });

                const updatedSchedule = group.schedule.map((match, mIdx) => {
                    if (mIdx !== matchIndex) return match;
                    return { ...match, result: newResult };
                });
                
                return {
                    ...group,
                    players: updatedPlayers,
                    schedule: updatedSchedule,
                };
            });

            return { ...prev, groups: newGroups };
        });
    };

    return (
        <>
            {tournament.groups.map((group, groupIndex) => (
                <div key={group.name} className="mb-12">
                    <h2 className="text-2xl font-bold text-yellow-600 mb-6 pb-2 border-b-2 border-stone-800">{group.name}</h2>
                    <PlayerRanking players={group.players} schedule={group.schedule} />
                    <MatchSchedule schedule={group.schedule} onUpdate={(matchIndex, result) => handleUpdateResult(groupIndex, matchIndex, result)} />
                </div>
            ))}
        </>
    );
};


const TournamentListView: React.FC<{
    tournaments: Tournament[];
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onNew: () => void;
    onBack: () => void;
}> = ({ tournaments, onSelect, onDelete, onNew, onBack }) => {
    return (
        <div className="p-4 md:p-6 bg-stone-950/80 rounded-xl shadow-lg backdrop-blur-lg border border-stone-800 w-full max-w-4xl">
            <BackButton onClick={onBack} />
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 -mt-6">
                <h1 className="text-3xl font-bold text-stone-100">Gerenciar Torneios</h1>
                <button onClick={onNew} className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-stone-900 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors">
                    <PlusIcon className="w-5 h-5" /> Criar Novo Torneio
                </button>
            </div>
            {tournaments.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-stone-400">Nenhum torneio salvo.</p>
                    <p className="text-stone-400">Clique em 'Criar Novo Torneio' para começar.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {tournaments.map(t => (
                        <div key={t.id} className="bg-white/5 p-4 rounded-lg flex items-center justify-between border border-stone-800 hover:border-stone-700 transition-colors">
                            <div>
                                <h2 className="text-xl font-bold text-stone-100">{t.name}</h2>
                                <p className="text-sm text-stone-400">{t.players.length} participantes</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => onDelete(t.id)} aria-label={`Excluir torneio ${t.name}`} className="p-2 text-red-400 hover:bg-red-500/20 rounded-full transition-colors">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                                <button onClick={() => onSelect(t.id)} className="px-4 py-2 text-sm font-bold text-stone-900 bg-yellow-600/80 rounded-lg hover:bg-yellow-600 transition-colors">
                                    Abrir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const TournamentManagementView: React.FC<{
    initialTournament: Tournament;
    onUpdate: (tournament: Tournament) => void;
    onBack: () => void;
}> = ({ initialTournament, onUpdate, onBack }) => {
    const [tournament, setTournament] = useState<Tournament>(initialTournament);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditingRules, setIsEditingRules] = useState(false);
    const [rulesText, setRulesText] = useState('');

    useEffect(() => {
        onUpdate(tournament);
    }, [tournament, onUpdate]);

    useEffect(() => {
        setRulesText(tournament.rules.join('\n'));
    }, [tournament.rules]);

    const handleSavePlayerNames = (nameMap: Record<string, string>) => {
        setTournament(prev => {
            if (!prev) return prev;
            
            const updateName = (oldName: string): string => nameMap[oldName] || oldName;

            const newTournament: Tournament = {
                ...prev,
                players: prev.players.map(updateName),
                groups: prev.groups.map(group => ({
                    ...group,
                    players: group.players.map(p => ({
                        ...p,
                        name: updateName(p.name)
                    })),
                    schedule: group.schedule.map(m => ({
                        ...m,
                        player1: updateName(m.player1),
                        player2: updateName(m.player2)
                    })),
                })),
                finalists: prev.finalists.map(p => ({
                    ...p,
                    name: updateName(p.name)
                })),
                finalSchedule: prev.finalSchedule.map(m => ({
                    ...m,
                    player1: updateName(m.player1),
                    player2: updateName(m.player2)
                })),
                champion: prev.champion ? updateName(prev.champion) : null,
            };

            return newTournament;
        });
    };

    const handleSaveRules = () => {
        setTournament(prev => {
            if (!prev) return prev;
            const newRules = rulesText.split('\n').filter(rule => rule.trim() !== '');
            return { ...prev, rules: newRules };
        });
        setIsEditingRules(false);
    };

    const handleCancelEditRules = () => {
        setRulesText(tournament?.rules.join('\n') || '');
        setIsEditingRules(false);
    };

    return (
        <div className="p-4 md:p-6 bg-stone-950/80 rounded-xl shadow-lg backdrop-blur-lg border border-stone-800 w-full max-w-5xl">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                    <BackButton onClick={onBack} text="Voltar à Lista" />
                    <div className="flex items-center gap-4">
                        <TrophyIcon className="h-10 w-10 text-yellow-600" />
                        <h1 className="text-3xl md:text-4xl font-bold text-stone-100">{tournament.name}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-stone-900 bg-yellow-600/80 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        <PencilIcon className="w-5 h-5" />
                        Editar Jogadores
                    </button>
                </div>
            </div>

            <div className="mb-8 p-6 bg-white/5 rounded-lg border border-stone-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-stone-100 flex items-center gap-3">
                        <DocumentTextIcon className="w-6 h-6" />
                        Regras do Torneio
                    </h3>
                    {!isEditingRules && (
                        <button
                            onClick={() => setIsEditingRules(true)}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-stone-900 bg-yellow-600/80 rounded-lg hover:bg-yellow-600 transition-colors"
                        >
                            <PencilIcon className="w-4 h-4" />
                            Editar
                        </button>
                    )}
                </div>

                {isEditingRules ? (
                    <div>
                        <textarea
                            value={rulesText}
                            onChange={(e) => setRulesText(e.target.value)}
                            placeholder="Digite cada regra em uma nova linha."
                            className="w-full h-40 p-3 bg-white/5 rounded-lg border border-stone-800 focus:ring-2 focus:ring-yellow-600 focus:outline-none text-stone-100 resize-y"
                        />
                        <div className="mt-4 flex justify-end gap-4">
                            <button onClick={handleCancelEditRules} className="px-4 py-2 text-sm font-medium text-stone-100 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">Cancelar</button>
                            <button onClick={handleSaveRules} className="px-4 py-2 text-sm font-bold text-stone-900 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors">Salvar Regras</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        {tournament.rules && tournament.rules.length > 0 ? (
                            <ul className="list-disc list-inside space-y-2 text-stone-400 pl-2">
                                {tournament.rules.map((rule, index) => (
                                    <li key={index}>{rule}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-stone-400 italic">Nenhuma regra foi adicionada a este torneio.</p>
                        )}
                    </div>
                )}
            </div>
            
            <GroupStage tournament={tournament} setTournament={setTournament} />

            <EditPlayersModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                players={tournament.players}
                onSave={handleSavePlayerNames}
            />
        </div>
    );
};

export const TournamentView: React.FC<TournamentViewProps> = ({ onBack }) => {
    type ViewState = 'list' | 'setup' | 'manage';
    const [view, setView] = useState<ViewState>('list');
    const [tournaments, setTournaments] = useState<Record<string, Tournament>>({});
    const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);

    useEffect(() => {
        try {
            const savedTournaments = localStorage.getItem('tournaments');
            if (savedTournaments) {
                setTournaments(JSON.parse(savedTournaments));
            } else {
                // Migration from old single-tournament format
                const oldTournament = localStorage.getItem('tournament');
                if (oldTournament) {
                    const parsedOld = JSON.parse(oldTournament);
                    if (parsedOld && !parsedOld.id) { // Check if it's the old format without an ID
                        const newId = Date.now().toString();
                        const newTournamentWithId: Tournament = { id: newId, ...parsedOld };
                        const newTournamentsMap = { [newId]: newTournamentWithId };
                        setTournaments(newTournamentsMap);
                        localStorage.removeItem('tournament');
                    }
                }
            }
        } catch (e) {
            console.error("Failed to load tournament data from localStorage", e);
        }
    }, []);

    useEffect(() => {
        try {
            if (Object.keys(tournaments).length > 0) {
                localStorage.setItem('tournaments', JSON.stringify(tournaments));
            } else {
                localStorage.removeItem('tournaments'); // Clean up if no tournaments left
            }
        } catch (e) {
            console.error("Failed to save tournament data to localStorage", e);
        }
    }, [tournaments]);

    const handleCreateNew = (name: string, playerCount: number) => {
        const players = Array.from({ length: playerCount }, (_, i) => `Jogador ${i + 1}`);
        // FIX: Refactor to directly use the complete tournament object returned by createTournament.
        const newTournament = createTournament(name, players);
        setTournaments(prev => ({ ...prev, [newTournament.id]: newTournament }));
        setSelectedTournamentId(newTournament.id);
        setView('manage');
    };

    const handleSelectTournament = (id: string) => {
        setSelectedTournamentId(id);
        setView('manage');
    };

    const handleDeleteTournament = (id: string) => {
        if (window.confirm("Tem certeza que deseja excluir este torneio? Esta ação não pode ser desfeita.")) {
            setTournaments(prev => {
                const newTournaments = { ...prev };
                delete newTournaments[id];
                return newTournaments;
            });
        }
    };

    const handleUpdateTournament = (updatedTournament: Tournament) => {
        setTournaments(prev => ({
            ...prev,
            [updatedTournament.id]: updatedTournament,
        }));
    };

    const handleBackToList = () => {
        setSelectedTournamentId(null);
        setView('list');
    };

    if (view === 'setup') {
        return (
            <div className="p-4 md:p-6 bg-stone-950/80 rounded-xl shadow-lg backdrop-blur-lg border border-stone-800 w-full max-w-2xl">
                <BackButton onClick={() => setView('list')} />
                <TournamentSetup onStart={handleCreateNew} />
            </div>
        );
    }

    if (view === 'manage' && selectedTournamentId) {
        const selectedTournament = tournaments[selectedTournamentId];
        return <TournamentManagementView
            initialTournament={selectedTournament}
            onUpdate={handleUpdateTournament}
            onBack={handleBackToList}
        />;
    }

    return (
        <TournamentListView
            // FIX: Explicitly type the sort function parameters to resolve the 'unknown' type error.
            tournaments={Object.values(tournaments).sort((a: Tournament, b: Tournament) => b.id.localeCompare(a.id))}
            onSelect={handleSelectTournament}
            onDelete={handleDeleteTournament}
            onNew={() => setView('setup')}
            onBack={onBack}
        />
    );
};
