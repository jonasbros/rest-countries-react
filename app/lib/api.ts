type FetchParams = {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: any;
};
  
const customFetch = async ({ url, method = "GET", headers, body }: FetchParams): Promise<any> => {
    try {
        const response = await fetch(url, {
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