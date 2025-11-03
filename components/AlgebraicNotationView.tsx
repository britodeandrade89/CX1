import React, { useState, useEffect } from 'react';
import { BackButton } from './BackButton.tsx';
import { analyzeChessGame } from '../services/geminiService.ts';
import { BookOpenIcon } from './icons/BookOpenIcon.tsx';
import { SparklesIcon } from './icons/SparklesIcon.tsx';
import { PencilIcon } from './icons/PencilIcon.tsx';

interface AlgebraicNotationViewProps {
    onBack: () => void;
}

const generatePgnFromMoves = (moves: { white: string; black: string }[]): string => {
    let pgn = `[Event "Partida Anotada"]
[Site "Clube de Xadrez"]
[Date "${new Date().toISOString().split('T')[0].replace(/-/g, '.')}"]
[Round "1"]
[White "Jogador 1"]
[Black "Jogador 2"]
[Result "*"]

`;
    
    moves.forEach((move, index) => {
        const whiteMove = move.white.trim();
        const blackMove = move.black.trim();
        if (whiteMove) {
            pgn += `${index + 1}. ${whiteMove}`;
            if (blackMove) {
                pgn += ` ${blackMove} `;
            } else {
                pgn += ' ';
            }
        }
    });
    
    return pgn.trim() + ' *';
};


export const AlgebraicNotationView: React.FC<AlgebraicNotationViewProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('anotar'); // 'aprender', 'anotar', 'analisar'
    const initialMoves = Array.from({ length: 50 }, () => ({ white: '', black: '' }));
    const [moves, setMoves] = useState(initialMoves);
    const [pgn, setPgn] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleMoveChange = (index: number, color: 'white' | 'black', value: string) => {
        const newMoves = [...moves];
        newMoves[index][color] = value;
        setMoves(newMoves);
    };

    const handleAnalyze = async () => {
        if (!pgn.trim()) {
            setError('Por favor, insira a notação da partida.');
            return;
        }
        setIsLoading(true);
        setError('');
        setAnalysis('');
        try {
            const result = await analyzeChessGame(pgn);
            setAnalysis(result);
        } catch (err) {
            setError('Ocorreu um erro ao analisar a partida. Tente novamente.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        if (activeTab === 'analisar') {
            const hasMoves = moves.some(move => move.white.trim() !== '' || move.black.trim() !== '');
            if (hasMoves) {
                const generatedPgn = generatePgnFromMoves(moves);
                setPgn(generatedPgn);
            }
        }
    }, [activeTab, moves]);

    const TabButton: React.FC<{ tabId: string; title: string; icon: React.ReactNode }> = ({ tabId, title, icon }) => (
        <button
            onClick={() => setActiveTab(tabId)}
            className={`flex-1 flex items-center justify-center gap-2 p-3 text-sm md:text-base font-bold rounded-t-lg transition-colors ${
                activeTab === tabId
                    ? 'bg-white/10 text-yellow-600 border-b-2 border-yellow-600'
                    : 'text-stone-400 hover:bg-white/5'
            }`}
        >
            {icon}
            {title}
        </button>
    );

    return (
        <div className="p-4 md:p-6 bg-stone-950/80 rounded-xl shadow-lg backdrop-blur-lg border border-stone-800 w-full max-w-4xl flex flex-col h-[90vh]">
            <BackButton onClick={onBack} />
            <div className="flex items-center mb-4">
                <BookOpenIcon className="h-8 w-8 mr-3 text-yellow-600" />
                <h1 className="text-3xl font-bold text-stone-100">Notação Algébrica</h1>
            </div>

            <div className="flex border-b border-stone-800 mb-6 flex-shrink-0">
                <TabButton tabId="anotar" title="Anotar Partida" icon={<PencilIcon className="w-5 h-5" />} />
                <TabButton tabId="analisar" title="Analisar com IA" icon={<SparklesIcon className="w-5 h-5" />} />
                <TabButton tabId="aprender" title="Aprender" icon={<BookOpenIcon className="w-5 h-5" />} />
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
                 {activeTab === 'anotar' && <NotationSheetTab moves={moves} onMoveChange={handleMoveChange} />}
                 {activeTab === 'analisar' && <AnalysisTab pgn={pgn} setPgn={setPgn} analysis={analysis} isLoading={isLoading} error={error} onAnalyze={handleAnalyze} />}
                 {activeTab === 'aprender' && <LearnNotationTab />}
            </div>
        </div>
    );
};

const NotationSheetTab: React.FC<{ moves: {white: string, black: string}[], onMoveChange: (index: number, color: 'white' | 'black', value: string) => void }> = ({ moves, onMoveChange }) => (
    <div>
        <h2 className="text-xl font-bold text-stone-100 mb-4">Planilha de Anotação</h2>
        <p className="text-stone-400 mb-6">Use esta planilha para registrar os lances de uma partida em andamento.</p>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-stone-100 uppercase bg-black/20">
                    <tr>
                        <th scope="col" className="px-3 py-3 w-12 text-center rounded-l-lg">#</th>
                        <th scope="col" className="px-3 py-3 bg-white/5">Lance das Brancas</th>
                        <th scope="col" className="px-3 py-3 rounded-r-lg">Lance das Pretas</th>
                    </tr>
                </thead>
                <tbody>
                    {moves.map((move, index) => (
                        <tr key={index} className="border-b border-stone-800">
                            <td className="px-3 py-1 text-center font-medium text-stone-400">{index + 1}.</td>
                            <td className="bg-white/5">
                                <input
                                    type="text"
                                    value={move.white}
                                    onChange={(e) => onMoveChange(index, 'white', e.target.value)}
                                    className="w-full bg-transparent p-2 focus:outline-none focus:bg-white/10 rounded"
                                    aria-label={`Lance das brancas para a jogada ${index + 1}`}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={move.black}
                                    onChange={(e) => onMoveChange(index, 'black', e.target.value)}
                                    className="w-full bg-transparent p-2 focus:outline-none focus:bg-white/10 rounded"
                                    aria-label={`Lance das pretas para a jogada ${index + 1}`}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const AnalysisTab: React.FC<{ pgn: string; setPgn: (value: string) => void; analysis: string; isLoading: boolean; error: string; onAnalyze: () => void; }> = ({ pgn, setPgn, analysis, isLoading, error, onAnalyze }) => (
    <div>
        <p className="text-stone-400 mb-4">
            A partida que você anotou foi convertida para o formato PGN. Você pode editar ou colar outra partida abaixo e clicar para analisar.
        </p>
        <div className="space-y-4">
            <textarea
                value={pgn}
                onChange={(e) => setPgn(e.target.value)}
                placeholder="Ex: 1. e4 e5 2. Nf3 Nc6 3. Bb5 a6..."
                className="w-full h-48 p-4 bg-white/5 rounded-lg border border-stone-800 focus:ring-2 focus:ring-yellow-600 focus:outline-none text-stone-100 resize-y"
                aria-label="Notação da partida de xadrez"
            />
            <button
                onClick={onAnalyze}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 font-bold text-stone-900 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? ( <> <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> <span>Analisando...</span> </> ) 
                : ( <> <SparklesIcon className="w-6 h-6" /> <span>Analisar Partida</span> </> )}
            </button>
        </div>
        {error && <div className="mt-6 p-4 bg-red-500/20 text-red-300 rounded-lg">{error}</div>}
        {analysis && (
            <div className="mt-8 p-6 bg-white/5 rounded-lg border border-stone-800">
                <h2 className="text-2xl font-bold text-stone-100 mb-4">Análise da IA</h2>
                <div
                    className="text-lg leading-relaxed text-stone-400 space-y-4"
                    dangerouslySetInnerHTML={{ __html: analysis }}
                />
            </div>
        )}
    </div>
);

const LearnNotationTab = () => (
    <div>
        <h2 className="text-xl font-bold text-stone-100 mb-4">Aprendendo a Notação Algébrica</h2>
        <div className="space-y-6 text-stone-400">
            <div>
                <h3 className="text-lg font-semibold text-stone-100 mb-2">As Peças</h3>
                <ul className="list-disc list-inside space-y-1 pl-2">
                    <li><strong className="text-white">R</strong> - Rei (King)</li>
                    <li><strong className="text-white">D</strong> - Dama (Queen)</li>
                    <li><strong className="text-white">T</strong> - Torre (Rook)</li>
                    <li><strong className="text-white">B</strong> - Bispo (Bishop)</li>
                    <li><strong className="text-white">C</strong> - Cavalo (Knight)</li>
                    <li>Nenhuma letra para o <strong className="text-white">Peão</strong> (Pawn)</li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-stone-100 mb-2">Símbolos Especiais</h3>
                 <ul className="list-disc list-inside space-y-1 pl-2">
                    <li><strong className="text-white">x</strong> - Captura (ex: <strong className="text-white">Bxe5</strong>, o Bispo captura a peça em e5)</li>
                    <li><strong className="text-white">0-0</strong> - Roque pequeno (lado do Rei)</li>
                    <li><strong className="text-white">0-0-0</strong> - Roque grande (lado da Dama)</li>
                    <li><strong className="text-white">+</strong> - Xeque</li>
                    <li><strong className="text-white">#</strong> ou <strong className="text-white">++</strong> - Xeque-mate</li>
                    <li><strong className="text-white">e.p.</strong> - Captura *en passant*</li>
                    <li><strong className="text-white">=D</strong> - Promoção do peão para Dama (pode ser outra peça)</li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-stone-100 mb-2">Como Ler um Lance</h3>
                <p>A estrutura básica é: <strong className="text-white">[Peça][Casa de Destino]</strong>.</p>
                <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
                    <li><strong className="text-white">e4</strong>: O peão se move para a casa e4. (Peões não usam letra).</li>
                    <li><strong className="text-white">Cf3</strong>: O cavalo se move para a casa f3.</li>
                    <li><strong className="text-white">Txd4</strong>: A torre captura a peça na casa d4.</li>
                </ul>
            </div>
        </div>
    </div>
);