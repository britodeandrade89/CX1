import React from 'react';
import { ClassificationDataMap, ClassificationData } from '../types.ts';
import { ChartBarIcon } from './icons/ChartBarIcon.tsx';
import { BackButton } from './BackButton.tsx';

interface ClassificationListViewProps {
    classificationDataMap: ClassificationDataMap;
    onSelectClassification: (classId: string) => void;
    onBack: () => void;
}

const ListViewCard: React.FC<{ icon: React.ReactNode, title: string, onClick: () => void }> = ({ icon, title, onClick }) => (
    <button 
        onClick={onClick}
        className="bg-[var(--card-bg)] p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_20px_var(--glow-color)] backdrop-blur-sm border border-white/20"
    >
        <div className="mb-4 text-[var(--accent-color)]">{icon}</div>
        <h2 className="text-lg font-semibold text-[var(--text-on-light)]">{title}</h2>
    </button>
);

export const ClassificationListView: React.FC<ClassificationListViewProps> = ({ classificationDataMap, onSelectClassification, onBack }) => {
    return (
        <div className="p-4 md:p-6 bg-[var(--content-bg)] rounded-xl shadow-lg backdrop-blur-lg border border-[var(--border-color)] w-full max-w-4xl">
            <BackButton onClick={onBack} />
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-bold mb-8 text-[var(--text-on-dark)]">Selecione uma Classificação</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                    {Object.entries(classificationDataMap).map(([classId, classData]: [string, ClassificationData]) => (
                        <ListViewCard
                            key={classId}
                            icon={<ChartBarIcon className="w-12 h-12" />}
                            title={classData.name}
                            onClick={() => onSelectClassification(classId)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};