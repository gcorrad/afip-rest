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

import * as fs from "fs";
import * as path from "path";
import * as ini from "ini";
import winston from "winston";

const config = LeoIni();

const transports = [];
const logfile = config.server.logfile;

if (logfile == "console" ) {

  transports.push(new winston.transports.Console());

} else {

  if (config.server.clearlog && fs.existsSync(logfile)) {
    fs.unlinkSync(logfile);
  }
  transports.push(new winston.transports.File({ filename: logfile, tailable: true }));
}

const logger = winston.createLogger({
  level: config.server.loglevel,
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: transports
});

function LeoIni() {

  const confname = "afip_rest.ini";
  let config:any = {};

  try {
    const file = fs.readFileSync(confname, "utf-8");
    config = ini.parse(file);
 
  } catch (err) {
    config = { server: {}, afip_rest: {} };
  }

  if (config.server == undefined) config.server = {};
  if (config.server.port == undefined) config.server.port = 3033;
  if (config.server.logfile == undefined) config.server.logfile = "afip_rest.log";
  if (config.server.clearlog == undefined) config.server.clearlog = false;
  if (config.server.loglevel == undefined) config.server.loglevel = "error";

  if (config.afip_rest == undefined) config.afip_rest = {};
  if (config.afip_rest.base_dir == undefined) config.afip_rest.base_dir = "./datos";
  if (config.afip_rest.entorno == undefined) config.afip_rest.entorno = "test";
  if (config.afip_rest.key == undefined) config.afip_rest.key = "PRIV.key";
  if (config.afip_rest.crt == undefined) config.afip_rest.crt = "CERT.crt";
  
  if (!fs.existsSync(confname)) 
    fs.writeFileSync(confname, ini.stringify(config));

    return config;
}

function getPath(dirname: string): string {
  
  if (!fs.existsSync(dirname))
    fs.mkdirSync(dirname, { recursive: true });

  return dirname;
}

export { config, logger, getPath };