import React, { useState } from 'react';
import { ClassificationData, ClassificationStudent } from '../types.ts';
import { BackButton } from './BackButton.tsx';
import { CrownIcon } from './icons/CrownIcon.tsx';
import { SparklesIcon } from './icons/SparklesIcon.tsx';
import { Modal } from './Modal.tsx';
import { analyzePlayer } from '../services/geminiService.ts';

interface EditableStatProps {
    value: number;
    onChange: (newValue: number) => void;
    colorClass: string;
}

const EditableStat: React.FC<EditableStatProps> = ({ value, onChange, colorClass }) => {
    const handleIncrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(value + 1);
    };
    const handleDecrement = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(Math.max(0, value - 1));
    };

    return (
        <div className="flex items-center justify-center gap-2 md:gap-3">
            <button onClick={handleDecrement} aria-label="Diminuir" className="w-7 h-7 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors flex items-center justify-center font-bold">-</button>
            <span className={`font-bold text-lg w-8 text-center ${colorClass}`}>{value}</span>
            <button onClick={handleIncrement} aria-label="Aumentar" className="w-7 h-7 rounded-full bg-white/10 text-white/70 hover:bg-white/20 transition-colors flex items-center justify-center font-bold">+</button>
        </div>
    );
};

interface ClassificationViewProps {
    classId: string;
    classificationData: ClassificationData;
    onBack: () => void;
    onUpdate: (classId: string, studentIndex: number, newStats: { wins: number; draws: number; losses: number }) => void;
}

export const ClassificationView: React.FC<ClassificationViewProps> = ({ classId, classificationData, onBack, onUpdate }) => {
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<ClassificationStudent | null>(null);
    const [analysisResult, setAnalysisResult] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleOpenAnalysis = async (student: ClassificationStudent) => {
        setSelectedStudent(student);
        setIsAnalysisModalOpen(true);
        setIsAnalyzing(true);
        setAnalysisResult('');
        try {
            const result = await analyzePlayer(student.name, student.wins, student.draws, student.losses);
            setAnalysisResult(result);
        } catch (error) {
            console.error("Failed to get AI analysis", error);
            setAnalysisResult("Ocorreu um erro ao buscar a análise. Tente novamente.");
        } finally {
            setIsAnalyzing(false);
        }
    };
    
    const getPositionIcon = (position: string) => {
        const baseClasses = "flex items-center gap-2";
        const iconClasses = "w-7 h-7 flex-shrink-0";
        const textClasses = "text-lg font-bold";

        switch (position) {
            case '1º':
                return (
                    <div className={baseClasses}>
                        <CrownIcon className={`${iconClasses} text-yellow-400`} />
                        <span className={`${textClasses} text-yellow-400`}>{position}</span>
                    </div>
                );
            case '2º':
                return (
                     <div className={baseClasses}>
                        <CrownIcon className={`${iconClasses} text-gray-400`} />
                        <span className={`${textClasses} text-gray-400`}>{position}</span>
                    </div>
                );
            case '3º':
                return (
                    <div className={baseClasses}>
                        <CrownIcon className={`${iconClasses} text-yellow-600`} />
                        <span className={`${textClasses} text-yellow-600`}>{position}</span>
                    </div>
                );
            default:
                return <span className='w-16 text-center text-lg font-semibold'>{position}</span>;
        }
    };

    return (
        <div className="p-4 md:p-6 bg-[var(--content-bg)] rounded-xl shadow-lg backdrop-blur-lg border border-[var(--border-color)]">
            <BackButton onClick={onBack} />
            <h1 className="text-3xl font-bold mb-6 text-[var(--text-on-dark)]">{classificationData.name}</h1>
            
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-sm text-left text-[var(--text-secondary)]">
                    <thead className="text-xs text-[var(--text-on-dark)] uppercase bg-[var(--table-header-bg)]">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-l-lg font-semibold">Pos.</th>
                            <th scope="col" className="px-6 py-3 font-semibold">Nome</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Pontos</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Vitórias</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Empates</th>
                            <th scope="col" className="px-6 py-3 text-center font-semibold">Derrotas</th>
                            <th scope="col" className="px-6 py-3 rounded-r-lg text-center font-semibold">Análise IA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classificationData.students.map((student, index) => (
                            <tr key={student.name} className="bg-white/5 border-b border-[var(--border-color)]">
                                <td scope="row" className="px-6 py-4 font-medium text-[var(--text-on-dark)] whitespace-nowrap">
                                     <div className="flex items-center justify-center h-full">
                                        {getPositionIcon(`${index + 1}º`)}
                                     </div>
                                </td>
                                <td className="px-6 py-4 text-[var(--text-on-dark)] font-medium">{student.name}</td>
                                <td className="px-6 py-4 text-center font-bold text-[var(--text-on-dark)]">{student.points}</td>
                                <td className="px-6 py-4 text-center">
                                    <EditableStat 
                                        value={student.wins}
                                        onChange={(newValue) => onUpdate(classId, index, { wins: newValue, draws: student.draws, losses: student.losses })}
                                        colorClass="text-[var(--status-win)]"
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <EditableStat 
                                        value={student.draws}
                                        onChange={(newValue) => onUpdate(classId, index, { wins: student.wins, draws: newValue, losses: student.losses })}
                                        colorClass="text-[var(--status-draw)]"
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <EditableStat 
                                        value={student.losses}
                                        onChange={(newValue) => onUpdate(classId, index, { wins: student.wins, draws: student.draws, losses: newValue })}
                                        colorClass="text-[var(--status-loss)]"
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleOpenAnalysis(student)}
                                        className="p-2 rounded-full bg-[var(--accent-color)]/20 text-[var(--accent-color)] hover:bg-[var(--accent-color)]/40 transition-colors"
                                        aria-label={`Analisar ${student.name}`}
                                    >
                                        <SparklesIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="block md:hidden space-y-4">
                {classificationData.students.map((student, index) => (
                    <div key={student.name} className="bg-white/5 border border-[var(--border-color)] rounded-lg p-4 shadow">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-20 flex justify-start">
                                    {getPositionIcon(`${index + 1}º`)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-[var(--text-on-dark)] leading-tight">{student.name}</h3>
                                    <p className="text-sm font-bold text-[var(--accent-color)]">{student.points} Pontos</p>
                                </div>
                            </div>
                             <button
                                onClick={() => handleOpenAnalysis(student)}
                                className="p-2 rounded-full bg-[var(--accent-color)]/20 text-[var(--accent-color)] hover:bg-[var(--accent-color)]/40 transition-colors flex-shrink-0"
                                aria-label={`Analisar ${student.name}`}
                            >
                                <SparklesIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="grid grid-cols-3 text-center pt-4 border-t border-[var(--border-color)]">
                            <div>
                                <div className="text-xs text-gray-400 uppercase font-semibold">Vitórias</div>
                                <EditableStat 
                                    value={student.wins}
                                    onChange={(newValue) => onUpdate(classId, index, { wins: newValue, draws: student.draws, losses: student.losses })}
                                    colorClass="text-[var(--status-win)]"
                                />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase font-semibold">Empates</div>
                                <EditableStat 
                                    value={student.draws}
                                    onChange={(newValue) => onUpdate(classId, index, { wins: student.wins, draws: newValue, losses: student.losses })}
                                    colorClass="text-[var(--status-draw)]"
                                />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase font-semibold">Derrotas</div>
                                <EditableStat 
                                    value={student.losses}
                                    onChange={(newValue) => onUpdate(classId, index, { wins: student.wins, draws: student.draws, losses: newValue })}
                                    colorClass="text-[var(--status-loss)]"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <Modal
                isOpen={isAnalysisModalOpen}
                onClose={() => setIsAnalysisModalOpen(false)}
                title={selectedStudent ? `Análise IA - ${selectedStudent.name}` : 'Análise IA'}
            >
                {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent-color)]"></div>
                        <p className="mt-4 text-lg text-[var(--text-secondary)]">Analisando desempenho...</p>
                    </div>
                ) : (
                    <div
                        className="text-lg leading-relaxed text-[var(--text-secondary)] space-y-4"
                        dangerouslySetInnerHTML={{ __html: analysisResult }}
                    />
                )}
            </Modal>
        </div>
    );
};