let permissions = {
  Owner: {
    User: ["getUsers", "getUser", "createUser", "updateUser", "deleteUser"],
  },

  Admin: {
    User: ["getUsers", "getUser", "createUser", "updateUser", "deleteUser"],
  },

  User: {
    User: ["createUser"],
  },
};

const securityMiddleware = (req, resp, next) => {
  if (req.isAuthenticated()) {
    if (
      permissions[req.user.permission_range][req.body.Class].includes(
        req.body.Method
      )
    ) {
      next();
    } else {
      resp.send("You dont have permission to use this method");
    }
  } else {
    resp.send("You are not loged in");
  }
};

module.exports = securityMiddleware;
