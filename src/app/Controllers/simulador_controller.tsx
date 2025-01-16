import SimuladorData from "../Models/simulacion_models";
import Controller from "./controller";

class SimuladorController extends Controller {
  private static instance: SimuladorController;

  private constructor() {
    super();
  }

  public static getInstance(): SimuladorController {
    if (!SimuladorController.instance) {
      SimuladorController.instance = new SimuladorController();
    }
    return SimuladorController.instance;
  }

  public postSimulacion(
    email: string,
    amount: number,
    setterCallback: (params: any) => void,
    errorCallback: (params: any) => void
  ) {
    let endpoint = `inversionistas/simulador/?email=${email}&monto_inversion=${amount}`;

    this.postData(endpoint, null)
      .then((response) => {
        setterCallback(new SimuladorData(response));
      })
      .catch((err) => {
        errorCallback(err);
      });
  }

  public getPortfolio(
    setterCallback: (params: any) => void,
    errorCallback: (params: any) => void
  ) {
    let endpoint = `inversionistas/simulador/`;

    this.getData(endpoint)
      .then((response) => {
        setterCallback(new SimuladorData(response));
      })
      .catch((err) => {
        errorCallback(err);
      });
  }
}

export default SimuladorController;
