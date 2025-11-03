import React, { useState } from 'react';
import { BackButton } from './BackButton';
import { Chessboard, getPieceComponent } from './Chessboard';
import { ChessIcon } from './icons/ChessIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import type { Position, Square, PieceSymbol, PieceColor } from '../types';

interface PlayGameViewProps {
    onBack: () => void;
}

const initialBoardPosition: Position = {
    'a1': 'wr', 'b1': 'wn', 'c1': 'wb', 'd1': 'wq', 'e1': 'wk', 'f1': 'wb', 'g1': 'wn', 'h1': 'wr',
    'a2': 'wp', 'b2': 'wp', 'c2': 'wp', 'd2': 'wp', 'e2': 'wp', 'f2': 'wp', 'g2': 'wp', 'h2': 'wp',
    'a8': 'br', 'b8': 'bn', 'c8': 'bb', 'd8': 'bq', 'e8': 'bk', 'f8': 'bb', 'g8': 'bn', 'h8': 'br',
    'a7': 'bp', 'b7': 'bp', 'c7': 'bp', 'd7': 'bp', 'e7': 'bp', 'f7': 'bp', 'g7': 'bp', 'h7': 'bp',
};

const PlayerDisplay: React.FC<{ name: string; isTurn: boolean; capturedPieces: PieceSymbol[] }> = ({ name, isTurn, capturedPieces }) => (
    <div className={`p-3 rounded-lg transition-all duration-300 ${isTurn ? 'bg-yellow-600/20 border-yellow-600' : 'bg-white/5 border-transparent'} border-2`}>
        <div className="flex items-center gap-3">
            <UserCircleIcon className={`w-8 h-8 ${isTurn ? 'text-yellow-600' : 'text-stone-400'}`} />
            <span className={`text-lg font-bold ${isTurn ? 'text-white' : 'text-stone-300'}`}>{name}</span>
        </div>
        <div className="mt-2 h-8 flex flex-wrap gap-1">
            {capturedPieces.map((piece, index) => (
                <div key={index} className="w-6 h-6">
                    {getPieceComponent(piece)}
                </div>
            ))}
        </div>
    </div>
);

export const PlayGameView: React.FC<PlayGameViewProps> = ({ onBack }) => {
    const [board, setBoard] = useState<Position>(initialBoardPosition);
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('w');
    const [captured, setCaptured] = useState<{ w: PieceSymbol[], b: PieceSymbol[] }>({ w: [], b: [] });

    const handleSquareClick = (square: Square) => {
        if (selectedSquare) {
            const pieceAtOrigin = board[selectedSquare];
            const pieceAtDestination = board[square];
            
            // Don't allow capturing own piece
            if (pieceAtDestination && pieceAtDestination[0] === pieceAtOrigin![0]) {
                 setSelectedSquare(square); // Select the new piece instead
                 return;
            }

            // Move piece
            const newBoard = { ...board };
            delete newBoard[selectedSquare];
            newBoard[square] = pieceAtOrigin;
            setBoard(newBoard);
            
            // Handle capture
            if (pieceAtDestination) {
                const capturedColor = pieceAtDestination[0] as PieceColor;
                setCaptured(prev => ({
                    ...prev,
                    [capturedColor]: [...prev[capturedColor], pieceAtDestination]
                }));
            }

            // Switch player and deselect
            setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w');
            setSelectedSquare(null);

        } else {
            const piece = board[square];
            if (piece && piece[0] === currentPlayer) {
                setSelectedSquare(square);
            }
        }
    };

    const handleReset = () => {
        if (window.confirm("Tem certeza que deseja reiniciar a partida?")) {
            setBoard(initialBoardPosition);
            setCurrentPlayer('w');
            setSelectedSquare(null);
            setCaptured({ w: [], b: [] });
        }
    };

    return (
        <div className="p-4 md:p-6 bg-stone-950/80 rounded-xl shadow-lg backdrop-blur-lg border border-stone-800 w-full max-w-7xl">
            <BackButton onClick={onBack} />
            <div className="flex items-center gap-3 -mt-6 mb-4">
                <ChessIcon className="h-8 w-8 text-yellow-600" />
                <h1 className="text-3xl font-bold text-stone-100">Jogar Xadrez</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-grow">
                    <Chessboard
                        position={board}
                        onSquareClick={handleSquareClick}
                        selectedSquare={selectedSquare}
                    />
                </div>
                <div className="lg:w-64 flex flex-col gap-4">
                    <PlayerDisplay name="Pretas" isTurn={currentPlayer === 'b'} capturedPieces={captured.b} />
                    <div className="flex-grow"></div>
                    <button 
                        onClick={handleReset}
                        className="w-full px-4 py-3 font-bold text-stone-100 bg-red-600/80 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Reiniciar Partida
                    </button>
                    <PlayerDisplay name="Brancas" isTurn={currentPlayer === 'w'} capturedPieces={captured.w} />
                </div>
            </div>
        </div>
    );
};