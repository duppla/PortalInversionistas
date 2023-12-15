const BASE_URL = 'https://salesforce-gdrive-conn.herokuapp.com/inversionistas';


export const getApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;

const BASE_URL_F = 'https://0kkwdwxhm2.execute-api.us-east-1.amazonaws.com/data';


export const getApiUrlFinal = (endpoint: string) => `${BASE_URL_F}${endpoint}`;