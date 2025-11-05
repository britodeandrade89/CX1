import type { GithubConfig } from '../types';

const GITHUB_API_URL = 'https://api.github.com';
const FILE_PATH = 'backup.json';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API Error (${response.status}): ${errorData.message || 'Unknown error'}`);
    }
    return response.json();
};

/**
 * Saves the entire app data to a specified GitHub repository.
 * @param config The GitHub configuration (username, repo, token).
 * @param data The application data to be saved.
 */
export const saveDataToGithub = async (config: GithubConfig, data: object) => {
    const { username, repo, token } = config;
    const url = `${GITHUB_API_URL}/repos/${username}/${repo}/contents/${FILE_PATH}`;

    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
    };

    let sha: string | undefined;

    // First, try to get the file to see if it exists and get its SHA
    try {
        const existingFile = await fetch(url, { headers });
        if (existingFile.ok) {
            const fileData = await existingFile.json();
            sha = fileData.sha;
        } else if (existingFile.status !== 404) {
            // If it's not a 404, it's an unexpected error
            await handleResponse(existingFile);
        }
    } catch (error) {
        // Ignore fetch error if it's just about the file not existing, otherwise rethrow
        if (error instanceof Error && !error.message.includes('Failed to fetch')) {
            console.error("Error checking for existing file:", error);
        }
    }

    // Prepare the content for upload
    const content = btoa(JSON.stringify(data, null, 2)); // btoa encodes to Base64
    const body = JSON.stringify({
        message: `Backup automático do Clube do Xadrez - ${new Date().toISOString()}`,
        content: content,
        sha: sha // Include SHA if updating an existing file
    });

    // Create or update the file
    const response = await fetch(url, {
        method: 'PUT',
        headers,
        body
    });

    return handleResponse(response);
};


/**
 * Loads the app data from a specified GitHub repository.
 * @param config The GitHub configuration (username, repo, token).
 * @returns The parsed application data.
 */
export const loadDataFromGithub = async (config: GithubConfig): Promise<any> => {
     const { username, repo, token } = config;
    const url = `${GITHUB_API_URL}/repos/${username}/${repo}/contents/${FILE_PATH}`;

    const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
    };

    const response = await fetch(url, { headers });
    const data = await handleResponse(response);

    if (data.content) {
        const decodedContent = atob(data.content); // atob decodes from Base64
        return JSON.parse(decodedContent);
    }
    
    throw new Error("O arquivo de backup não contém conteúdo válido.");
};