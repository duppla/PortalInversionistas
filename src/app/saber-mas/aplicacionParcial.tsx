import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Accordeon from "../Components/accordeon";
import Button from "../Components/button";
import Modal from "../Components/modal";
import Controller from "../Controllers/controller";
import Lead from "../Models/forms_models";
import FormsController from "../Controllers/forms_controller";
import Link from "next/link";

interface Props {
  controller: Controller;
  campaign?: string;
}

export default function AplicacionParcial({
  controller,
  campaign = "",
}: Readonly<Props>) {
  // let params = useSearchParams();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: 0,
    email: undefined,
    document_type: undefined,
    document_number: 0,
    income: undefined,
    downpayment: undefined,
    property_val: undefined,
    property_type: undefined,
    search_status: undefined,
    notes: undefined,
    tyc: false,
  });
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalErrOpen, setIsModalErrOpen] = useState<boolean>(false);
  const [optDoc, setOptDoc] = useState<any[]>([
    {
      id: "Menos de $30M",
      label: "Menos de 30 Millones de pesos",
      value: "<30",
      textTwo: "",
      disabled: false,
      isSelected: false,
    },
    {
      id: "$30M a $50M",
      label: "30 a 50 Millones de pesos",
      value: "30-500",
      textTwo: "",
      disabled: false,
      isSelected: false,
    },
    {
      id: "$50M a $200M",
      label: "50 a 200 Millones de pesos",
      value: "50-200",
      textTwo: "",
      disabled: false,
      isSelected: false,
    },
    {
      id: "Más de $200M",
      label: "Más de 200 Millones de pesos",
      value: ">200",
      textTwo: "",
      disabled: false,
      isSelected: false,
    },
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
    if (!(controller instanceof FormsController)) {
      setIsFetching(false);
      return;
    }

    controller.postFormLead(
      lead,
      campaign,
      "",
      //params.get("owner") ?? "",
      (lead_id: string) => {
        setIsFetching(false);
        if (lead_id) {
          setIsModalOpen(true);
        }
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
      selectedValue == undefined ||
      !formData.tyc
    );
  }

  const handleOptionChangeDoc = (event: React.MouseEvent, value: any) => {
    setOptDoc(
      optDoc.map((option: any) => {
        if (option.value === value) {
          setFormData({
            ...formData,
            document_type: value,
          });
          return { ...option, isSelected: true };
        } else {
          return { ...option, isSelected: false };
        }
      })
    );
  };
  const selectedValue = optDoc.filter((o) => o.isSelected, optDoc[0]).pop();

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
              "md:col-span-6 rustica-bold text-5xl text-center"
            }
          >
            ¿Quieres saber más?
          </h1>
          <h2
            className={"md:col-span-6 rustica text-xl text-center"}
          >
            Invertir con duppla es fácil y seguro, deja tus datos.
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
              Correo electrónico
            </label>
            <input
              className="block p-2.5 w-full z-20 text-sm bg-sonador-dark/40 backdrop-blur shadow-inner shadow-futuro-darker/30 rounded-lg focus:ring-blue-500 focus:border-blue-500 my-2"
              placeholder="Correo"
              type="email"
              id="Correo"
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div className="col-span-1 flex flex-row gap-2 items-center">
            <p className="text-left font-nunito-sans text-sonador-darker text-sm shrink-0">
              Información de inversión
            </p>
            <hr className="border-sonador-darker w-full" />
          </div>
          <div className="col-span-1">
            <label
              htmlFor="TipoDocumento"
              className="block font-nunito-sans text-sm font-medium  "
            >
              Monto aproximado a invertir<span className="text-sonador-darker">*</span>
            </label>
            <div className="py-2">
              <Accordeon
                textLeft="Deseo invertir:"
                textRight={selectedValue ? selectedValue.id : ""}
                defaultOpen
              >
                <div className="border border-sonador/50 rounded-xl rounded-t-none divide-y divide-sonador/40 border-t-0">
                  {optDoc.map((o: any, index: number) => (
                    <div
                      key={o.id}
                      className={`flex flex-row justify-between p-2 backdrop-blur bg-sonador/10 ${o.isSelected && "bg-sonador-darker/50"
                        } hover:bg-sonador-darker/20 ${index == optDoc.length - 1 &&
                        "rounded-[11px] rounded-t-none"
                        }`}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleOptionChangeDoc(e, o.value)}
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
          <div className="col-span-1 flex flex-row gap-2 items-center">
            <p className="text-left font-nunito-sans text-sonador-darker text-sm shrink-0">
              Datos complementarios
            </p>
            <hr className="border-sonador-darker w-full" />
          </div>
          <div className="col-span-1">
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
              id="NumeroDocumento"
              onChange={handleInputChange}
              name="document_number"
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
              id="NumeroDocumento"
              onChange={handleInputChange}
              name="document_number"
            />
          </div>
        </div>
        <div
          className={
            "md:col-span-4 md:col-start-2 flex flex-col gap-4 mb-8 px-4 md:px-0 font-nunito-sans mt-4"
          }
        >
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
              href="https://duppla.co/terminos-y-condiciones"
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
            body={
              "Ya estas un paso más cerca de cumplir el sueño de tener casa propia. Nuestros expertos se pondrán en contacto contigo próximamente para continuar con el proceso."
            }
            textButton="Aceptar"
            onAccept={() => {
              setIsModalOpen(false);
            }}
            toggleModal={() => setIsModalOpen(!isModalOpen)}
          ></Modal>
        )}
      </div>
      <div className="col-span-1 md:col-span-6 flex justify-center items-center">
        {isModalErrOpen && (
          <Modal
            id="Error"
            title={"¡No pudimos completar tu solicitud!"}
            image={"https://cotizacion-web.s3.amazonaws.com/5.png"}
            body={"Vuelve a intentarlo más tarde"}
            textButton="Aceptar"
            onAccept={() => {
              setIsModalErrOpen(false);
            }}
            toggleModal={() => setIsModalErrOpen(!isModalErrOpen)}
          ></Modal>
        )}
      </div>
    </>
  );
}
