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
    };

    let sha: string | undefined;

    // First, try to get the file to see if it exists and get its SHA
    try {
        const existingFileResponse = await fetch(url, { headers });
        if (existingFileResponse.ok) {
            const fileData = await existingFileResponse.json();
            sha = fileData.sha;
        } else if (existingFileResponse.status !== 404) {
            // It's a real error (401, 403, etc.), so we should fail fast.
            await handleResponse(existingFileResponse);
        }
        // If status is 404, we do nothing and proceed, sha remains undefined.
    } catch (error) {
        console.error("Error checking for existing file on GitHub:", error);
        // Rethrow to be caught by the UI and display an alert
        throw error; 
    }

    // Prepare the content for upload
    const jsonString = JSON.stringify(data, null, 2);
    // Properly encode UTF-8 string to Base64 to handle special characters
    const content = btoa(unescape(encodeURIComponent(jsonString)));
    
    const body = JSON.stringify({
        message: `Backup automático do Clube do Xadrez - ${new Date().toISOString()}`,
        content: content,
        sha: sha // Include SHA if updating an existing file
    });

    // Create or update the file
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json' // FIX: Added missing Content-Type header
        },
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
        // Properly decode Base64 string to UTF-8 to handle special characters
        const base64Decoded = atob(data.content);
        const decodedContent = decodeURIComponent(escape(base64Decoded));
        return JSON.parse(decodedContent);
    }
    
    throw new Error("O arquivo de backup não contém conteúdo válido.");
};