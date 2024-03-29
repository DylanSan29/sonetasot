Para correr el programa es necesario hacer lo siguiente

1. Crear la Base de Datos:
     ```sql
     CREATE DATABASE citas_app;
     ```

2. Crear las Tablas:
   - Una vez creada la base de datos, ejecutar los siguientes comandos SQL para crear las tablas `usuarios` y `citas`:
   
     ```sql
     CREATE TABLE usuarios (
         id SERIAL PRIMARY KEY,
         nombre VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         password VARCHAR(255) NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     
     CREATE TABLE citas (
         id SERIAL PRIMARY KEY,
         fecha DATE NOT NULL,
         curp VARCHAR(18) NOT NULL,
         nombre VARCHAR(255) NOT NULL,
         descripcion TEXT,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```
Una vez creada la base y las tablas correspondientes.
Se deben cambiar los valores correspondientes en el archivo backEnd/db/pool.js, con los valores necesarios 
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'citas_app',
    password: 'admin',
    port: 5432,
});
Levantando el servidor del backEnd: npm start, iniciará en el puerto 3000
frontEnd: ingresando a la carpeta sonesot, ng serve iniciará en el puerto 4200

Veremos la pantalla, que ingresando una curp, que ya ha sido registrada, mostrará los datos correspondientes.
Por otro lado, al registrar una curp que no ha sido guardada antes, se hará el registro en la base de datos y después mostrará igual los datos correspondientes.
Yo use la mia para pruebas: SAAD000229HJCNVYA1
Tiene validaciones en el front de que la estructura esté correcta.

para el lado del back, tenemos las siguientes opciones si es que se quieren probar en postman 
router.get('/', citasController.getAllCitas);
router.post('/', citasController.createCita);
router.get('/:id', citasController.getCitaById);
router.put('/:id', citasController.updateCita);
router.delete('/:id', citasController.deleteCita);

para probarlas solo poner el metodo correspondiente seguido del http://localhost:3000/citas/ y seguido del dato 
Ejemplos 
obtener todas las citas: 
metodo get
http://localhost:3000/citas
obetener cita por id: 
metodo get
http://localhost:3000/citas/1



