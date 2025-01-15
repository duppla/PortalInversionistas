import Lead from "../Models/forms_models";
import Controller from "./controller";

class FormsController extends Controller {
  private static instance: FormsController;

  private constructor() {
    super();
  }

  public static getInstance(): FormsController {
    if (!FormsController.instance) {
      FormsController.instance = new FormsController();
    }
    return FormsController.instance;
  }

  public postFormLead(
    lead: Lead,
    campaign: string,
    owner: string,
    setterCallback: (params: any) => void,
    errorCallback: () => void
  ) {
    let endpoint = `inversionistas/simulador/?email=fcortes@duppla.co&monto_inversion=600000000`;
    if (owner) {
      endpoint += `?owner=${owner}`;
    }
    this.postData(endpoint, lead)
      .then((response) => {
        setterCallback(response as string);
      })
      .catch((err) => {
        errorCallback();
      });
  }
}

export default FormsController;
