import React from 'react';
import type { Position, Square, PieceSymbol } from '../types';
import { BishopBIcon } from './icons/pieces/BishopBIcon';
import { BishopWIcon } from './icons/pieces/BishopWIcon';
import { KingBIcon } from './icons/pieces/KingBIcon';
import { KingWIcon } from './icons/pieces/KingWIcon';
import { KnightBIcon } from './icons/pieces/KnightBIcon';
import { KnightWIcon } from './icons/pieces/KnightWIcon';
import { PawnBIcon } from './icons/pieces/PawnBIcon';
import { PawnWIcon } from './icons/pieces/PawnWIcon';
import { QueenBIcon } from './icons/pieces/QueenBIcon';
import { QueenWIcon } from './icons/pieces/QueenWIcon';
import { RookBIcon } from './icons/pieces/RookBIcon';
import { RookWIcon } from './icons/pieces/RookWIcon';


const pieceComponents: Record<PieceSymbol, React.FC<React.SVGProps<SVGSVGElement>>> = {
    'wp': PawnWIcon, 'wr': RookWIcon, 'wn': KnightWIcon, 'wb': BishopWIcon, 'wq': QueenWIcon, 'wk': KingWIcon,
    'bp': PawnBIcon, 'br': RookBIcon, 'bn': KnightBIcon, 'bb': BishopBIcon, 'bq': QueenBIcon, 'bk': KingBIcon,
};

const getPieceComponent = (piece: PieceSymbol | undefined) => {
    if (!piece) return null;
    const Component = pieceComponents[piece];
    return <Component className="w-full h-full" />;
};


interface ChessboardProps {
    position: Position;
    orientation?: 'white' | 'black';
}

export const Chessboard: React.FC<ChessboardProps> = ({ position, orientation = 'white' }) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];

    const boardRanks = orientation === 'white' ? [...ranks].reverse() : ranks;
    const boardFiles = orientation === 'white' ? files : [...files].reverse();

    return (
        <div className="aspect-square w-full max-w-[600px] grid grid-cols-8 shadow-2xl border-2 border-amber-900">
            {boardRanks.map((rank, rankIndex) =>
                boardFiles.map((file, fileIndex) => {
                    const square = `${file}${rank}` as Square;
                    const isLight = (rankIndex + fileIndex) % 2 === 0;
                    return (
                        <div
                            key={square}
                            className={`aspect-square flex items-center justify-center ${isLight ? 'bg-amber-200' : 'bg-amber-700'}`}
                        >
                            <div className="w-[85%] h-[85%] relative z-10">
                                {getPieceComponent(position[square])}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};