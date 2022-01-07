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

import * as soap from "soap";
import * as fs from "fs";
import * as path from "path";
import { Router } from "express";
import { logger, config, getPath } from "../serverfunc";
import { WSAA, TA } from "./tipos";
import { serv } from "./metodos";
import { err_types } from "./errores";
import * as funcs from "./funciones";

const router_afip = Router();

const opciones_ws = { disableCache: true, timeout: 99999999 };

declare type LlamoWSAACallback = (err: any, client: WSAA) => void;

function llamoWSAA(cuit: string, service: string, llamoWSAA_cb: LlamoWSAACallback) {
  
  const ticket: string = path.join(getPath(config.afip_rest.base_dir), cuit, "TA" + service + ".xml");
  const dirname = path.dirname(ticket);

  let Auth = funcs.getTokens(cuit, ticket);
  let args = { in0: "" };

  function soapCbAuth(err: any, client: soap.Client) {

    if (err) {

      logger.log("error", err);
      llamoWSAA_cb(err, Auth);

    } else if (args['in0'] == "") {

      logger.log("error", "loginTicketRequest vacio");
      llamoWSAA_cb(err, Auth);

    } else {

      logger.log("info", "llamo a loginCms con args " + JSON.stringify(args));

      client.loginCms(args, function (err: any, result: any) {

        if (err) {

// EL ERROR DE LOGINCMS VIENE ANIDADO ASI QUE DESCIENDE A BODY
          let xerr = err;
          for (let xval of ['root', 'Envelope', 'Body'])
            if (xerr[xval])
              xerr = xerr[xval];

          logger.log("error", xerr);
          llamoWSAA_cb(xerr, Auth);

        } else {

          fs.writeFileSync(ticket, result.loginCmsReturn);
          Auth = funcs.getTokens(cuit, ticket);
          llamoWSAA_cb(null, Auth);
        }
      });
    }
  }

  if (Auth.Token == "" || Auth.es_viejo) {

    const ta:TA = funcs.genRequest(dirname, service);

    if (!ta.valid) {

      llamoWSAA_cb(ta.err, Auth);

    } else {

      logger.log("info", "Pido ticket de acceso para entorno " + config.afip_rest.entorno);
      args = { in0: ta.cms };
      soap.createClient(serv.wsaa.urls[config.afip_rest.entorno].wsdl, opciones_ws, soapCbAuth, serv.wsaa.urls[config.afip_rest.entorno].url);
    }

  } else {

    llamoWSAA_cb(null, Auth);
  }
}

router_afip.get("/*", (req: any, res: any) => {

  res.status(400).json(funcs.wsaError(err_types.ERR_POST, ""));

});

// WSAA
router_afip.post("/wsaa/:cuit/:service", (req: any, res: any) => {

  const { cuit, service } = req.params;

  llamoWSAA(cuit, service, (err: any, Auth: any) => {

    if (!err) {
      
      res.status(200).send(Auth);
    } else {

      logger.log("error", err);
      res.status(400).send(err);
    }
  });
});

router_afip.post("/call/:cuit/:service/:metodo", (req: any, res: any) => {

  const { cuit, service, metodo } = req.params;
  let found: any;

  if (service == undefined || serv[service] == undefined) {

    logger.log("error", "Servicio no encontrado: " + service);
    res.status(400).json(funcs.wsaError(err_types.ERR_SERVICIO, service));

 } else {

    found = serv[service].metodos.find(function (element: any) {
      return element[metodo] != undefined;
    });

    if (!found) {

      logger.log("error", "Metodo no encontrado: " + metodo);
      res.status(400).json(funcs.wsaError(err_types.ERR_METODO, metodo));
    }
  }

  function soapCbCall(err: any, client: any) {

    if (err) {

      logger.log("error", err);
      res.status(400).json(err);

    } else {

      client[metodo](req.body, function (err: any, result: any) {

        if (err) {

          logger.log("error", err);
          res.status(400).send(err);

        } else {

          if (found && found[metodo]["ret"] && result[found[metodo]["ret"]]) {

            logger.log("info", result[found[metodo]["ret"]]);
            res.status(200).send(result[found[metodo]["ret"]]);

          } else {

            logger.log("info", result);
            res.status(200).send(result);
          }
        }
      });
    }
  }

  llamoWSAA(cuit, service, (err: any, Auth: any) => {

    if (!err) {

      if (serv[service].authname in req.body ) {
        Object.keys(serv[service].authkeys).forEach((key) => (req.body[serv[service].authname][key] = Auth[key]));
      } else {
        Object.keys(serv[service].authkeys).forEach((key) => (req.body[key] = Auth[key]));
      }
      
      soap.createClient(serv[service].urls[config.afip_rest.entorno].wsdl, opciones_ws, soapCbCall, serv[service].urls[config.afip_rest.entorno].url);
    
    } else {

      logger.log("error", err);
      res.status(400).send(err);
    }
  });
});

router_afip.post("/descr/:service/:metodo?", (req: any, res: any) => {

  const { service, metodo } = req.params;

  if (service == undefined || serv[service] == undefined) {

    res.status(400).json(funcs.wsaError(err_types.ERR_SERVICIO, ""));

  } else {

    if (metodo) {
      let found = serv[service].metodos.find(function (element: any) {
        return element[metodo] != undefined;
      });

      if (!found) {
        res.status(400).json(funcs.wsaError(err_types.ERR_METODO, metodo));
      }
    }
  }

  function soapCb(err: any, client: any) {

    if (err) {

      logger.log("error", err);
      res.status(400).json(err);

    } else {

      if (metodo) {
        res.status(200).send(client.describe()[serv[service].envdescr[0]][serv[service].envdescr[1]][metodo]);
      } else {
        res.status(200).send(client.describe());
      }
    }
  }

  soap.createClient(serv[service].urls[config.afip_rest.entorno].wsdl, opciones_ws, soapCb, serv[service].urls[config.afip_rest.entorno].url);
});


router_afip.post("/altacli/:cuit", (req: any, res: any) => {

  const { cuit } = req.params;

  // CREA LA CARPETA DEL CLIENTE SI NO EXISTE 
  const home: string = getPath(path.posix.normalize(config.afip_rest.base_dir + "/" + cuit));
  
  try {

    const json = JSON.stringify(req.body);
    const user = JSON.parse(json);

    // LAS CLAVES DEBEN VENIR EN BASE64 
    let key = Buffer.from(user.KEY, "base64");
    let crt = Buffer.from(user.CRT, "base64");

    fs.writeFileSync(path.posix.normalize(home + "/" + config.afip_rest.key), key);
    fs.writeFileSync(path.posix.normalize(home + "/" + config.afip_rest.crt), crt);

    res.status(200).json(funcs.wsaError(err_types.OK, "Creado"));

  } catch (err) {

    res.status(400).json(funcs.wsaError(err_types.ERR_BACKEND, ""));

  }
});

export { router_afip };