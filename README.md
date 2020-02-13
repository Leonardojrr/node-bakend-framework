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

## Installation
To run this project execute "npm install" to install the dependencies.

    $ npm install

# Main functionality

Inside of the methodExecuter.js file is the main function of this framework which is a post function of an express router.

## methodRouter.post

    methodRouter.post("/", async(req, resp, next) => {
	    let {Class, Method, Params} = req.body
	    let classInstance = Reflect.construct(require(`./services/${Class}`),[])
	    let data = await  Reflect.apply(classInstance[Method], undefined, Params);
	    resp.send(data)
    });
**Description**
*This function uses the Reflect JavaScript object to dynamically call business object allowing us to use only one endpoint therefore reducing the server's overhead.*
**Parameters**
*Class* represents the business object.
*Method* is the method inside of the business object to call.
*Params* are the parameters that the method requires.
**What it returns**
The function returns a response which is the data the method of the business object returns, which could be, for example, a dataset returned by calling a get function.
## Team Members

 - Paolo Lodato
 - Leonardo Rodriguez
 - Fernando Urrutia

