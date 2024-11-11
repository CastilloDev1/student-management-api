<p align="center">
<a href="https://www.prisma.io/docs/orm/overview/databases/mysql" target="blank"><img src="https://th.bing.com/th/id/OIP.EAGqsdOXs1FESAmi68wrAgHaI_?rs=1&pid=ImgDetMain" width="120" alt="Nest Logo" /></a>
<a href="https://nodejs.org/en" target="blank"><img src="https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png" width="120" alt="Nest Logo" /></a>
</p>

# **Student Management**

## **Descripción**

Una API RESTful desarrollada con Node.js, TypeScript y Express que facilita la administración de estudiantes, profesores, materias y clases en una institución educativa. Esta API permite registrar usuarios, gestionar inscripciones, y consultar detalles académicos, como horarios y compañeros de clase.

* **Gestión de Usuarios**: Registro y administración de estudiantes y profesores.
* **Administración de Clases**: Creación y asignación de clases a profesores y materias.
* **Inscripción de Estudiantes**: Registro de estudiantes en clases específicas con validación de duplicidad.
* **Resumen Financiero**: Cálculo automático del costo por créditos académicos.

## **Pre-requisitos**

Para clonar y ejecutar esta aplicación,
necesitará [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (que viene con npm)
y [MySQL](https://dev.mysql.com/downloads/) instalados en su computadora.


**NOTA: En el folder comprimido scripts-student-management.zip dejaré un script para poder montar un servicio de mysql para no tener la necesidad de descargar el motor (Necesitaremos de todas formas una ui para hacer la conexión al servidor.**

Desde su línea de comando:

```bash
# Clonar repositorio
$ git clone https://github.com/CastilloDev1/student-management-api.git

# Entrar al repositorio local
$ cd student-management-api

# Instalar dependencias. En caso de general error usar el comando "npm i --force" o "npm i --legacy-peer-deps"
$ npm i

# Correr aplicación en modo desarrollo
$ npm run dev
```


# Postman
Ejecición de servicio, con smoke-test y ejemplos dentro de las solicitudes esenciales de los requerimientos.

- ## Folders
  - **smoke-test**: Carpeta general para la ejecucción inmediata de toda la aplicación.
  - **ejemplos internos**: Complementa cada solicitud re creando posibles escenarios (success y failes).




# Manejador de Errores

Este microservicio opera con un middleware para manejar los errores de express y prisma

## **Arquitectura del proyecto**
Este proyecto fue implementado bajo una arquitectura de software a nivel de capas. Cuenta con un sistema de manejo de errores centralizado.

Se emplea **CLEAN CODE**, y principios **SOLID**, con varios patrones de software, donde se especializa en el Repository Pattern

- **Modules**:
  Modulo en cargado de dividir por componentes el api donde se incluye Controllers, UseCase y Repositories (Capa de persistencia de datos).

- **Routes**:
  Modulo en el cual se definen los paths o funcionalidades que expone el servicio

- **shared**:
  Módulo en el cual se implementa funcionalidades de la aplicación de forma interna (middlewares, enums, custom-errors, etc.)

- **student-management.collections.json**:
  Archivo postman para ejecución de pruebas en el API.

- **scripts-student-management.zip**:
  Carpeta comprimida donde estarán los scripts en caso de ser necesarios.

## **Autores**

Los diferentes autores y encargados de cada operación de la aplicación para inquietudes son:

| Operación | Autor                  | Correo                           |
|-----------|------------------------|----------------------------------|
| General   | Fabián Bocanegra       | fabianboc960@hotmail.com         |
