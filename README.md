# afip-rest

![GitHub](https://img.shields.io/github/license/gcorrad/afip-rest?style=plastic)

## Interfaz REST&#8660;SOAP para consumir WebServices de AFIP

afip-rest es un proyecto que comence para aprender Typescript. Puede ejecutarse sobre Linux y eventualmente como servicio de windows con ayuda de node-windows y Cygwin

## Instalacion y ejecucion

Para transpilar y ejecutar la aplicacion en modo productivo debe ejuecutar:

```text
  npm buid && npm start
```  

y para ejecutar en modo desarrollo debe ejecutar:

```text
  npm run dev
```  

Tambien puede construir un nodo Docker con la instrucion:

```text
docker build -t afip_rest .
```

Iniciarlo con el comando:

```text
docker run --name afip_rest -p 3033:3033 -d afip_rest
```  

## Para comenzar

Con la aplicacion iniciada primero es necesario dar de alta las credenciales de AFIP (clave privada y certificado obtenidos de AFIP), con un POST a la ruta:

```url
http://HOST:PORT/afip_rest/altacli/CUIT_CONTRIBUYENTE
```

En el body debe contener un json con las credenciales codificadas en base64 (por ej: `cat PRIV.key | openssl base64 -A`, devuelve el contenido de PRIV.key codificado en base64 en una sola linea)

```json
{
    "KEY": "CLAVE_PRIVADA_B64",
    "CRT": "CERTIFICADO_B64"
}
```

Si no hubo error devuelve:

```json
{
  "Resultado": "OK"
}
```

Y sube la clave privada y el certificado descodificados, dentro de la carpeta base (definida en el archivo afip_rest.ini), en una carpeta creada con el CUIT como nombre y bajo los nombres de clave definidos en el archivo afip_rest.ini

Una vez subidas las credenciales se pueden utilizar los metodos definidos en el archivo metodos.ts, la carpeta ejemplos en el raiz contiene archivos .rest con distintos ejemplos. A los metodos de los ejemplos se los llama facil con el plugin "REST Client" de VSCode.

## Ejemplo de consulta al metodo FEParamGetTiposTributos del webservice wsfe

```text
POST http://{{host}}/afip_rest/call/{{cuit}}/wsfe/FEParamGetTiposTributos HTTP/1.1
content-type: application/json
```

```json
{ "Auth":
  {
    "Token": "",
    "Sign": "",
    "Cuit": ""
  }
}
```

Retorna:

```json
{
  "ResultGet": {
    "TributoTipo": [
      {
        "Id": 1,
        "Desc": "Impuestos nacionales",
        "FchDesde": "20100917",
        "FchHasta": "NULL"
      },
      {
        "Id": 2,
        "Desc": "Impuestos provinciales",
        "FchDesde": "20100917",
        "FchHasta": "NULL"
      }
      .....
    ]
  },
  "level": "info",
  "timestamp": "2021-11-21T15:51:48.199Z"
}
```

## Ejemplo de archivo de configuracion afip_rest.ini

```ini
[server]
port=3033
logfile=console # si se especifica otro nombre crea un archivo de log con ese nombre
clearlog=false
loglevel=info

[afip_rest]
base_dir=./datos # carpeta donde se alojaran las credenciales del contribuyente
entorno=test
key=PRIV.key
crt=CERT.crt

```
