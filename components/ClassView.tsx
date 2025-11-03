import React, { useState } from 'react';
import { ClassData, Student } from '../types.ts';
import { BackButton } from './BackButton.tsx';
import { UsersIcon } from './icons/UsersIcon.tsx';
import { CalendarIcon } from './icons/CalendarIcon.tsx';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SaveIcon } from './icons/SaveIcon.tsx';


interface ClassViewProps {
    classId: string;
    classData: ClassData;
    onBack: () => void;
    onUpdate: (classId: string, studentId: number, date: string, status: 'P' | 'F') => void;
    onSave: () => boolean;
}

export const ClassView: React.FC<ClassViewProps> = ({ classId, classData, onBack, onUpdate, onSave }) => {
    const today = new Date();
    const todayDate = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(today).replace('.', '');
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');


    const handleSetAttendance = (studentId: number, status: 'P' | 'F') => {
        onUpdate(classId, studentId, todayDate, status);
    };

    const handleSave = () => {
        setSaveStatus('saving');
        const success = onSave();
        if (success) {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } else {
            setSaveStatus('idle');
            alert('Falha ao salvar os dados.');
        }
    };
    
    const totalPresences = (student: Student) => {
        return Object.values(student.attendance).filter(status => status === 'P').length;
    };

    const totalAbsences = (student: Student) => {
        return Object.values(student.attendance).filter(status => status === 'F').length;
    };
    
    const getAttendancePercentage = (student: Student) => {
        const presences = totalPresences(student);
        const absences = totalAbsences(student);
        const totalClassesForStudent = presences + absences;

        if (totalClassesForStudent === 0) {
            return { percentage: 0, color: 'text-gray-500' };
        }
        
        const percentage = Math.round((presences / totalClassesForStudent) * 100);
        let color = 'text-red-400';
        if (percentage >= 75) {
            color = 'text-green-400';
        } else if (percentage >= 50) {
            color = 'text-yellow-400';
        }
        
        return { percentage, color };
    };

    if (!classData) {
        return (
            <div className="p-6 bg-[var(--content-bg)] backdrop-blur-sm rounded-lg shadow-lg w-full">
                <BackButton onClick={onBack} />
                <p>Nenhuma turma selecionada.</p>
            </div>
        );
    }

    if (!classData.students || classData.students.length === 0) {
        return (
            <div className="p-6 bg-[var(--content-bg)] backdrop-blur-sm rounded-lg shadow-lg w-full">
                <BackButton onClick={onBack} />
                <h1 className="text-3xl font-bold text-[var(--text-on-dark)]">{classData.name}</h1>
                <p className="mt-4 text-[var(--text-secondary)]">Não há alunos nesta turma para exibir dados.</p>
            </div>
        );
    }

    const totalPercentage = classData.students.reduce((sum, student) => {
        return sum + getAttendancePercentage(student).percentage;
    }, 0);
    const averageAttendance = Math.round(totalPercentage / classData.students.length);

    const chartData = [
        { name: 'Aproveitamento Médio', aproveitamento: averageAttendance }
    ];

    const getBarColor = (percentage: number) => {
        if (percentage >= 75) return '#4ade80'; // var(--status-win)
        if (percentage >= 50) return '#facc15'; // var(--accent-color)
        return '#f87171'; // var(--status-loss)
    };
    
    const sortedStudents = [...classData.students].sort((a, b) => a.name.localeCompare(b.name));
    const lastDate = classData.dates[classData.dates.length - 1];


    return (
        <div className="p-4 md:p-6 bg-[var(--content-bg)] rounded-xl shadow-lg backdrop-blur-lg border border-[var(--border-color)] w-full">
            <BackButton onClick={onBack} />
            <div className="flex flex-wrap items-center justify-between gap-4 -mt-6 mb-6">
                <div className="flex items-center">
                    <UsersIcon className="h-8 w-8 mr-3 text-[var(--accent-color)]" />
                    <h1 className="text-3xl font-bold text-[var(--text-on-dark)]">{classData.name}</h1>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[var(--btn-primary-text)] bg-[var(--btn-primary-bg)] rounded-lg hover:bg-[var(--btn-primary-hover-bg)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={saveStatus !== 'idle'}
                >
                    {saveStatus === 'idle' && <><SaveIcon className="w-5 h-5" /> Salvar Alterações</>}
                    {saveStatus === 'saving' && 'Salvando...'}
                    {saveStatus === 'saved' && 'Salvo!'}
                </button>
            </div>


            <div className="mb-8 p-4 bg-white/5 rounded-lg border border-[var(--border-color)]">
                <h2 className="text-xl font-bold text-[var(--text-on-dark)] mb-4">Resumo da Turma</h2>
                <div style={{ width: '100%', height: 150 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis type="number" domain={[0, 100]} stroke="#a8a29e" tickFormatter={(tick) => `${tick}%`} />
                            <YAxis type="category" dataKey="name" stroke="#a8a29e" width={150} tick={{ fill: '#e7e5e4' }} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                                contentStyle={{
                                    background: 'rgba(28, 25, 23, 0.9)',
                                    borderColor: 'var(--border-color)',
                                    color: 'var(--text-on-light)'
                                }}
                                labelStyle={{ color: 'var(--text-secondary)' }}
                                formatter={(value: number) => [`${value}%`, "Aproveitamento"]}
                            />
                            <Bar dataKey="aproveitamento" barSize={30}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.aproveitamento)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            
            <div className="flex items-center text-sm text-[var(--text-secondary)] mb-6">
                <CalendarIcon className="w-5 h-5 mr-2"/>
                <span>{classData.dates.length} aulas registradas.</span>
            </div>

            <div className="overflow-x-auto hidden md:block">
                <table className="w-full text-sm text-left text-[var(--text-secondary)]">
                    <thead className="text-xs text-[var(--text-on-dark)] uppercase bg-[var(--table-header-bg)]">
                        <tr>
                            <th scope="col" className="px-3 py-3 rounded-l-lg font-semibold">Aluno</th>
                            <th scope="col" className="px-2 py-3 text-center font-semibold whitespace-nowrap">Última Aula ({lastDate || 'N/A'})</th>
                            <th scope="col" className="px-2 py-3 text-center font-semibold whitespace-nowrap">Presença ({todayDate})</th>
                            <th scope="col" className="px-3 py-3 text-center font-semibold whitespace-nowrap">Aproveitamento</th>
                            <th scope="col" className="px-3 py-3 text-center font-semibold whitespace-nowrap">Presenças</th>
                            <th scope="col" className="px-3 py-3 rounded-r-lg text-center font-semibold whitespace-nowrap">Faltas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedStudents.map(student => {
                            const { percentage, color } = getAttendancePercentage(student);
                            return (
                                <tr key={student.id} className="bg-white/5 border-b border-[var(--border-color)]">
                                    <th scope="row" className="px-3 py-4 font-medium text-[var(--text-on-dark)] whitespace-nowrap">
                                        <div className="flex items-baseline">
                                            <span className="text-xs font-normal text-[var(--text-secondary)] w-8 text-left">{`${student.id}.`}</span>
                                            <span>{student.name}</span>
                                        </div>
                                    </th>
                                    <td className="px-2 py-4 text-center">
                                         {lastDate && student.attendance[lastDate] ? (
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${student.attendance[lastDate] === 'P' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                                {student.attendance[lastDate]}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500">-</span>
                                        )}
                                    </td>
                                    <td className="px-2 py-4 text-center">
                                        {student.attendance[todayDate] ? (
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${student.attendance[todayDate] === 'P' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                                {student.attendance[todayDate]}
                                            </span>
                                        ) : (
                                            <div className="flex justify-center items-center gap-2">
                                                <button onClick={() => handleSetAttendance(student.id, 'P')} className="w-8 h-8 flex items-center justify-center font-bold text-green-300 bg-green-500/20 rounded-full hover:bg-green-500/40 transition-colors">P</button>
                                                <button onClick={() => handleSetAttendance(student.id, 'F')} className="w-8 h-8 flex items-center justify-center font-bold text-red-300 bg-red-500/20 rounded-full hover:bg-red-500/40 transition-colors">F</button>
                                            </div>
                                        )}
                                    </td>
                                    <td className={`px-3 py-4 text-center font-bold ${color}`}>
                                       {percentage}%
                                    </td>
                                    <td className="px-3 py-4 text-center font-bold" style={{color: 'var(--status-win)'}}>{totalPresences(student)}</td>
                                    <td className="px-3 py-4 text-center font-bold" style={{color: 'var(--status-loss)'}}>{totalAbsences(student)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="block md:hidden space-y-4">
                {sortedStudents.map(student => {
                    const { percentage, color } = getAttendancePercentage(student);
                    return (
                        <div key={student.id} className="bg-white/5 border border-[var(--border-color)] rounded-lg p-4 shadow">
                            <h3 className="font-bold text-lg text-[var(--text-on-dark)] mb-3">
                               <span className="font-medium text-[var(--text-secondary)] mr-2">{`${student.id}.`}</span>
                               {student.name}
                            </h3>
                            
                            <div className="grid grid-cols-3 text-center mb-4 pb-4 border-b border-[var(--border-color)]">
                                <div>
                                    <div className="text-xs text-gray-400 uppercase font-semibold">Aproveitamento</div>
                                    <div className={`font-bold text-lg ${color}`}>{percentage}%</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 uppercase font-semibold">Presenças</div>
                                    <div className="font-bold text-lg text-[var(--status-win)]">{totalPresences(student)}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400 uppercase font-semibold">Faltas</div>
                                    <div className="font-bold text-lg text-[var(--status-loss)]">{totalAbsences(student)}</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-sm text-gray-300">Presença ({todayDate})</span>
                                    {student.attendance[todayDate] ? (
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${student.attendance[todayDate] === 'P' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                            {student.attendance[todayDate]}
                                        </span>
                                    ) : (
                                        <div className="flex justify-center items-center gap-2">
                                            <button onClick={() => handleSetAttendance(student.id, 'P')} className="w-10 h-10 flex items-center justify-center font-bold text-green-300 bg-green-500/20 rounded-full hover:bg-green-500/40 transition-colors">P</button>
                                            <button onClick={() => handleSetAttendance(student.id, 'F')} className="w-10 h-10 flex items-center justify-center font-bold text-red-300 bg-red-500/20 rounded-full hover:bg-red-500/40 transition-colors">F</button>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-300">Última Aula ({lastDate || 'N/A'})</span>
                                    {lastDate && student.attendance[lastDate] ? (
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${student.attendance[lastDate] === 'P' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                            {student.attendance[lastDate]}
                                        </span>
                                    ) : (
                                        <span className="text-gray-500">-</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};