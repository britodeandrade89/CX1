import React, { useState } from 'react';
import { BackButton } from './BackButton.tsx';
import { activityLogData as initialActivityLogData } from '../activityLogData.ts';
import { ClipboardListIcon } from './icons/ClipboardListIcon.tsx';
import { CalendarIcon } from './icons/CalendarIcon.tsx';
import { PlusIcon } from './icons/PlusIcon.tsx';
import type { ActivityLogData, ActivityLogEntry } from '../types.ts';

interface ActivityLogViewProps {
    onBack: () => void;
    activityLogData: ActivityLogData;
    onUpdate: (newLogData: ActivityLogData) => void;
}

export const ActivityLogView: React.FC<ActivityLogViewProps> = ({ onBack, activityLogData, onUpdate }) => {
    const { title, header, log } = activityLogData;
    const [newDate, setNewDate] = useState('');
    const [newActivity, setNewActivity] = useState('');

    const handleAddActivity = () => {
        if (!newDate.trim() || !newActivity.trim()) {
            alert('Por favor, preencha a data e a atividade.');
            return;
        }

        const newLogEntry: ActivityLogEntry = {
            date: newDate,
            activities: newActivity.split('\n').filter(line => line.trim() !== '')
        };

        const updatedLog = [...log, newLogEntry];
        
        // Simple sort to try to keep chronological order, assumes DD/MMM format
        // This is a basic sort and might not be perfect for all date formats
        updatedLog.sort((a, b) => {
             const dateA = new Date(`2024 ${a.date.split('/')[1]} ${a.date.split('/')[0]}`);
             const dateB = new Date(`2024 ${b.date.split('/')[1]} ${b.date.split('/')[0]}`);
             return dateA.getTime() - dateB.getTime();
        });


        const updatedData = { ...activityLogData, log: updatedLog };

        onUpdate(updatedData);

        setNewDate('');
        setNewActivity('');
    };

    return (
        <div className="p-4 md:p-6 bg-stone-950/80 rounded-xl shadow-lg backdrop-blur-lg border border-stone-800 w-full max-w-4xl flex flex-col h-[90vh]">
            <BackButton onClick={onBack} />

            <div className="text-center mb-8 flex-shrink-0">
                <div className="flex items-center justify-center mb-4">
                    <ClipboardListIcon className="h-8 w-8 mr-3 text-yellow-600" />
                    <h1 className="text-3xl font-bold text-stone-100">{title}</h1>
                </div>
                <p className="text-sm text-stone-400">{header.school} | PROFESSOR {header.professor}</p>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 relative">
                {/* Timeline line */}
                <div className="absolute left-8 md:left-28 top-2 bottom-2 w-0.5 bg-stone-800"></div>

                {log.map((entry, index) => (
                    <div key={index} className="relative pl-16 md:pl-40 mb-8">
                        {/* Dot on timeline */}
                        <div className="absolute left-8 md:left-28 top-3 -ml-2.5 w-5 h-5 bg-yellow-600 rounded-full border-4 border-stone-950"></div>
                        
                        {/* Date */}
                        <div className="absolute left-0 top-1.5 md:left-8 w-20 text-right">
                             <p className="font-bold text-lg text-stone-100">{entry.date}</p>
                        </div>
                        
                        {/* Content Card */}
                        <div className="bg-white/5 p-4 rounded-lg border border-stone-800">
                            <ul className="list-disc list-inside space-y-2 text-stone-400">
                                {entry.activities.map((activity, actIndex) => (
                                    <li key={actIndex} className="text-base">{activity}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
                 {log.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-stone-400">Nenhuma atividade registrada ainda.</p>
                    </div>
                )}
            </div>

            <div className="flex-shrink-0 mt-6 pt-6 border-t border-stone-800">
                <h3 className="text-xl font-bold text-stone-100 mb-4">Adicionar Nova Atividade</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        placeholder="Data (ex: 25/dez)"
                        className="md:col-span-1 p-3 bg-white/5 rounded-lg border border-stone-800 focus:ring-2 focus:ring-yellow-600 focus:outline-none text-stone-100"
                    />
                    <textarea
                        value={newActivity}
                        onChange={(e) => setNewActivity(e.target.value)}
                        placeholder="Descrição da atividade... (uma por linha)"
                        rows={3}
                        className="md:col-span-2 p-3 bg-white/5 rounded-lg border border-stone-800 focus:ring-2 focus:ring-yellow-600 focus:outline-none text-stone-100 resize-y"
                    />
                </div>
                <button
                    onClick={handleAddActivity}
                    className="w-full mt-4 flex items-center justify-center gap-3 px-6 py-3 font-bold text-stone-900 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors duration-300"
                >
                    <PlusIcon className="w-6 h-6" />
                    Adicionar
                </button>
            </div>
        </div>
    );
};