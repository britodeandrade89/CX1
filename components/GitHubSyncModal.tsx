import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { GithubConfig } from '../types';
import { GitHubIcon } from './icons/GitHubIcon';

interface GitHubSyncModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (config: GithubConfig) => void;
    onLoad: (config: GithubConfig) => Promise<void>;
    currentConfig: GithubConfig | null;
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({ isOpen, onClose, onSave, onLoad, currentConfig }) => {
    const [username, setUsername] = useState('');
    const [repo, setRepo] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        if (currentConfig) {
            setUsername(currentConfig.username);
            setRepo(currentConfig.repo);
            setToken(currentConfig.token);
        }
    }, [currentConfig]);

    const handleSave = () => {
        if (!username.trim() || !repo.trim() || !token.trim()) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        onSave({ username, repo, token });
    };

    const handleLoad = () => {
         if (!username.trim() || !repo.trim() || !token.trim()) {
            alert('Por favor, preencha todos os campos para carregar os dados.');
            return;
        }
        onLoad({ username, repo, token });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Sincronizar com GitHub">
            <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-yellow-900/50 text-yellow-200 rounded-lg border border-yellow-800">
                    <GitHubIcon className="w-8 h-8 flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-semibold">Salve seus dados com segurança.</p>
                        <p className="text-sm">
                            Esta função usa a API do GitHub para criar um arquivo de backup (`backup.json`) em um repositório seu.
                        </p>
                    </div>
                </div>

                <div>
                    <label htmlFor="github-username" className="block text-sm font-medium text-stone-400 mb-1">Usuário / Organização</label>
                    <input
                        id="github-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                        placeholder="Seu nome de usuário do GitHub"
                        className="w-full p-2 bg-white/10 rounded-lg border border-stone-800 focus:ring-2 focus:ring-yellow-600 focus:outline-none text-stone-100"
                    />
                </div>

                <div>
                    <label htmlFor="github-repo" className="block text-sm font-medium text-stone-400 mb-1">Nome do Repositório</label>
                    <input
                        id="github-repo" type="text" value={repo} onChange={(e) => setRepo(e.target.value)}
                        placeholder="Ex: backup-xadrez"
                        className="w-full p-2 bg-white/10 rounded-lg border border-stone-800 focus:ring-2 focus:ring-yellow-600 focus:outline-none text-stone-100"
                    />
                </div>

                <div>
                    <label htmlFor="github-token" className="block text-sm font-medium text-stone-400 mb-1">Personal Access Token (Clássico)</label>
                    <input
                        id="github-token" type="password" value={token} onChange={(e) => setToken(e.target.value)}
                        placeholder="Cole seu token aqui"
                        className="w-full p-2 bg-white/10 rounded-lg border border-stone-800 focus:ring-2 focus:ring-yellow-600 focus:outline-none text-stone-100"
                    />
                     <p className="text-xs text-stone-500 mt-1">
                        Seu token é armazenado localmente no seu navegador. Crie um token com escopo `repo`.{' '}
                        <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">
                            Criar token aqui.
                        </a>
                    </p>
                </div>

                 <div className="pt-4 mt-4 border-t border-stone-800 flex flex-col sm:flex-row justify-end gap-4">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-stone-100 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">Cancelar</button>
                    <button onClick={handleLoad} className="px-4 py-2 text-sm font-bold text-yellow-600 bg-yellow-600/10 rounded-lg hover:bg-yellow-600/20 border border-yellow-600/50 transition-colors">Carregar da Nuvem</button>
                    <button onClick={handleSave} className="px-4 py-2 text-sm font-bold text-stone-900 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors">Salvar Configuração</button>
                </div>
            </div>
        </Modal>
    );
};