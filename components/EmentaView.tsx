import React from 'react';
import { BackButton } from './BackButton.tsx';
import { ementaData } from '../ementaData.ts';
import type { EmentaModule, EmentaSection, EmentaSectionItem } from '../types.ts';
import { DocumentTextIcon } from './icons/DocumentTextIcon.tsx';


interface EmentaViewProps {
    onBack: () => void;
}

const InfoCard: React.FC<{ title: string, content: string }> = ({ title, content }) => (
    <div className="bg-white/5 p-4 rounded-lg border border-[var(--border-color)]">
        <h3 className="text-sm font-bold text-[var(--accent-color)] uppercase tracking-wider mb-2">{title}</h3>
        <p className="text-[var(--text-on-light)]">{content}</p>
    </div>
);

const SectionCard: React.FC<{ section: EmentaSection }> = ({ section }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--accent-color)] mb-4 pb-2 border-b-2 border-[var(--border-color)]">{section.title}</h2>
        <div className="space-y-4">
            {section.items.map((item: EmentaSectionItem, index: number) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg text-[var(--text-on-light)]">{item.title}</h3>
                    <p className="text-[var(--text-secondary)]">{item.description}</p>
                </div>
            ))}
        </div>
    </div>
);

const ModuleCard: React.FC<{ module: EmentaModule }> = ({ module }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-[var(--accent-color)] mb-4 pb-2 border-b-2 border-[var(--border-color)]">{module.title}</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-[var(--text-on-dark)] uppercase bg-[var(--table-header-bg)]">
                    <tr>
                        <th className="px-4 py-2 w-16 rounded-l-lg">Item</th>
                        <th className="px-4 py-2">Tópico</th>
                        <th className="px-4 py-2 rounded-r-lg">Observação / Conteúdo</th>
                    </tr>
                </thead>
                <tbody>
                    {module.topics.map((topic, index) => (
                        <tr key={index} className="border-b border-[var(--border-color)] align-top">
                            <td className="px-4 py-3 font-bold text-center text-[var(--text-on-dark)]">{topic.id}</td>
                            <td className="px-4 py-3 font-semibold text-[var(--text-on-light)]">{topic.title}</td>
                            <td className="px-4 py-3 text-[var(--text-secondary)] whitespace-pre-wrap">{topic.observation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


export const EmentaView: React.FC<EmentaViewProps> = ({ onBack }) => {
    const { header, courseInfo, modules, methodology, evaluation, didacticResources, finalConsiderations } = ementaData;

    return (
        <div className="p-4 md:p-6 bg-[var(--content-bg)] rounded-xl shadow-lg backdrop-blur-lg border border-[var(--border-color)] w-full max-w-6xl flex flex-col h-[90vh]">
            <BackButton onClick={onBack} />

            <div className="text-center mb-8 flex-shrink-0">
                <p className="font-semibold text-sm text-[var(--text-secondary)]">{header.government}</p>
                <p className="font-semibold text-sm text-[var(--text-secondary)]">{header.city} - {header.department}</p>
                <h1 className="text-2xl font-bold text-[var(--text-on-dark)] mt-2">{header.school}</h1>
                <p className="mt-2 text-lg text-[var(--text-on-light)]">{header.project}</p>
                <p className="text-sm text-[var(--text-secondary)]">{header.axis} | PROFESSOR {header.professor}</p>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2">
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <InfoCard title="Nome do Curso" content={courseInfo.name} />
                    <InfoCard title="Público-Alvo" content={courseInfo.targetAudience} />
                    <InfoCard title="Pré-requisito" content={courseInfo.prerequisite} />
                    <InfoCard title="Objetivo Geral" content={courseInfo.objective} />
                </div>

                {modules.map((module, index) => <ModuleCard key={index} module={module} />)}

                <SectionCard section={methodology} />
                <SectionCard section={evaluation} />
                <SectionCard section={didacticResources} />
                
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-[var(--accent-color)] mb-4 pb-2 border-b-2 border-[var(--border-color)]">{finalConsiderations.title}</h2>
                    <p className="text-[var(--text-secondary)] bg-white/5 p-4 rounded-lg">{finalConsiderations.text}</p>
                </div>
            </div>
        </div>
    );
};
