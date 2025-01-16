"use client"
import Link from "next/link";
import Button from "../Components/button";
import Navbar from "../Components/navbar";

export default function TyC() {

    return (
        <main className="flex w-full min-h-screen flex-col items-center justify-between absolute">
            <Navbar>
                <Link href="/simulador" className="hover:underline">Simulador</Link>
                <Link href="/saber-mas" className="hover:underline">Registrarse</Link>
                <Link href="/legacy" className="hover:underline">
                    <Button id={"login"} onClick={() => { }}>Ingresar</Button>
                </Link>
            </Navbar>
            <div className="container flex flex-col gap-2 text-sonador text-justify my-8">
                <h2 className="text-4xl rustica-bold text-ilusion text-left text-pretty">Política de tratamiento de datos</h2>
                <p className="font-nunito-sans"><span className="font-bold">COMPRA MIENTRAS ALQUILAS S.A.S.</span>, sociedad comercial identificada con NIT 901.573.094-9 y correo electrónico de contacto legal@duppla.co, en calidad de <span className="font-bold">responsable del tratamiento de los datos personales</span>, en cumplimiento de lo dispuesto en la Ley 1581 de 2012, el Decreto 1377 de 2013 y demás normas aplicables en materia de protección de datos personales en Colombia, garantiza la privacidad y seguridad de los datos personales recolectados, almacenados, tratados y utilizados dentro del marco de su objeto social.</p>
                <h3 className="text-2xl rustica-bold text-ilusion mt-4">1. Finalidades del tratamiento de datos personales</h3>
                <p className="font-nunito-sans">
                    Los datos personales recolectados serán utilizados para los siguientes fines específicos:
                    <ul className="p-4">
                        <li>Prestación de los servicios contratados.</li>
                        <li>Ejecución y cumplimiento de las obligaciones contractuales y legales adquiridas con usted.</li>
                        <li>Envío de comunicaciones comerciales, publicitarias o promocionales relacionadas con nuestros productos o servicios, siempre que se haya otorgado consentimiento previo.</li>
                        <li>Gestión de relaciones con proveedores y aliados estratégicos.</li>
                        <li>Realización de estudios de mercado y encuestas de satisfacción.</li>
                        <li>Gestión de cobro y facturación, así como la atención de requerimientos de las autoridades competentes.</li>
                    </ul>
                    Los datos personales que podrán ser tratados incluyen, pero no se limitan a: nombre, número de identificación, dirección, correo electrónico, teléfono, información financiera y de facturación, así como cualquier otra información necesaria para la prestación de nuestros servicios.
                </p>
                <h3 className="text-2xl rustica-bold text-ilusion mt-4">2. Derechos del titular de los datos</h3>
                <p className="font-nunito-sans">Como titular de los datos personales, usted tiene los derechos consagrados en el artículo 8 de la Ley 1581 de 2012, tales como:
                    <ul className="p-4">
                        <li><span className="font-bold">Acceder</span> a sus datos personales almacenados en nuestras bases de datos.</li>
                        <li><span className="font-bold">Actualizar y rectificar</span> sus datos cuando sean inexactos, incompletos o desactualizados.</li>
                        <li><span className="font-bold">Solicitar</span> la supresión de sus datos personales en caso de que no se cumplan los principios, derechos y garantías constitucionales.</li>
                        <li><span className="font-bold">Revocar</span> la autorización otorgada para el tratamiento de sus datos personales, salvo que exista una obligación legal o contractual que lo impida.</li>
                    </ul>
                    Para ejercer estos derechos, puede contactarnos a través del correo electrónico legal@duppla.co o la dirección física Calle 7A No. 126A - 55.
                </p>
                <h3 className="text-2xl rustica-bold text-ilusion mt-4">3. Transferencia y transmisión de datos personales a terceros</h3>
                <p className="font-nunito-sans">Sus datos personales podrán ser compartidos con terceros proveedores de servicios que actúan en nombre y por cuenta de COMPRA MIENTRAS ALQUILAS S.A.S., siempre bajo nuestra supervisión y responsabilidad, para cumplir con las finalidades aquí descritas. Dichos terceros podrán incluir, entre otros:
                    <ul className="p-4">
                        <li>Proveedores de servicios tecnológicos.</li>
                        <li>Entidades financieras o de cobranza.</li>
                        <li>Autoridades competentes en virtud de mandatos legales.</li>
                    </ul>
                    En caso de realizar transferencias internacionales de datos, se garantizará el cumplimiento de los requisitos establecidos por la Superintendencia de Industria y Comercio (SIC) y la legislación colombiana, según el artículo 26 de la Ley 1581 de 2012.
                </p>
                <h3 className="text-2xl rustica-bold text-ilusion mt-4">4. Seguridad y confidencialidad de los datos personales</h3>
                <p className="font-nunito-sans">
                    COMPRA MIENTRAS ALQUILAS S.A.S. implementa medidas de seguridad técnicas, humanas y administrativas adecuadas para proteger los datos personales contra acceso no autorizado, pérdida, alteración o uso indebido, conforme al artículo 19 del Decreto 1377 de 2013.
                </p>
                <h3 className="text-2xl rustica-bold text-ilusion mt-4">5. Modificaciones a la política</h3>
                <p className="font-nunito-sans">
                    Esta política puede ser modificada en cualquier momento, siempre en cumplimiento de las disposiciones legales aplicables. Cualquier cambio significativo será comunicado a través de nuestros canales de contacto habituales.
                </p>
                <h3 className="text-2xl rustica-bold text-ilusion mt-4">6. Consentimiento</h3>
                <p className="font-nunito-sans">
                    Al otorgar esta autorización, usted declara que ha leído, entendido y aceptado los términos de esta política de tratamiento de datos personales. De igual forma, otorga su consentimiento expreso e informado para el tratamiento de sus datos personales de acuerdo con los fines aquí establecidos.
                </p>
            </div>
        </main>
    );
}