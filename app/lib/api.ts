type FetchParams = {
    endpoint: string;
    method?: string;
    headers?: Record<string, string>;
    body?: any;
};
  
const customFetch = async ({ endpoint, method = "GET", headers, body }: FetchParams): Promise<any> => {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://restcountries.com/v3.1';

    try {
        const response = await fetch(apiUrl + endpoint, {
            method,
            headers,
            body,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        throw err;
    }
};

export default customFetch;