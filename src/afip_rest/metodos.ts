/* Copyright (c) 2018-Present Gustavo A. Corradi <gcorrad@gmail.com>
**  
** MIT License
** 
** Permission is hereby granted, free of charge, to any person obtaining a copy
** of this software and associated documentation files (the "Software"), to deal
** in the Software without restriction, including without limitation the rights
** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
** copies of the Software, and to permit persons to whom the Software is
** furnished to do so, subject to the following conditions:
** 
** The above copyright notice and this permission notice shall be included in all
** copies or substantial portions of the Software.
** 
** THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
** IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
** FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
** AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
** LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
** OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
** SOFTWARE.
*/

import { t_afip_rest } from "./tipos";

export const serv: { [id: string]: t_afip_rest } = {
  wsaa: {
    urls: {
      test: {
        url: "https://wsaahomo.afip.gov.ar/ws/services/LoginCms",
        wsdl: "https://wsaahomo.afip.gov.ar/ws/services/LoginCms?WSDL",
      },
      prod: {
        url: "https://wsaa.afip.gov.ar/ws/services/LoginCms",
        wsdl: "https://wsaa.afip.gov.ar/ws/services/LoginCms?WSDL",
      },
    },
    envdescr: ["LoginCMSService", "LoginCms"],
    authname: "Auth",
    authkeys: {
      Token: "",
      Sign: "",
      Cuit: "",
    },
    metodos: [{ loginCms: { ret: "loginCmsReturn" } }],
  },
  wsfe: {
    urls: {
      test: {
        url: "https://wswhomo.afip.gov.ar/wsfev1/service.asmx",
        wsdl: "https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL"
      },
      prod: {
        url: "https://servicios1.afip.gov.ar/wsfev1/service.asmx",
        wsdl: "https://servicios1.afip.gov.ar/wsfev1/service.asmx?WSDL"
      }
    },
    envdescr: ["Service", "ServiceSoap12"],
    authname: "Auth",
    authkeys: {
      Token: "",
      Sign: "",
      Cuit: ""
    },
    metodos: [
      { FEParamGetTiposTributos: { ret: "FEParamGetTiposTributosResult" } },
      { FECAESolicitar: { ret: "FECAESolicitarResult" } },
      { FECompTotXRequest: { ret: "FECompTotXRequestResult" } },
      { FEDummy: { ret: "FEDummyResult" } },
      { FECompUltimoAutorizado: { ret: "FECompUltimoAutorizadoResult" } },
      { FECompConsultar: { ret: "FECompConsultarResult" } },
      { FECAEARegInformativo: { ret: "FECAEARegInformativoResult" } },
      { FECAEASolicitar: { ret: "FECAEASolicitarResult" } },
      { FECAEASinMovimientoConsultar: { ret: "FECAEASinMovimientoConsultarResult" } },
      { FECAEASinMovimientoInformar: { ret: "FECAEASinMovimientoInformarResult" } },
      { FECAEAConsultar: { ret: "FECAEAConsultarResult" } },
      { FEParamGetCotizacion: { ret: "FEParamGetCotizacionResult" } },
      { FEParamGetTiposTributos: { ret: "FEParamGetTiposTributosResult" } },
      { FEParamGetTiposMonedas: { ret: "FEParamGetTiposMonedasResult" } },
      { FEParamGetTiposIva: { ret: "FEParamGetTiposIvaResult" } },
      { FEParamGetTiposOpcional: { ret: "FEParamGetTiposOpcionalResult" } },
      { FEParamGetTiposConcepto: { ret: "FEParamGetTiposConceptoResult" } },
      { FEParamGetPtosVenta: { ret: "FEParamGetPtosVentaResult" } },
      { FEParamGetTiposCbte: { ret: "FEParamGetTiposCbteResult" } },
      { FEParamGetTiposDoc: { ret: "FEParamGetTiposDocResult" } },
      { FEParamGetTiposPaises: { ret: "FEParamGetTiposPaisesResult" } }
    ]
  },
  wsfex: {
    urls: {
      test: {
        url: "https://wswhomo.afip.gov.ar/wsfexv1/service.asmx",
        wsdl: "https://wswhomo.afip.gov.ar/wsfexv1/service.asmx?WSDL"
      },
      prod: {
        url: "https://servicios1.afip.gov.ar/wsfexv1/service.asmx",
        wsdl: "https://servicios1.afip.gov.ar/wsfexv1/service.asmx?WSDL"
      }
    },
    envdescr: ["Service", "ServiceSoap12"],
    authname: "Auth",
    authkeys: {
      Token: "",
      Sign: "",
      Cuit: ""
    },
    metodos: [
      { FEXAuthorize: { ret: "FEXAuthorizeResult" } },
      { FEXGetCMP: { ret: "FEXGetCMPResult" } },
      { FEXGetPARAM_Cbte_Tipo: { ret: "FEXGetPARAM_Cbte_TipoResult" } },
      { FEXGetPARAM_Tipo_Expo: { ret: "FEXGetPARAM_Tipo_ExpoResult" } },
      { FEXGetPARAM_Incoterms: { ret: "FEXGetPARAM_IncotermsResult" } },
      { FEXGetPARAM_Idiomas: { ret: "FEXGetPARAM_IdiomasResult" } },
      { FEXGetPARAM_UMed: { ret: "FEXGetPARAM_UMedResult" } },
      { FEXGetPARAM_DST_pais: { ret: "FEXGetPARAM_DST_paisResult" } },
      { FEXGetPARAM_DST_CUIT: { ret: "FEXGetPARAM_DST_CUITResult" } },
      { FEXGetPARAM_MON: { ret: "FEXGetPARAM_MONResult" } },
      { FEXGetPARAM_MON_CON_COTIZACION: { ret: "FEXGetPARAM_MON_CON_COTIZACIONResult" } },
      { FEXGetLast_CMP: { ret: "FEXGetLast_CMPResult" } },
      { FEXDummy: { ret: "FEXDummyResult" } },
      { FEXGetPARAM_Ctz: { ret: "FEXGetPARAM_CtzResult" } },
      { FEXGetLast_ID: { ret: "FEXGetLast_IDResult" } },
      { FEXGetPARAM_PtoVenta: { ret: "FEXGetPARAM_PtoVentaResult" } },
      { FEXCheck_Permiso: { ret: "FEXCheck_PermisoResult" } },
      { FEXGetPARAM_Opcionales: { ret: "FEXGetPARAM_OpcionalesResult" } }
    ]
  },
  wscdc: {
    urls: {
      test: {
        url: "https://wswhomo.afip.gov.ar/WSCDC/service.asmx",
        wsdl: "https://wswhomo.afip.gov.ar/WSCDC/service.asmx?WSDL",
      },
      prod: {
        url: "https://servicios1.afip.gov.ar/WSCDC/service.asmx",
        wsdl: "https://servicios1.afip.gov.ar/WSCDC/service.asmx?WSDL",
      },
    },
    envdescr: ["Service", "ServiceSoap12"],
    authname: "Auth",
    authkeys: {
      Token: "",
      Sign: "",
      Cuit: "",
    },
    metodos: [
      { ComprobanteConstatar: { ret: "ComprobanteConstatarResult" } },
      { ComprobantesModalidadConsultar: { ret: "ComprobantesModalidadConsultarResult" } },
      { ComprobantesTipoConsultar: { ret: "ComprobantesTipoConsultarResult" } },
      { DocumentosTipoConsultar: { ret: "DocumentosTipoConsultarResult" } },
      { OpcionalesTipoConsultar: { ret: "OpcionalesTipoConsultarResult" } },
      { ComprobanteDummy: { ret: "ComprobanteDummyResult" } },
    ],
  },
  ws_sr_padron_a10: {
    urls: {
      test: {
        url: "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA10",
        wsdl: "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA10?WSDL",
      },
      prod: {
        url: "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA10",
        wsdl: "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA10?WSDL",
      },
    },
    envdescr: ["PersonaServiceA10", "PersonaServiceA10Port"],
    authname: "",
    authkeys: {
      token: "",
      sign: "",
      cuitRepresentada: "",
    },
    metodos: [
      { getPersona: { ret: "personaReturn" } },
    ],
  },
  ws_sr_constancia_inscripcion: {
    urls: {
      test: {
        url: "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA5",
        wsdl: "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA5?WSDL"
      },
      prod: {
        url: "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA5",
        wsdl: "https://aws.afip.gov.ar/sr-padron/webservices/personaServiceA5?WSDL"
      }
    },
    envdescr: ["PersonaServiceA5", "PersonaServiceA5Port"],
    authname: "",
    authkeys: {
      token: "",
      sign: "",
      cuitRepresentada: ""
    },
    metodos: [
      { getPersona: { ret: "personaReturn" } },
      { getPersonaList: { ret: "personaListReturn" } },
      { dummy: { ret: "return" } }
    ]
  },
  wsmtxca: {
    urls: {
      test: {
        url: "https://fwshomo.afip.gov.ar/wsmtxca/services/MTXCAService",
        wsdl: "https://fwshomo.afip.gov.ar/wsmtxca/services/MTXCAService?wsdl"
      },
      prod: {
        url: "https://serviciosjava.afip.gob.ar/wsmtxca/services/MTXCAService",
        wsdl: "https://serviciosjava.afip.gob.ar/wsmtxca/services/MTXCAService?wsdl"
      }
    },
    envdescr: ["MTXCAService", "MTXCAServiceHttpSoap11Endpoint"],
    authname: "authRequest",
    authkeys: {
      token: "",
      sign: "",
      cuitRepresentada: ""
    },
    metodos: [
      { dummy: { ret: "" } },
      { autorizarComprobante: { ret: "" } },
      { solicitarCAEA: { ret: "" } },
      { informarComprobanteCAEA: { ret: "" } },
      { consultarUltimoComprobanteAutorizado: { ret: "" } },
      { consultarComprobante: { ret: "" } },
      { consultarTiposComprobante: { ret: "" } },
      { consultarTiposDocumento: { ret: "" } },
      { consultarAlicuotasIVA: { ret: "" } },
      { consultarCondicionesIVA: { ret: "" } },
      { consultarMonedas: { ret: "" } },
      { consultarCotizacionMoneda: { ret: "" } },
      { consultarUnidadesMedida: { ret: "" } },
      { consultarTiposTributo: { ret: "" } },
      { consultarPuntosVenta: { ret: "" } },
      { consultarPuntosVentaCAE: { ret: "" } },
      { consultarPuntosVentaCAEA: { ret: "" } },
      { informarCAEANoUtilizado: { ret: "" } },
      { informarCAEANoUtilizadoPtoVta: { ret: "" } },
      { consultarPtosVtaCAEANoInformados: { ret: "" } },
      { consultarCAEA: { ret: "" } },
      { consultarCAEAEntreFechas: { ret: "" } },
      { autorizarAjusteIVA: { ret: "" } },
      { informarAjusteIVACAEA: { ret: "" } },
      { consultarTiposDatosAdicionales: { ret: "" } }
    ]
  },
  wsfecred: {
    urls: {
      test: {
        url: "https://fwshomo.afip.gov.ar/wsfecred/FECredService",
        wsdl: "https://fwshomo.afip.gov.ar/wsfecred/FECredService?WSDL"
      },
      prod: {
        url: "https://serviciosjava.afip.gob.ar:443/wsfecred/FECredService",
        wsdl: "https://serviciosjava.afip.gob.ar:443/wsfecred/FECredService?WSDL"
      }
    },
    envdescr: ["FECredService", "FECredServiceSOAP"],
    authname: "authRequest",
    authkeys: {
      token: "",
      sign: "",
      cuitRepresentada: ""
    },
    metodos: [
      { dummy: { ret: "dummyReturn" } },
      { consultarComprobantes: { ret: "consultarCmpReturn" } },
      { rechazarNotaDC: { ret: "rechazarNotaDCReturn" } },
      { consultarCtasCtes: { ret: "consultarCtasCtesReturn" } },
      { consultarCtaCte: { ret: "consultarCtaCteReturn" } },
      { informarCancelacionTotalFECred: { ret: "operacionFECredReturn" } },
      { aceptarFECred: { ret: "operacionFECredReturn" } },
      { rechazarFECred: { ret: "operacionFECredReturn" } },
      { informarFacturaAgtDptoCltv: { ret: "operacionFECredReturn" } },
      { consultarFacturasAgtDptoCltv: { ret: "consultarFacturasAgtDptoCltvReturn" } },
      { consultarCuentasComitente: { ret: "consultarCuentasComitenteReturn" } },
      { consultarObligadoRecepcion: { ret: "consultarObligadoRecepcionReturn" } },
      { consultarTiposRetenciones: { ret: "consultarTiposRetencionesReturn" } },
      { consultarTiposMotivosRechazo: { ret: "codigoDescripcionReturn" } },
      { consultarTiposFormasCancelacion: { ret: "codigoDescripcionReturn" } },
      { obtenerRemitos: { ret: "obtenerRemitosReturn" } },
      { consultarHistorialEstadosComprobante: { ret: "consultarHistorialEstadosComprobanteReturn" } },
      { consultarHistorialEstadosCtaCte: { ret: "consultarHistorialEstadosCtaCteReturn" } },
      { consultarTiposAjustesOperacion: { ret: "codigoDescripcionReturn" } },
      { consultarMontoObligadoRecepcion: { ret: "consultarMontoObligadoRecepcionReturn" } }
    ],
  },
};
