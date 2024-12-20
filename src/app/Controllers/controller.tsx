abstract class Controller {
  protected constructor() { }

  protected async getData(endpoint: string, queryParameters?: string) {
    const options = { method: "GET" };
    const response = await fetch(
      `https://back.duppla.co/${endpoint}${queryParameters ?? ""}`,
      options
    );
    const responseData = await response.json();

    if (!responseData) {
      console.warn("Respuesta del API vacía");
    }
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return responseData;
  }

  protected async getDataCreditScoring(
    endpoint: string,
    queryParameters?: string
  ) {
    const options = { method: "GET" };
    const response = await fetch(
      `https://duppla-credit-scoring.herokuapp.com/${endpoint}${queryParameters ?? ""
      }`,
      options
    );
    const responseData = await response.json();

    if (!responseData) {
      console.warn("Respuesta del API vacía");
    }
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }

    return responseData;
  }

  protected async postDataCreditScoring(endpoint: string, body: any) {
    let options = {
      method: "POST", // Cambiar el método a POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(
      `https://duppla-credit-scoring.herokuapp.com/${endpoint}`,
      options
    );
    const responseData = await response.json();

    if (!responseData) {
      console.warn("Respuesta del API vacía");
    }
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }

    return responseData;
  }

  protected async postData(endpoint: string, body: any) {
    let options = {
      method: "POST", // Cambiar el método a POST
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const response = await fetch(`https://back.duppla.co/${endpoint}`, options);
    const responseData = await response.json();

    if (!responseData) {
      console.warn("Respuesta del API vacía");
    }
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }

    return responseData;
  }
}

export default Controller;
