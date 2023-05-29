# Proyecto : Tokenización de Tarjetas 

Las pasarelas de pagos guardan las tarjetas de crédito en una bóveda
encriptada (encriptación en reposo) para evitar que la información sensible se
pueda filtrar o que pueda ser interceptada en otro proceso del sistema

## Requerimientos:

-  NodeJS `(v.14.15.0)` o posterior.
-  Instalar las siguientes dependencias base:
    -   npm install -g typescript ts-node.
    -   npm install -g serverless

### Configurar el entorno
Agregando las credenciales de aws en un entorno local
-   serverless config credentials --provider aws --key youKey --secret youSecret

### Clonar el proyecto desde el repositorio 
    git clone https://github.com/dchuquipomar/Tokenizacion_Tarjetas.git

### Desplegar el proyecto en aws 
En la ruta local del proyecto, ejecutar el siguiente comando
-   serverless deploy


### Ejecutando las pruebas unitarias 
En la ruta local del proyecto, ejecutar el siguiente comando
-   npm run test