import React, { useState } from 'react';
import { BackButton } from './BackButton.tsx';
import { Chessboard } from './Chessboard.tsx';
import { checkmateExercisesData } from '../checkmateExercisesData.ts';
import type { CheckmateExercise } from '../types.ts';
import { KnightIcon } from './icons/KnightIcon.tsx';
import { ChevronDownIcon } from './icons/ChevronDownIcon.tsx';

interface CheckmateExercisesViewProps {
    onBack: () => void;
}

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'Fácil': return 'text-green-400 border-green-400/50';
        case 'Médio': return 'text-yellow-400 border-yellow-400/50';
        case 'Difícil': return 'text-red-400 border-red-400/50';
        default: return 'text-gray-400 border-gray-400/50';
    }
};

const ExerciseItem: React.FC<{ exercise: CheckmateExercise }> = ({ exercise }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <div className="bg-black/20 p-4 rounded-lg flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 lg:w-2/5">
                <Chessboard position={exercise.position} orientation={exercise.turn === 'w' ? 'white' : 'black'} />
                <p className="text-center text-sm mt-2 text-stone-400">
                    {exercise.turn === 'w' ? 'Brancas' : 'Pretas'} jogam.
                </p>
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-lg text-stone-100">Problema #{exercise.id}</h4>
                <p className="text-stone-400 mt-1 mb-4">{exercise.description}</p>
                
                {showSolution && (
                    <div className="p-3 bg-black/20 rounded-lg mb-4 animate-fade-in border border-white/10">
                        <h5 className="font-bold text-yellow-600">Solução: {exercise.solution.move}</h5>
                        <p className="text-stone-400 text-sm mt-1">{exercise.solution.comment}</p>
                    </div>
                )}
                <button
                    onClick={() => setShowSolution(!showSolution)}
                    className="w-full px-4 py-2 font-bold text-sm text-stone-900 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors duration-200"
                >
                    {showSolution ? 'Esconder Solução' : 'Mostrar Solução'}
                </button>
            </div>
        </div>
    );
};


export const CheckmateExercisesView: React.FC<CheckmateExercisesViewProps> = ({ onBack }) => {
    const [openDifficulty, setOpenDifficulty] = useState<'Fácil' | 'Médio' | 'Difícil' | null>('Fácil');
    
    const exercisesByDifficulty = {
        'Fácil': checkmateExercisesData.filter(e => e.difficulty === 'Fácil'),
        'Médio': checkmateExercisesData.filter(e => e.difficulty === 'Médio'),
        'Difícil': checkmateExercisesData.filter(e => e.difficulty === 'Difícil'),
    };

    const toggleDifficulty = (difficulty: 'Fácil' | 'Médio' | 'Difícil') => {
        setOpenDifficulty(openDifficulty === difficulty ? null : difficulty);
    };

    return (
        <div className="p-4 md:p-6 bg-stone-950/80 rounded-xl shadow-lg backdrop-blur-lg border border-stone-800 w-full max-w-6xl flex flex-col h-[90vh]">
            <BackButton onClick={onBack} />
            <div className="flex items-center gap-3 -mt-6 mb-4 flex-shrink-0">
                <KnightIcon className="h-8 w-8 text-yellow-600" />
                <h1 className="text-2xl font-bold text-stone-100">Exercícios de Xeque-Mate</h1>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                {(['Fácil', 'Médio', 'Difícil'] as const).map(difficulty => (
                    <div key={difficulty} className="bg-white/5 rounded-lg border border-stone-800">
                        <button
                            onClick={() => toggleDifficulty(difficulty)}
                            className="w-full flex justify-between items-center p-4 text-left"
                        >
                            <h2 className={`text-xl font-bold ${getDifficultyColor(difficulty).split(' ')[0]}`}>{difficulty} ({exercisesByDifficulty[difficulty].length} exercícios)</h2>
                            <ChevronDownIcon className={`w-6 h-6 transition-transform ${openDifficulty === difficulty ? 'rotate-180' : ''}`} />
                        </button>
                        {openDifficulty === difficulty && (
                            <div className="p-4 border-t border-stone-800 space-y-4">
                                {exercisesByDifficulty[difficulty].map(exercise => (
                                    <ExerciseItem key={exercise.id} exercise={exercise} />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};