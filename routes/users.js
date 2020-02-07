let express = require("express");
let UsersService = require("../services/users");
let router = express.Router();

let userservice = new UsersService();

router.get("/", async (req, res, next) => {
  try {
    const users = await userservice.getUsers();

    res.status(200).json({
      data: users,
      msg: "Users list"
    });

  } catch (err) {
    res.send(err);
  }
});

router.get("/:id", async (req, res, next) => {
  let { id } = req.params;

  const user = await userservice.getUser(id);

  if (user.length !== 0)
    res.status(200).json({
      data: user,
      msg: "Specific User"
    });
  else {
    res.send({ status: 404, msg: "the user doesnt exist" });
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body: newUser } = req;

  try {
    const state = await userservice.updateUser(id, newUser);

    res.json({
      status: 200,
      msg: "User updated"
    });
  } catch (err) {}
});

router.post("/", async (req, res, next) => {
  const { body: user } = req;

  if (Object.keys(user).length !== 0) {
    try {
      const userid = await userservice.createUser(user);

      res.json({
        status: 201,
        userId: userid,
        msg: "User created"
      });

    } catch (err) {
      res.status(404).json({
        msg: "Unable to create user"
      });
    }
  } else {
    res.json({
      status: 404,
      msg: "Unable to create user"
    });
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const state = await userservice.deleteUser(id);

    res.json({
      status: 200,
      msg: "User deleted"
    });
  } catch (error) {
    res.json({
      status: "404",
      msg: "user doesnt exist"
    });
  }
});

module.exports = router;