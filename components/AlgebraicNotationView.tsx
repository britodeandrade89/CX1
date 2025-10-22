import React, { useState } from 'react';
import { KingIcon } from './icons/KingIcon.tsx';
import { KnightIcon } from './icons/KnightIcon.tsx';
import { PawnNotationIcon } from './icons/PawnNotationIcon.tsx';
import { BookOpenIcon } from './icons/BookOpenIcon.tsx';
import { DocumentTextIcon } from './icons/DocumentTextIcon.tsx';
import { BackButton } from './BackButton.tsx';

const NotationCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white/5 p-6 rounded-lg shadow-sm h-full border border-white/10">
        <div className="flex items-center mb-3">
            <div className="text-[var(--accent-color)] mr-3">{icon}</div>
            <h3 className="text-xl font-bold text-[var(--text-on-dark)]">{title}</h3>
        </div>
        <div className="text-[var(--text-secondary)] space-y-2">
            {children}
        </div>
    </div>
);

const NotationSheet: React.FC = () => {
    const rows = Array.from({ length: 110 }, (_, i) => i + 1);

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-[var(--text-secondary)]">
                <thead className="text-xs text-[var(--text-on-dark)] uppercase bg-[var(--table-header-bg)]">
                    <tr>
                        <th scope="col" className="px-2 py-3 w-12 text-center rounded-l-lg font-semibold">Nº</th>
                        <th scope="col" className="px-2 py-3 font-semibold">Brancas</th>
                        <th scope="col" className="px-2 py-3 rounded-r-lg font-semibold">Pretas</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(rowNum => (
                        <tr key={rowNum} className="bg-white/5 border-b border-[var(--border-color)]">
                            <td className="px-2 py-2 text-center font-semibold text-[var(--text-on-dark)]">{rowNum}</td>
                            <td className="p-0">
                                <input 
                                    type="text"
                                    aria-label={`Lance das brancas, jogada ${rowNum}`}
                                    className="w-full h-full p-2 bg-transparent focus:outline-none focus:bg-white/10 text-[var(--text-on-dark)]"
                                />
                            </td>
                            <td className="p-0 bg-black/20">
                                <input 
                                    type="text" 
                                    aria-label={`Lance das pretas, jogada ${rowNum}`}
                                    className="w-full h-full p-2 bg-transparent focus:outline-none focus:bg-white/10 text-[var(--text-on-dark)]"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

interface AlgebraicNotationViewProps {
    onBack: () => void;
}

export const AlgebraicNotationView: React.FC<AlgebraicNotationViewProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<'info' | 'sheet'>('info');

    return (
        <div className="p-4 md:p-6 bg-[var(--content-bg)] rounded-xl shadow-lg backdrop-blur-lg border border-[var(--border-color)]">
            <BackButton onClick={onBack} />
            <div className="flex items-center mb-6">
                <BookOpenIcon className="h-8 w-8 mr-3 text-[var(--accent-color)]" />
                <h1 className="text-3xl font-bold text-[var(--text-on-dark)]">Notação Algébrica</h1>
            </div>

            <div className="flex border-b border-[var(--border-color)] mb-6">
                <button
                    onClick={() => setActiveTab('info')}
                    aria-current={activeTab === 'info'}
                    className={`px-4 py-2 text-base md:text-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent-color)] rounded-t-md ${
                        activeTab === 'info'
                            ? 'text-[var(--accent-color)] border-b-2 border-[var(--accent-color)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-on-dark)]'
                    }`}
                >
                    Aprender
                </button>
                <button
                    onClick={() => setActiveTab('sheet')}
                    aria-current={activeTab === 'sheet'}
                    className={`px-4 py-2 text-base md:text-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--accent-color)] rounded-t-md ${
                        activeTab === 'sheet'
                            ? 'text-[var(--accent-color)] border-b-2 border-[var(--accent-color)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-on-dark)]'
                    }`}
                >
                    Anotar Partida
                </button>
            </div>

            {activeTab === 'info' && (
                <div key="info-tab">
                    <p className="mb-8 text-lg text-[var(--text-secondary)]">
                        A notação algébrica é o sistema padrão para registrar os lances em uma partida de xadrez. Dominá-la é essencial para estudar partidas, analisar seus próprios jogos e se comunicar com outros enxadristas.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <NotationCard icon={<PawnNotationIcon className="w-8 h-8" />} title="As Peças">
                            <p>Cada peça é representada por uma letra maiúscula:</p>
                            <ul className="list-disc list-inside">
                                <li><strong>R</strong> - Rei (King)</li>
                                <li><strong>D</strong> - Dama (Queen)</li>
                                <li><strong>T</strong> - Torre (Rook)</li>
                                <li><strong>B</strong> - Bispo (Bishop)</li>
                                <li><strong>C</strong> - Cavalo (Knight)</li>
                            </ul>
                            <p>O <strong>Peão</strong> não tem uma letra. Apenas a casa de destino é anotada.</p>
                        </NotationCard>

                        <NotationCard icon={<KingIcon className="w-8 h-8" />} title="O Tabuleiro">
                           <p>O tabuleiro é um grid de 8x8. As colunas (verticais) são chamadas de 'a' até 'h', e as fileiras (horizontais) são numeradas de '1' a '8'.</p>
                           <p>Cada casa tem um nome único, como <strong>e4</strong>, <strong>a1</strong> ou <strong>h8</strong>.</p>
                        </NotationCard>

                        <NotationCard icon={<KnightIcon className="w-8 h-8" />} title="Movimentos">
                            <p>Um lance é anotado com a letra da peça e a casa para onde ela se move.</p>
                             <ul className="list-disc list-inside">
                                <li><strong>Cf3</strong>: Cavalo se move para a casa f3.</li>
                                <li><strong>Be5</strong>: Bispo se move para e5.</li>
                                <li><strong>e4</strong>: Um peão se move para e4.</li>
                            </ul>
                        </NotationCard>

                         <NotationCard icon={<span className="text-2xl font-bold">x</span>} title="Capturas">
                            <p>Quando uma peça captura outra, um "x" é inserido entre a letra da peça e a casa de destino.</p>
                            <ul className="list-disc list-inside">
                                <li><strong>Bxf7</strong>: Um bispo captura a peça em f7.</li>
                                <li><strong>exd5</strong>: Um peão na coluna 'e' captura a peça em d5.</li>
                            </ul>
                        </NotationCard>

                        <NotationCard icon={<span className="text-2xl font-bold">O-O</span>} title="Lances Especiais">
                            <p>Certos lances têm notações especiais:</p>
                            <ul className="list-disc list-inside">
                                <li><strong>O-O</strong>: Roque pequeno (lado do rei).</li>
                                <li><strong>O-O-O</strong>: Roque grande (lado da dama).</li>
                                <li><strong>+</strong>: Xeque.</li>
                                <li><strong>#</strong>: Xeque-mate.</li>
                            </ul>
                        </NotationCard>

                         <NotationCard icon={<span className="text-2xl font-bold">?</span>} title="Exemplo Completo">
                            <p>Vamos ler um lance: <strong>Dxg7#</strong></p>
                            <p>Isso significa: "A <strong>Dama (D)</strong> <strong>captura (x)</strong> a peça na casa <strong>g7</strong>, resultando em <strong>xeque-mate (#)</strong>."</p>
                        </NotationCard>
                    </div>
                </div>
            )}

            {activeTab === 'sheet' && (
                <div key="sheet-tab">
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 mb-6">
                        <h4 className="font-semibold text-lg text-[var(--text-on-dark)] mb-2">Legenda Rápida</h4>
                        <p className="text-sm text-[var(--text-secondary)]">
                            <strong>Exemplo: Dxg7#</strong> (Dama captura em g7, xeque-mate)
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400 mt-2">
                            <span><strong>R,D,T,B,C:</strong> Peças</span>
                            <span><strong>e4:</strong> Lance de Peão</span>
                            <span><strong>x:</strong> Captura</span>
                            <span><strong>O-O:</strong> Roque</span>
                            <span><strong>+:</strong> Xeque</span>
                            <span><strong>#:</strong> Mate</span>
                        </div>
                    </div>
                    <NotationSheet />
                </div>
            )}
        </div>
    );
};