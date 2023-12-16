const BASE_URL = 'https://salesforce-gdrive-conn.herokuapp.com/inversionistas';


export const getApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;

const BASE_URL_F = 'https://ngya0krkm1.execute-api.us-east-1.amazonaws.com/prod/data';
/* https://ngya0krkm1.execute-api.us-east-1.amazonaws.com/prod/data/inmuebles/c?investor=skandia */




export const getApiUrlFinal = (endpoint: string) => `${BASE_URL_F}${endpoint}`;