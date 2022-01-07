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

import express from "express";
import { config, logger } from "./serverfunc";
import { router_afip } from "./afip_rest/router";

let app = express();
app.set("port", config.server.port);
app.set("json spaces", 2);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/afip_rest", router_afip);

app.listen(app.get("port"), () => {
  logger.log("info", "Corriendo afip_rest en puerto " + app.get("port"));
});
