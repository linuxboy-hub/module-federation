# MODULE FEDERATION

Seguir el video: https://youtu.be/PnzI3GGozLA?list=PL6PxPH2IZvJoIXOIvQUzrMhCfIz6YCiNN
Otro ejemplo: https://www.thirdrocktechkno.com/blog/how-to-build-micro-frontend-in-angular-with-module-federation/#:~:text=Module%20Federation%20is%20a%20way,other%20using%20a%20shared%20API

Pasos para el module federation:

## CREAR ENTORNO DE TRABAJO

1. Abrir 3 consolas, 1 para el proyecto, otra para el host y otra para el microfront end

2. Crear workspace desde la consola del proyecto

   ```
   //Me crea solo el esqueleto
   ng new workspace --create-application=false
   ```

   dentro de ese workspace vamos a instalar o crear nuestro host y nuestro microfront end

3. Nos movemos al workspace y creamos el host

   ```
   cd workspace
   ng g application host --style=scss --routing=true
   ```

   Esto crea una carpeta llamada proyectos y ahí estará el host que acabamos de crear

4. Creamos nuestro micro frontend

   ```
   cd workspace
   ng g application microfront --style=scss --routing=true
   ```

5. Limpiamos app.component.html de ambos proyectos y si queremos creamos algún componente y enrutamos

   ```
   ng g c home --project=host
   ng g c default --project=microfront
   ```

6. Corremos el host para verificar funcionamiento

   ```
   ng s host -o
   ```

7. Verificamos esto mismo para el microfrontend
   ```
   //Liberar antes el puerto que tiene usado el host
   ng s microfront -o
   ```

## INSTALACION DE MODULE FEDERATION

8. Instalar librería para Module Federation @angular-architects/module-federation
   indicando que se va a hacer en el proyecto host y el puerto por el que se correrá

   ```
   ng add @angular-architects/module-federation --project host --port 5000
   ```

   Al finalizar esto, se creará en el host, un archivo webpack.config.js

9. Instalar la misma librería para el microfrontend pero usar un puerto diferente
   ```
   ng add @angular-architects/module-federation --project microfront --port 4242
   ```
   Al finalizar esto, se creará en el microfront, un archivo webpack.config.js

## AJUSTAR WEBPACK PARA HOST Y PARA MICROFRONTEND

10. En el webpack.config.js de cada proyecto, descomentar la sección que le corresponde
    en caso de que sea host o microfront.

    Si es el host debo especificar el microfront que quiero consumir, el puerto y el nombre del
    archivo js que está expuesto, por ejemplo:

    ```
    remotes: {
       "microfrontend": "http://localhost:4242/mfRemoteEntry.js",
    },
    ```

    Si es en el microfrontend se debe especificar que es lo que se quiere exponer de ese proyecto,
    por ejemplo un módulo específico, algo como:

    ```
    name: "microfrontend",
    filename: "mfRemoteEntry.js", //Nombre de archivo que se expone, tiene todas las definiciones del modulo
    exposes: {
       './GuestModule': './projects/microfrontend/src/app/guest/guest.module.ts',
    },
    ```

11. Enrutar el microfrontend dentro del host con loadChildren

    ```
    {
      path: 'microfrontend',
      loadChildren: () => import('microfrontend/ModuleName').then(m => m.ModuleName)
    }
    ```

    El modulo se carga con el nombre que se puso cuando se configuro el webpack del microfrontend

12. El compilador de angular a veces no coge el modulo que se acabó de enrutar, por tanto, es necesario
    crear un archivo de declaraciones en el host, dentro de app, se puede llamar "declarations.d.ts" y va a contener lo siguiente:
    ```
    declare module "microfrontend/ModuleName";
    ```
