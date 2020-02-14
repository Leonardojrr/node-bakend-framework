# Node Back-End Framework

  

## Table of contents


- General info

- Technologies

- Installation

- Main functionality

- Team Members

  

## General info

Framework of backend to create aplications in node.js

  

## Technologies

Project is created with:

- Node.js

- Express

- MongoDB

  
## Installation

To run this project execute "npm install" to install the dependencies.

  

	$ npm install


# Before run your project

This project use mongoDB as DBMS. You have to config the mongoDB Client URI and which database are you going to use.

Originally the Client is config to run in your local environment of mongodDB ***"mongodb://localhost:27017"*** and use the database **"test"**.


  

# Main functionality
  

Inside of the methodExecuter.js file is the main function of this framework which is a post function of an express router.

  

## methodRouter.post

  

	methodRouter.post("/", async(req, resp, next) => {

		let {Class, Method, Params} = req.body

		let classInstance = Reflect.construct(require(`./services/${Class}`),[])

		let data = await Reflect.apply(classInstance[Method], undefined, Params);

		resp.send(data)

	});

**Description**

*This function uses the Reflect JavaScript object to dynamically call business object allowing us to use only one endpoint therefore reducing the server's overhead.*

**Parameters**

*Class* represents the business object.

*Method* is the method inside of the business object to call.

*Params* are the parameters that the method requires.

# Business Classes and there Methods


## User
  
This class is responsible for managing the collection of users in the database.

**Methods:**

- *getUsers( **query** )*: 
 
 this method returns all the documents in the users collection. The param **query** is used to bring back all the documents what match with  a condition specified inside it.

    //Example 
	{
		Class: User,
		Method: getUsers,
		Params: { age: { $gte: 18 } }
	}
	// it should return all the users who are 18 or older

If you don't specified the **query** param, the request it's going to return all the documents in the users collection.
 
For more information for how to construct a **query** visit:
[mongoDB: Querys and Projection Operators](https://docs.mongodb.com/manual/reference/method/db.collection.find/)

---

 - *getUser( **user_id** )*: 
 
 The method **getUser** is similar to **getUsers** , but it just returns a single document from the collection users.
 
The param **user_id** is the value of the field what identify the document what you want to get.

    //Example
    
	//let's say we have in our users collection the following documents:

	{
		_id: 1,
		name: "Paolo",
		age: 20
	},
	{
		_id: 2,
		name: "Fernando",
		age: 20
	},
	{
		_id: 3,
		name: "Leonardo",
		age: 21
	}
	--------------------------------------------------------------------------
	
	// If we make the following request:
	
	{
		Class: User,
		Method: getUser,
		Params: 2
	}
	// It should return: {id: 2 , name: "Fernando", age: 20}
	
---

 - *createUser( **user_data** )*:

this method create a document into the users collection with the data specified in the **user_data** param.

	//Example
	// If we make the following request:
	{
		Class: User,
		Method: createUser,
		Params: {
			_id: 12231,
			name: "Elon musk",
			age: 48
		}
	}
	//In the database we should see the document specified in the param
	
---

 - *updateUser( **user_id, user_data** )*:
 
 this method takes a specific document which you can replace or update the fields of it.

The param **user_id** is the identifier value of the document which yo want to update, and the param **user_data** is the object which contains the new fields or the new values for the document what was select.

 - *deleteUser( **user_id** )*:
 
 this methods erase the document specified on it. the param **user_id** is the identifier value of the document you want to erase




## Team Members


- Paolo Lodato

- Leonardo Rodriguez

- Fernando Urrutia