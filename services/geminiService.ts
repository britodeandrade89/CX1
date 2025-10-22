// import { GoogleGenAI, Type } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// async function callGemini(prompt: string, systemInstruction?: string): Promise<string> {
//     try {
//         const response = await ai.models.generateContent({
//             model: 'gemini-2.5-flash',
//             contents: prompt,
//             config: systemInstruction ? { systemInstruction } : undefined,
//         });
//         return response.text;
//     } catch (error) {
//         console.error("Error calling Gemini API:", error);
//         return "Desculpe, não foi possível obter uma resposta da IA no momento.";
//     }
// }

export const analyzePlayer = async (name: string, wins: number, draws: number, losses: number): Promise<string> => {
    // const systemInstruction = `Aja como um técnico de xadrez amigável e experiente. Responda em português do Brasil. Formate a resposta em parágrafos simples.`;
    // const prompt = `Forneça uma análise curta (máximo de 80 palavras) e encorajadora para um jovem jogador de xadrez chamado ${name} com o seguinte histórico: ${wins} vitórias, ${draws} empates, e ${losses} derrotas. Ofereça um elogio baseado nos dados (se houver mais vitórias que derrotas, elogie isso; se houver muitos empates, elogie a resiliência) e uma dica simples e prática para melhorar.`;
    
    // const response = await callGemini(prompt, systemInstruction);
    // return response.replace(/\n/g, '<br>');
    return "A análise da IA está temporariamente desativada. Tente novamente mais tarde.";
};

export const generateTournamentNames = async (): Promise<string[]> => {
    // const systemInstruction = `Aja como um assistente criativo para um clube de xadrez escolar. Sua tarefa é gerar nomes empolgantes e apropriados para torneios de xadrez. Responda em português do Brasil.`;
    // const prompt = `Gere 5 nomes criativos e épicos para um torneio de xadrez escolar.`;
    
    // try {
    //     const response = await ai.models.generateContent({
    //         model: 'gemini-2.5-flash',
    //         contents: prompt,
    //         config: {
    //             systemInstruction,
    //             responseMimeType: "application/json",
    //             responseSchema: {
    //                 type: Type.ARRAY,
    //                 items: {
    //                     type: Type.STRING,
    //                     description: "Um nome de torneio criativo."
    //                 }
    //             }
    //         },
    //     });
        
    //     const jsonString = response.text.trim();
    //     const result = JSON.parse(jsonString);
    //     return Array.isArray(result) ? result : [];
    // } catch (error) {
    //     console.error("Error calling Gemini API for tournament names:", error);
        return ["Reis da Escola", "Batalha de Mentes", "Xeque-Mate Supremo", "Gambito do Saber", "Torre Forte"];
    // }
};