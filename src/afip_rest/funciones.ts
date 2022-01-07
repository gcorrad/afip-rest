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

import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";
import moment from "moment";
import { parseString } from "xml2js";
import { WSAA, TA } from "./tipos";
import { err_types, err_def } from "./errores";
import { config } from "../serverfunc";

// DEVUELVE EL TOKEN DE AUTORIZACION
// SI NO EXISTE LO DEVUELVE VACIO
function getTokens(cuit: string, ticket: string): WSAA {

  let Auth: WSAA = { Token: "", Sign: "", Cuit: "", token: "", sign: "", cuitRepresentada: "", es_viejo: true };

  function parseStringCb(err: Error, result: any) {

    const expirationTime = new Date(result.loginTicketResponse.header[0].expirationTime[0]);
    const fechaActual = new Date();
    const viejo = (expirationTime.valueOf() - fechaActual.valueOf()) < 120 * 60 * 1000;

    Auth = {
      Token: result.loginTicketResponse.credentials[0].token[0],
      Sign: result.loginTicketResponse.credentials[0].sign[0],
      Cuit: cuit,
      token: result.loginTicketResponse.credentials[0].token[0],
      sign: result.loginTicketResponse.credentials[0].sign[0],
      cuitRepresentada: cuit,
      es_viejo: viejo,
    };
  }

  if (fs.existsSync(ticket))
    parseString(fs.readFileSync(ticket, "utf-8").toString(), parseStringCb);

  return Auth;
}

// GENERA EL REQUEST PARA EL TOKEN DE AUTORIZACION
function genRequest(dirname: string, service: string): TA {

  let TA = { cms: "", err: "", valid: false };
  let ahora = moment();

  const TRAxml =
    '<?xml version="1.0" encoding="UTF-8"?><loginTicketRequest version="1.0"><header><uniqueId>' +
    Math.floor(ahora.valueOf() / 1000).toString() +
    "</uniqueId><generationTime>" +
    ahora.format() +
    "</generationTime><expirationTime>" +
    ahora.add(12, "hours").format() +
    "</expirationTime></header><service>" +
    service +
    "</service></loginTicketRequest>";

  const crt = path.join(dirname, config.afip_rest.crt);
  const key = path.join(dirname, config.afip_rest.key);

  if (!fs.existsSync(crt)) { 

    TA.err = "Archivo de certificado no encontrado " + crt;
    TA.valid = false;

  } else if (!fs.existsSync(key)) {

    TA.err = "Archivo de clave privada no encontrado " + key;
    TA.valid = false;

  } else {

    try {
      const TRAb64 = child_process.execSync(
        "openssl smime -sign -signer " + crt + " -inkey " + key + " -text -binary -outform der -nodetach | openssl base64 -A",
        { input: TRAxml }
      );

      TA.cms = TRAb64.toString();
      TA.valid = true;

    } catch (err) {

      TA.err = "Al firmar loginTicketRequest. Falta openssl?";
      TA.valid = false;

    }
  }

  return TA;
}

function wsaError(err_type: err_types, descr2: string) {
  let retval: any = {};

  retval["Estado"] = err_type;
  retval["Descr1"] = err_def.get(err_type);
  retval["Descr2"] = descr2;

  return retval;
}

export { getTokens, genRequest, wsaError };
