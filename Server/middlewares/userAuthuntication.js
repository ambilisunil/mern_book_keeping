const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

exports.userAuthunication =  (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({
        httpcode: 403,
        message: "FORBIDDEN",
      });
    } else {
      const token = req.headers.authorization
      console.log({token})

      if (token) {
        try {
          let user = verifyToken(token);        
          req.user = user;
          next();
        } catch (error) {
            console.log(error)
          if (error.message === "jwt expired") {
            return res.status(403).json({
              httpcode: 401,
              message: "TOKEN EXPIRED",
            });
          } else {
            return res.status(403).json({
              httpcode: 401,
              message: "INVALID TOKEN",
            });
          }
        }
      }
    }
  };