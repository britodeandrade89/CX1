import React from 'react';
import { BackButton } from './BackButton.tsx';
import { ementaData } from '../ementaData.ts';
import type { EmentaModule, EmentaSection, EmentaSectionItem } from '../types.ts';
import { DocumentTextIcon } from './icons/DocumentTextIcon.tsx';


interface EmentaViewProps {
    onBack: () => void;
}

const InfoCard: React.FC<{ title: string, content: string }> = ({ title, content }) => (
    <div className="bg-white/5 p-4 rounded-lg border border-stone-800">
        <h3 className="text-sm font-bold text-yellow-600 uppercase tracking-wider mb-2">{title}</h3>
        <p className="text-stone-100">{content}</p>
    </div>
);

const SectionCard: React.FC<{ section: EmentaSection }> = ({ section }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4 pb-2 border-b-2 border-stone-800">{section.title}</h2>
        <div className="space-y-4">
            {section.items.map((item: EmentaSectionItem, index: number) => (
                <div key={index} className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg text-stone-100">{item.title}</h3>
                    <p className="text-stone-400">{item.description}</p>
                </div>
            ))}
        </div>
    </div>
);

const ModuleCard: React.FC<{ module: EmentaModule }> = ({ module }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4 pb-2 border-b-2 border-stone-800">{module.title}</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-stone-100 uppercase bg-black/20">
                    <tr>
                        <th className="px-4 py-2 w-16 rounded-l-lg">Item</th>
                        <th className="px-4 py-2">Tópico</th>
                        <th className="px-4 py-2 rounded-r-lg">Observação / Conteúdo</th>
                    </tr>
                </thead>
                <tbody>
                    {module.topics.map((topic, index) => (
                        <tr key={index} className="border-b border-stone-800 align-top">
                            <td className="px-4 py-3 font-bold text-center text-stone-100">{topic.id}</td>
                            <td className="px-4 py-3 font-semibold text-stone-100">{topic.title}</td>
                            <td className="px-4 py-3 text-stone-400 whitespace-pre-wrap">{topic.observation}</td>
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
        <div className="p-4 md:p-6 bg-stone-950/80 rounded-xl shadow-lg backdrop-blur-lg border border-stone-800 w-full max-w-6xl flex flex-col h-[90vh]">
            <BackButton onClick={onBack} />

            <div className="text-center mb-8 flex-shrink-0">
                <p className="font-semibold text-sm text-stone-400">{header.government}</p>
                <p className="font-semibold text-sm text-stone-400">{header.city} - {header.department}</p>
                <h1 className="text-2xl font-bold text-stone-100 mt-2">{header.school}</h1>
                <p className="mt-2 text-lg text-stone-100">{header.project}</p>
                <p className="text-sm text-stone-400">{header.axis} | PROFESSOR {header.professor}</p>
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
                    <h2 className="text-2xl font-bold text-yellow-600 mb-4 pb-2 border-b-2 border-stone-800">{finalConsiderations.title}</h2>
                    <p className="text-stone-400 bg-white/5 p-4 rounded-lg">{finalConsiderations.text}</p>
                </div>
            </div>
        </div>
    );
};