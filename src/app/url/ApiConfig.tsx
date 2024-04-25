const BASE_URL = "https://dev.back.duppla.co/inversionistas";

type QueryParams = {
  [key: string]: string | number | null;
};

export default function getApiUrl(
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
