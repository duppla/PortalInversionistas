class FlujoInmueble {
    fecha: string;
    monto: number;
    constructor(data: any) {
        this.fecha = data.fecha;
        this.monto = data.monto;
    }
}


class Inmueble {
    numero: number;
    inmueble: string;
    spv_irr: number;
    flujo: FlujoInmueble[];
    constructor(data: any) {
        this.numero = data.numero;
        this.inmueble = data.inmueble;
        this.spv_irr = data.spv_irr;
        this.flujo = data.flujo.map((flujo: any) => new FlujoInmueble(flujo));
    }
}

class SimuladorData {
    public monto_a_invertir: number;
    public tasa_descuento: number;
    public fecha_valoracion: string;
    public inmuebles: Inmueble[];
    public precio_flujo: number;
    public participacion_adquirida: number;
    public precio_portafolio_adquirido: number;
    public rentabilidad: string;
    public valor_beneficio: number;
    public participacion_comprada: number;
    public total_acumulado_portafolio: number;
    public total_acumulado_portafolio_porc: string;
    public ganancia_5_anhos: number;
    public ganancia_5_anhos_porc: number;
    public acumulado_por_rentas: number;
    public acumulado_por_rentas_porc: number;
    public acumulado_por_valorizacion: number;
    public acumulado_por_valorizacion_porc: number;
    public renta_mensual_promedio: number;
    public renta_mensual_promedio_porc: number;
    public promedio_mensual_renta_mas_capital: number;
    public promedio_mensual_renta_mas_capital_porc: number;
    public promedio_valorizacion_mas_capital: number;
    public promedio_valorizacion_mas_capital_porc: number;
    public promedio_rentas_mas_valorizacion: number;
    public promedio_rentas_mas_valorizacion_porc: number;
    public mes: number[];
    public pago_mensual: number[];
    public porcentaje_mes: number[];
    public porcentaje_acumulado: number[];
    public dinero_acumulado: number[];
    public noi: number[];
    public apreciacion: number[];

    constructor(data: any) {
        this.monto_a_invertir = data.monto_a_invertir;
        this.tasa_descuento = data.tasa_descuento;
        this.fecha_valoracion = data.fecha_valoracion;
        this.inmuebles = data.inmuebles.map((inmueble: any) => new Inmueble(inmueble));
        this.precio_flujo = data.precio_flujo;
        this.participacion_adquirida = data.participacion_adquirida;
        this.precio_portafolio_adquirido = data.precio_portafolio_adquirido;
        this.rentabilidad = data.rentabilidad;
        this.valor_beneficio = data.valor_beneficio;
        this.participacion_comprada = data.participacion_comprada;
        this.total_acumulado_portafolio = data.total_acumulado_portafolio;
        this.total_acumulado_portafolio_porc = data.total_acumulado_portafolio_porc;
        this.ganancia_5_anhos = data.ganancia_5_anhos;
        this.ganancia_5_anhos_porc = data.ganancia_5_anhos_porc;
        this.acumulado_por_rentas = data.acumulado_por_rentas;
        this.acumulado_por_rentas_porc = data.acumulado_por_rentas_porc;
        this.acumulado_por_valorizacion = data.acumulado_por_valorizacion;
        this.acumulado_por_valorizacion_porc = data.acumulado_por_valorizacion_porc;
        this.renta_mensual_promedio = data.renta_mensual_promedio;
        this.renta_mensual_promedio_porc = data.renta_mensual_promedio_porc;
        this.promedio_mensual_renta_mas_capital = data.promedio_mensual_renta_mas_capital;
        this.promedio_mensual_renta_mas_capital_porc = data.promedio_mensual_renta_mas_capital_porc;
        this.promedio_valorizacion_mas_capital = data.promedio_valorizacion_mas_capital;
        this.promedio_valorizacion_mas_capital_porc = data.promedio_valorizacion_mas_capital_porc;
        this.promedio_rentas_mas_valorizacion = data.promedio_rentas_mas_valorizacion;
        this.promedio_rentas_mas_valorizacion_porc = data.promedio_rentas_mas_valorizacion_porc;
        this.mes = data.mes;
        this.pago_mensual = data.pago_mensual;
        this.porcentaje_mes = data.porcentaje_mes;
        this.porcentaje_acumulado = data.porcentaje_acumulado;
        this.dinero_acumulado = data.dinero_acumulado;
        this.noi = data.noi;
        this.apreciacion = data.apreciacion;
    }
}

export default SimuladorData;