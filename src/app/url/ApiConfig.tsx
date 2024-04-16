const BASE_URL = "https://dev.back.duppla.co/inversionistas";

export const getApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;
