const BASE_URL = 'https://salesforce-gdrive-conn.herokuapp.com/inversionistas';


export const getApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;

/* https://backend-portal-inversionistas-c6f90ae68a14.herokuapp.com/inversionistas/inmuebles/c/?investor=Skandia */
const BASE_URL_F = 'https://backend-portal-inversionistas-c6f90ae68a14.herokuapp.com/inversionistas';






export const getApiUrlFinal = (endpoint: string) => `${BASE_URL_F}${endpoint}`;