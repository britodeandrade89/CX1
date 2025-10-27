import { GoogleGenAI } from "@google/genai";

/**
 * Analyzes a chess game provided in algebraic notation using the Gemini API.
 * @param gameNotation A string containing the chess game's moves.
 * @returns A promise that resolves to an HTML string with the AI's analysis.
 */
export const analyzeChessGame = async (gameNotation: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    const systemInstruction = `
        Aja como um técnico de xadrez de classe mundial, amigável e didático. Sua tarefa é analisar uma partida de xadrez fornecida em notação algébrica (PGN).
        Sua resposta deve ser em português do Brasil.
        - Forneça uma análise geral da partida no início.
        - Destaque 2 a 3 lances-chave (tanto bons quanto ruins) de cada jogador.
        - Para cada lance-chave, explique por que foi bom ou um erro.
        - Sugira lances alternativos melhores para os erros.
        - Conclua com um resumo e um conselho construtivo para ambos os jogadores.
        - Formate a resposta usando Markdown. Use **negrito** para destacar os lances (ex: **e4**) e use listas para clareza. Não use cabeçalhos de markdown (#, ##).
    `;
    const prompt = `Analise a seguinte partida de xadrez:\n\n${gameNotation}`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { systemInstruction },
        });

        // Basic Markdown to HTML conversion for display
        let htmlResponse = response.text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />');

        return htmlResponse;
    } catch (error) {
        console.error("Error calling Gemini API for chess analysis:", error);
        return "Desculpe, não foi possível obter uma análise da IA no momento. Verifique a notação e tente novamente.";
    }
};

// FIX: Added the missing analyzePlayer function.
// This function was being imported and used in `ClassificationView.tsx` but was not defined, causing a build error.
/**
 * Analyzes a chess player's performance based on their stats using the Gemini API.
 * @param playerName The name of the player.
 * @param wins The number of wins.
 * @param draws The number of draws.
 * @param losses The number of losses.
 * @returns A promise that resolves to an HTML string with the AI's analysis.
 */
export const analyzePlayer = async (playerName: string, wins: number, draws: number, losses: number): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
    const systemInstruction = `
        Aja como um técnico de xadrez experiente e encorajador. Sua tarefa é analisar o desempenho de um jogador com base em suas estatísticas de vitórias, empates e derrotas.
        Sua resposta deve ser em português do Brasil.
        - Comece com uma saudação e um resumo geral do desempenho do jogador.
        - Analise os pontos fortes com base nas estatísticas (ex: bom número de vitórias pode indicar agressividade ou bom conhecimento tático).
        - Aponte áreas para melhoria de forma construtiva (ex: um número alto de empates pode sugerir dificuldade em converter vantagens; derrotas podem indicar a necessidade de estudar aberturas ou finais).
        - Dê 2 ou 3 conselhos práticos e acionáveis para o jogador melhorar.
        - Termine com uma nota de encorajamento.
        - Formate a resposta usando Markdown. Use **negrito** para destacar pontos importantes e use listas para os conselhos. Não use cabeçalhos de markdown (#, ##).
    `;
    
    const prompt = `
        Analise o desempenho do jogador de xadrez: ${playerName}.
        Estatísticas:
        - Vitórias: ${wins}
        - Empates: ${draws}
        - Derrotas: ${losses}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { systemInstruction },
        });

        // Basic Markdown to HTML conversion for display
        let htmlResponse = response.text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />');

        return htmlResponse;
    } catch (error) {
        console.error("Error calling Gemini API for player analysis:", error);
        return "Desculpe, não foi possível obter uma análise da IA no momento. Tente novamente mais tarde.";
    }
};