const express = require('express');
const methodRouter = express.Router();
const services = {
    User: require("./services/users")
};

methodRouter.post("/", async(req, resp, next) => {

    let {Class, Method, Params} = req.body
    let classInstance = Reflect.construct(services[Class],[])

    let users = await Reflect.apply(classInstance[Method], undefined, [Params]);

    resp.send(users)
    
});



module.exports = methodRouter