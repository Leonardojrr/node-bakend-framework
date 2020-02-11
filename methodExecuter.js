const express = require('express');
const methodRouter = express.Router();

methodRouter.post("/", async(req, resp, next) => {

    let {Class, Method, Params} = req.body
    let classInstance = Reflect.construct(require(`./services/${Class}`),[])

    let users = await Reflect.apply(classInstance[Method], undefined, Params);

    resp.send(users)
    
});



module.exports = methodRouter