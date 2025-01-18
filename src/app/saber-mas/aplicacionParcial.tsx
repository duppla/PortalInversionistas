import { useState } from "react";
import Accordeon from "../Components/accordeon";
import Button from "../Components/button";
import Modal from "../Components/modal";
import Lead from "../Models/forms_models";
import FormsController from "../Controllers/forms_controller";
import Link from "next/link";
import Card from "../Components/card";

interface Props {
  controller: FormsController;
  campaign?: string;
  showsScore?: boolean;
  reloadOnAccept?: boolean;
}

export default function AplicacionParcial({
  controller,
  campaign = "701Rb00000MA4fDIAT",
  showsScore = false,
  reloadOnAccept = false,
}: Readonly<Props>) {
  // let params = useSearchParams();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: 0,
    age: undefined,
    email: undefined,
    investment: "",
    company: "",
    role: "",
    incomeTax: true,
    tyc: false,
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [declaraRenta, setDeclaraRenta] = useState<boolean>();
  const [score, setScore] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalErrOpen, setIsModalErrOpen] = useState<boolean>(false);
  const [optAge, setOptAge] = useState<any[]>([
    {
      id: "18 a 24 años",
      label: "18 a 24 años",
      value: "18 - 24 Años",
      textTwo: "age",
      disabled: false,
      isSelected: false,
    },
    {
      id: "25 a 45 años",
      label: "25 a 45 años",
      value: "25 - 45 Años",
      textTwo: "age",
      disabled: false,
      isSelected: false,
    },
    {
      id: "46 a 60 años",
      label: "46 a 60 años",
      value: "46 - 60 Años",
      textTwo: "age",
      disabled: false,
      isSelected: false,
    },
    {
      id: "Más de 60 años",
      label: "Más de 60 años",
      value: "> 60 Años",
      textTwo: "age",
      disabled: false,
      isSelected: false,
    },
  ]);
  const [optInv, setOptInv] = useState<any[]>([
    {
      id: "Menos de $30M",
      label: "Menos de 30 Millones de pesos",
      value: "Menos de 30 Millones",
      textTwo: "investment",
      disabled: false,
      isSelected: false,
    },
    {
      id: "$30M a $50M",
      label: "30 a 50 Millones de pesos",
      value: "30 a 50 Millones",
      textTwo: "investment",
      disabled: false,
      isSelected: false,
    },
    {
      id: "$50M a $200M",
      label: "50 a 200 Millones de pesos",
      value: "50 a 200 Millones",
      textTwo: "investment",
      disabled: false,
      isSelected: false,
    },
    {
      id: "Más de $200M",
      label: "Más de 200 Millones de pesos",
      value: "Mas de 200 Millones",
      textTwo: "investment",
      disabled: false,
      isSelected: false,
    },
  ]);
  const [optOcu, setOptOcu] = useState<any[]>([
    {
      id: "Rentista de Capital",
      label: "Rentista de Capital",
      value: "Rentista de Capital",
      textTwo: "role",
      disabled: false,
      isSelected: false,
    },
    {
      id: "Empresario / Ejecutivo",
      label: "Empresario / Ejecutivo",
      value: "Empresario / Ejecutivo",
      textTwo: "role",
      disabled: false,
      isSelected: false,
    },
    {
      id: "Profesional Independiente",
      label: "Profesional Independiente",
      value: "Profesional Independiente",
      textTwo: "role",
      disabled: false,
      isSelected: false,
    },
    {
      id: "Empleado",
      label: "Empleado",
      value: "Empleado",
      textTwo: "role",
      disabled: false,
      isSelected: false,
    },
    {
      id: "Pensionado",
      label: "Pensionado",
      value: "Pensionado",
      textTwo: "role",
      disabled: false,
      isSelected: false,
    },

    {
      id: "Estudiante",
      label: "Estudiante",
      value: "Estudiante",
      textTwo: "role",
      disabled: false,
      isSelected: false,
    }
  ]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChangeTax = (
    value: boolean,
  ) => {
    setFormData({
      ...formData,
      incomeTax: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const updateCurrencyInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: (arg0: number) => void
  ) => {
    const inputValue = event.target.value;
    let value = parseInt(inputValue.replace(/\D/g, ""));
    if (isNaN(value) || value === undefined) {
      setter(0);
      return;
    }
    setter(value);
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  function postAplicacion() {
    setIsFetching(true);
    const lead = new Lead(formData);
    controller.postFormLead(
      lead,
      campaign,
      "",
      //params.get("owner") ?? "",
      (scoreLead: any) => {
        setScore(scoreLead);
        setIsFetching(false);
        setIsModalOpen(true);
      },
      () => {
        setIsFetching(false);
        setIsModalErrOpen(true);
      }
    );
  }

  function checkForm(): boolean {
    return (
      formData.firstname == "" ||
      formData.lastname == "" ||
      formData.phone == 0 ||
      formData.investment == undefined ||
      declaraRenta === undefined ||
      !formData.tyc
    );
  }

  const handleOptionChangeSelector = (event: React.MouseEvent, value: any, [opt, setter]: any[], formItem: string) => {
    setter(
      opt.map((option: any) => {
        if (option.value === value) {
          setFormData({
            ...formData,
            [formItem]: value,
          });
          return { ...option, isSelected: true };
        } else {
          return { ...option, isSelected: false };
        }
      })
    );
  };
  const selectedValueAge = optAge.filter((o) => o.isSelected, optAge[0]).pop();
  const selectedValueInv = optInv.filter((o) => o.isSelected, optInv[0]).pop();
  const selectedValueOcu = optOcu.filter((o) => o.isSelected, optOcu[0]).pop();

  return (
    <>
      <form
        className="grid grid-cols-1 md:grid-cols-6 h-full w-full text-sonador"
        onSubmit={handleSubmit}
      >
        <div
          className="col-span-1 md:col-span-6 flex flex-col gap-6 py-12 bg-sonador-darker/20 backdrop-blur-md text-ilusion"
        >
          <h1
            className={
              "md:col-span-6 rustica-bold text-5xl text-center px-4"
            }
          >
            ¿Quieres saber más?
          </h1>
          <h2
            className={"md:col-span-6 rustica text-xl text-center px-4"}
          >
            Invertir con duppla es fácil y seguro, deja tus datos y nuestro equipo de expertos se contactará contigo
          </h2>
        </div>
        <div
          className={
            "md:col-span-4 md:col-start-2 flex flex-col gap-4 mt-4 px-4 md:px-0"
          }
        >
          <div className="col-span-1">
            <label
              htmlFor="Nombre"
              className="block font-nunito-sans text-sm font-medium"
            >
              Nombre<span className="text-sonador-darker">*</span>
            </label>
            <input
              className="block p-2.5 w-full z-20 text-sm bg-sonador-dark/40 backdrop-blur shadow-inner shadow-futuro-darker/30 rounded-lg focus:ring-blue-500 focus:border-blue-500 my-2"
              placeholder="Nombre"
              type="text"
              id="Nombre"
              name="firstname"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="Apellido"
              className="block font-nunito-sans text-sm font-medium  "
            >
              Apellido<span className="text-sonador-darker">*</span>
            </label>
            <input
              className="block p-2.5 w-full z-20 text-sm bg-sonador-dark/40 backdrop-blur shadow-inner shadow-futuro-darker/30 rounded-lg focus:ring-blue-500 focus:border-blue-500 my-2"
              placeholder="Apellido"
              type="text"
              id="Apellido"
              name="lastname"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="Celular"
              className="block font-nunito-sans text-sm font-medium  "
            >
              Número de celular<span className="text-sonador-darker">*</span>
            </label>
            <input
              className="block p-2.5 w-full z-20 text-sm bg-sonador-dark/40 backdrop-blur shadow-inner shadow-futuro-darker/30 rounded-lg focus:ring-blue-500 focus:border-blue-500 my-2"
              placeholder="Celular"
              type="number"
              min={0}
              id="Celular"
              name="phone"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="Correo"
              className="block font-nunito-sans text-sm font-medium"
            >
              Correo electrónico<span className="text-sonador-darker">*</span>
            </label>
            <input
              className="block p-2.5 w-full z-20 text-sm bg-sonador-dark/40 backdrop-blur shadow-inner shadow-futuro-darker/30 rounded-lg focus:ring-blue-500 focus:border-blue-500 my-2"
              placeholder="Correo"
              type="email"
              id="Correo"
              onChange={handleInputChange}
              name="email"
              required
            />
          </div>
          <div className="col-span-1 flex flex-row gap-2 items-center">
            <p className="text-left font-nunito-sans text-sonador-darker text-sm shrink-0">
              Datos complementarios
            </p>
            <hr className="border-sonador-darker w-full" />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="Edad"
              className="block font-nunito-sans text-sm font-medium  "
            >
              Edad
            </label>
            <div className="py-2">
              <Accordeon
                textLeft="Tengo:"
                textRight={selectedValueAge ? selectedValueAge.id : ""}
                defaultOpen
              >
                <div className="border border-sonador/50 rounded-xl rounded-t-none divide-y divide-sonador/40 border-t-0">
                  {optAge.map((o: any, index: number) => (
                    <div
                      key={o.id}
                      className={`flex flex-row justify-between p-2 backdrop-blur bg-sonador/10 ${o.isSelected && "bg-sonador-darker/50"
                        } hover:bg-sonador-darker/20 ${index == optAge.length - 1 &&
                        "rounded-[11px] rounded-t-none"
                        }`}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleOptionChangeSelector(e, o.value, [optAge, setOptAge], o.textTwo)}
                    >
                      <p className="font-nunito-sans font-bold">
                        {o.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Accordeon>
            </div>
          </div>
          <div className="col-span-1">
            <label
              htmlFor="Inversion"
              className="block font-nunito-sans text-sm font-medium  "
            >
              Ocupación
            </label>
            <div className="py-2">
              <Accordeon
                textLeft="Soy:"
                textRight={selectedValueOcu ? selectedValueOcu.id : ""}
                defaultOpen
              >
                <div className="border border-sonador/50 rounded-xl rounded-t-none divide-y divide-sonador/40 border-t-0">
                  {optOcu.map((o: any, index: number) => (
                    <div
                      key={o.id}
                      className={`flex flex-row justify-between p-2 backdrop-blur bg-sonador/10 ${o.isSelected && "bg-sonador-darker/50"
                        } hover:bg-sonador-darker/20 ${index == optOcu.length - 1 &&
                        "rounded-[11px] rounded-t-none"
                        }`}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleOptionChangeSelector(e, o.value, [optOcu, setOptOcu], o.textTwo)}
                    >
                      <p className="font-nunito-sans font-bold">
                        {o.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Accordeon>
            </div>
          </div>
          {/* <div className="col-span-1">
            <label
              htmlFor="Empleo"
              className="block font-nunito-sans text-sm font-medium  "
            >
              Empresa donde trabaja
            </label>
            <input
              className="block p-2.5 w-full z-20 text-sm bg-sonador-dark/40 backdrop-blur shadow-inner shadow-futuro-darker/30 rounded-lg focus:ring-blue-500 focus:border-blue-500 my-2"
              placeholder="Empresa"
              type="text"
              min={0}
              id="Empresa"
              onChange={handleInputChange}
              name="company"
            />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="Empleo"
              className="block font-nunito-sans text-sm font-medium  "
            >
              Cargo o función
            </label>
            <input
              className="block p-2.5 w-full z-20 text-sm bg-sonador-dark/40 backdrop-blur shadow-inner shadow-futuro-darker/30 rounded-lg focus:ring-blue-500 focus:border-blue-500 my-2"
              placeholder="Cargo"
              type="text"
              min={0}
              id="Cargo"
              onChange={handleInputChange}
              name="role"
            />
          </div> */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="Declaración renta"
              className="block font-nunito-sans text-sm font-medium"
            >
              Estatus declarante<span className="text-sonador-darker">*</span>
            </label>
            <Card className="col-span-1 rounded-[9px]" noPadding>
              <div className="col-span-1 flex flex-row">
                <Button id="Declaro" onClick={() => { handleInputChangeTax(true), setDeclaraRenta(true) }} color={declaraRenta === true ? "sonador" : "toggle_l"} className="w-full">Debo declarar renta</Button>
                <Button id="No declaro" onClick={() => { handleInputChangeTax(false), setDeclaraRenta(false) }} color={declaraRenta === false ? "sonador" : "toggle_r"} className="w-full">No debo declarar renta</Button>
              </div>
            </Card>
          </div>
        </div>
        <div
          className={
            "md:col-span-4 md:col-start-2 flex flex-col gap-4 mb-8 px-4 md:px-0 font-nunito-sans mt-4"
          }
        >
          <div className="col-span-1 flex flex-row gap-2 items-center">
            <p className="text-left font-nunito-sans text-sonador-darker text-sm shrink-0">
              Información de inversión (opcional)
            </p>
            <hr className="border-sonador-darker w-full" />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="Inversion"
              className="block font-nunito-sans text-sm font-medium  "
            >
              Monto aproximado a invertir
            </label>
            <div className="py-2">
              <Accordeon
                textLeft="Piensos invertir:"
                textRight={selectedValueInv ? selectedValueInv.id : ""}
                defaultOpen
              >
                <div className="border border-sonador/50 rounded-xl rounded-t-none divide-y divide-sonador/40 border-t-0">
                  {optInv.map((o: any, index: number) => (
                    <div
                      key={o.id}
                      className={`flex flex-row justify-between p-2 backdrop-blur bg-sonador/10 ${o.isSelected && "bg-sonador-darker/50"
                        } hover:bg-sonador-darker/20 ${index == optInv.length - 1 &&
                        "rounded-[11px] rounded-t-none"
                        }`}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleOptionChangeSelector(e, o.value, [optInv, setOptInv], o.textTwo)}
                    >
                      <p className="font-nunito-sans font-bold">
                        {o.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Accordeon>
            </div>
          </div>
          <label>
            <input
              type="checkbox"
              id="tyc"
              name="tyc"
              value="tyc"
              required
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tyc: e.target.checked,
                })
              }
            />{" "}
            He leido y acepto los{" "}
            <Link
              className="text-sonador-darker hover:underline"
              href="/TyC"
              target="_blank"
            >
              {" "}
              términos y condiciones
            </Link>
            <span className="text-sonador-darker"> *</span>
          </label>
        </div>
        <div
          className={
            "md:col-span-4 md:col-start-2 flex flex-col gap-4 mb-8 px-4 md:px-0"
          }
        >
          <Button
            id={"Aplicar"}
            onClick={isFetching || checkForm() ? undefined : postAplicacion}
            className="w-full col-span-1 md:col-span-3"
          >
            <h2 className={"rustica-bold text-lg text-center"}>
              Finalizar registro
            </h2>
          </Button>
        </div>
      </form>
      <div className="col-span-1 md:col-span-6 flex justify-center items-center">
        {isModalOpen && (
          <Modal
            id="Success"
            title={"¡Inscripción realizada con éxito!"}
            image={"https://cotizacion-web.s3.amazonaws.com/5.png"}
            textButton="Aceptar"
            onAccept={() => {
              setIsModalOpen(false);
            }}
            toggleModal={() => setIsModalOpen(!isModalOpen)}
            buttonUrl={reloadOnAccept ? `/saber-mas/${campaign}` : "/"}
          >
            <>
              <p className="font-nunito-sans text-center text-lg text-white text-pretty">
                Ya estás más cerca de hacer crecer tu dinero.
                {showsScore && <span className="font-nunito-sans font-bold text-sm text-sonador-darker"> {score}</span>}
              </p>
              <p className="font-nunito-sans text-center text-lg text-white text-pretty">
                Nuestros expertos se pondrán en contacto contigo próximamente para continuar con el proceso.
              </p>
            </>
          </Modal>
        )}
      </div>
      <div className="col-span-1 md:col-span-6 flex justify-center items-center">
        {isModalErrOpen && (
          <Modal
            id="Error"
            title={"¡No pudimos completar tu solicitud!"}
            image={"https://cotizacion-web.s3.amazonaws.com/5.png"}
            textButton="Aceptar"
            onAccept={() => {
              setIsModalErrOpen(false);
            }}
            toggleModal={() => setIsModalErrOpen(!isModalErrOpen)}
          >
            <p className=" font-nunito-sans text-center text-lg text-white">
              Vuelve a intentarlo más tarde
            </p>
          </Modal>
        )}
      </div>
    </>
  );
}
