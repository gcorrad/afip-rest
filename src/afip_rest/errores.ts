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

enum err_types {
  OK,
  ERR_SERVICIO,
  ERR_METODO,
  ERR_BACKEND,
  ERR_POST,
  ERR_PRIVKEY,
  ERR_CERTIFICATE,
  ERR_CALL,
}

const err_def = new Map<number, string>([
  [err_types.OK, "OK"],
  [err_types.ERR_SERVICIO, "Servicio desconocido"],
  [err_types.ERR_METODO, "Metodo desconocido"],
  [err_types.ERR_POST, "Los Web Services deben consumirse por POST"],
  [err_types.ERR_BACKEND, "Se produjo un error interno de la aplicacion"],
  [err_types.ERR_PRIVKEY, "Archivo de clave privada no encontrado"],
  [err_types.ERR_CERTIFICATE, "Archivo de certificado no encontrado"],
  [err_types.ERR_CALL, "Ocurrio un error en el llamado al metodo"],
]);

export { err_types, err_def };
