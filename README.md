# Node Back-End Framework

## Tecnologias

Proyecto creado con:

- Node.js

- Express

- MongoDB

## Instalar el proyecto

primero que todo, se tienen que instalar todas las dependencias que el programa utiliza, para esto vaya a la carpeta donde se encuentra el programa y ejecute este comando:

    $ npm install

# Antes de iniciar el proyecto

Este proyecto usa MongoDB como DBMS. Antes que todo tiene que configurar mongoDb client URI y que base de datos va a querer utilizar.

Originalmente el este framework esta configurado para que mongo corra es en el entorno local de tu maquina: **_"mongodb://localhost:27017"_** (mongoDB utiliza el Puerto 27017) y utiliza la base de datos **"test"** (en caso de que no exista esta base de datos se tendra que crear).

# Iniciando el proyecto

Para correr el servidor se tienen que ejetar el siquiente comando:

    npm run server

despues de este comando el servidar estara a la escucha de la peticiones.

# Funcionalidad principal

dentro del archivo methodExecuter.js esta la funcion principal de este framework la cual es una peticion post de una ruta de express. Para acceder a este endpoint se debe utilizar la ruta http://localhost:5000/services.

## methodRouter.post

    methodRouter.post("/", async(req, resp, next) => {

    	let {Class, Method, Params} = req.body

    	let classInstance = Reflect.construct(require(`./services/${Class}`),[])

    	let data = await Reflect.apply(classInstance[Method], undefined, Params);

    	resp.send(data)

    });

**Descripcion**

_esta funcion utiliza el objeto javaScript Reflect para llamar dinamicamente los business objects._

**Parametros**

**_(Class)_** representa el business object que se quiere utilizar.

**_(Method)_** es el metodo que se quiere utilizar dentro del business object.

**_(Params)_** son los parametros que utiliza el metodo que se va a llamar.

# Otras rutas

## Login

Para tener una sesion dentro del servidor se utiliza el endpoint: http://localhost:5000/login.

A este endpoint se le tiene que pasar un cuerpo con los siguientes campos:

    {
    "email":"",
    "password":""
    }

tendra que colocar el email de su usuario y su contraseña.

## Register

Para registrar su usuario dentro de la base de datos se utiliza el endpoint:
http://localhost:5000/register.

A este endpoint se le tiene que pasar un cuerpo con los siguientes campos obligatorios:

    {
    "name":"",
    "lastname":"",
    "email":"",
    "password":"",
    "permission_range":"" <-- (Este campo solo puede tener 3 valores "Owner", "Admin" o "User")
    }

# Business Objects y sus metodos

## Usuario

Esta clase es responsable de administrar la colección de usuarios en la base de datos.

**Metodos:**

- _getUsers( **query** )_:

Este método devuelve todos los documentos de la colección de usuarios. El parámetro **query** se usa para recuperar todos los documentos que coinciden con una condición especificada dentro de este parametro.

    //Example
    {
    	Class: User,
    	Method: getUsers,
    	Params: { age: { $gte: 18 } }
    }
    // debería devolver a todos los usuarios mayores de 18 años

Si no especificó el parámetro **query**, la solicitud devolverá todos los documentos de la colección de usuarios.

Para obtener más información sobre cómo construir una consulta visite:
[mongoDB: Querys and Projection Operators](https://docs.mongodb.com/manual/reference/method/db.collection.find/)

---

- _getUser( **user_id** )_:

El método **getUser** es similar a **getUsers**, pero solo devuelve un único documento de la colección User.

El parámetro **user_id** es el valor del campo que identifica el documento que desea obtener.

    //Example

    //  Digamos que tenemos en nuestra colección de usuarios los siguientes documentos:

    {
    	email: paolo@gmail.com,
    	name: "Paolo",
    	age: 20
    },
    {
    	email: fernando@gmail.com,
    	name: "Fernando",
    	age: 20
    },
    {
    	_id: leonardo@gmail.com,
    	name: "Leonardo",
    	age: 21
    }
    --------------------------------------------------------------------------

    //  Si hacemos la siguiente solicitud:

    {
    	Class: User,
    	Method: getUser,
    	Params: fernando@gmail.com
    }
    // Deberia retornar: {email: fernando@gmail.com , name: "Fernando", age: 20}

---

- _createUser( **user_data** )_:

Este método crea un documento en la colección de usuarios con los datos especificados en el parámetro **user_data**.

    //Example
    // Si hacemos la siguiente peticion:
    {
    	Class: User,
    	Method: createUser,
    	Params: {
    		_id: 12231,
    		name: "Elon musk",
    		age: 48
    	}
    }
    // En la base de datos deberíamos ver el documento especificado en el parámetro

---

- _updateUser( **user_id, user_data** )_:

Este método toma un documento específico y puede reemplazar o actualizar los campos del mismo.

El parámetro **user_id** es el valor identificador del documento que desea actualizar, y el parámetro **user_data** es el objeto que contiene los nuevos campos o los nuevos valores para el documento que se seleccionó.

- _deleteUser( **user_id** )_:

Esto métodos borra el documento especificado en él. El parámetro **user_id** es el valor identificador del documento que desea borrar

# Objeto Security

Dentro del proyecto existe un archivo llamado **security.js**. Dentro de el se encuentra este bloque de codigo:

    let  permissions = {

    	Owner: {

    		User: ["getUsers", "getUser", "createUser", "updateUser", "deleteUser"]

    	},

    	Admin: {

    		User: ["getUsers", "getUser", "createUser", "updateUser", "deleteUser"]

    	},

    	User: {

    		User: ["createUser"]

    	},

    };

Dentro del objeto **permissions** se encuentran los niveles de permisos (Owner, Admin, User), los objetos de negocio que pueden utilizar y los metodos de los objetos de negocio que puden utilizar.

Ademas tambien posee una funcion que hace de middleware dentro del methodExecuter llamada **securityMiddleware**.

Este middleware se encarga de vericar si a persona que quiere utilizar el methodExecuter posee una sesion y si esta posee el nivel de permisos necesarios para poder ejecutar los metodos enviados dentro de la peticion.

## Miembros del equipo

- Paolo Lodato

- Leonardo Rodriguez

- Fernando Urrutia
