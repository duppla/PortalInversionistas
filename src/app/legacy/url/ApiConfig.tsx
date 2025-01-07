const BASE_URL = "https://back.duppla.co/inversionistas";

type QueryParams = {
  [key: string]: string | number | null;
};

export function getApiUrl(
  endpoint: string,
  queryParams: QueryParams = {}
): string {
  if (Object.keys(queryParams).length) {
    const queryParamsString = Object.entries(queryParams).map(
      ([key, value]) => [key, String(value)]
    );
    const params = new URLSearchParams(queryParamsString);
    return `${BASE_URL}${endpoint}?${params}`;
  }
  return `${BASE_URL}${endpoint}`;
}

export default async function fetchData(
  endpoint: string,
  email: string | null,
  setData: React.Dispatch<React.SetStateAction<any>>
) {
  try {
    const response = await fetch(getApiUrl(endpoint, { email: email }));
    const responseData = await response.json();
    setData(responseData);
  } catch (error) {
    console.error("Error al obtener los datos " + endpoint, error);
  }
}
