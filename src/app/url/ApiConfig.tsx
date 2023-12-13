const BASE_URL = 'https://salesforce-gdrive-conn.herokuapp.com/inversionistas';

export const getApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;