import React from 'react';
import { ClassDataMap, ClassData } from '../types.ts';
import { UsersIcon } from './icons/UsersIcon.tsx';
import { BackButton } from './BackButton.tsx';

interface ClassListViewProps {
    classDataMap: ClassDataMap;
    onSelectClass: (classId: string) => void;
    onBack: () => void;
}

const ListViewCard: React.FC<{ icon: React.ReactNode, title: string, onClick: () => void }> = ({ icon, title, onClick }) => (
    <button 
        onClick={onClick}
        className="bg-stone-900/70 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-yellow-600/30 backdrop-blur-sm border border-stone-800"
    >
        <div className="mb-4 text-yellow-600">{icon}</div>
        <h2 className="text-lg font-semibold text-stone-100">{title}</h2>
    </button>
);

export const ClassListView: React.FC<ClassListViewProps> = ({ classDataMap, onSelectClass, onBack }) => {
    return (
        <div className="p-4 md:p-6 bg-stone-950/80 rounded-xl shadow-lg backdrop-blur-lg border border-stone-800 w-full max-w-4xl">
            <BackButton onClick={onBack} />
            <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-bold mb-8 text-stone-100">Selecione uma Turma</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
                    {Object.entries(classDataMap).map(([classId, classData]: [string, ClassData]) => (
                        <ListViewCard
                            key={classId}
                            icon={<UsersIcon className="w-12 h-12" />}
                            title={classData.name}
                            onClick={() => onSelectClass(classId)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};