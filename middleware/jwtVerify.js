import jwt from"jsonwebtoken";

  export const isLoggedIn = (req, res, next)=>{

  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(
      token,
      'SECRETKEY'
    );
    req.currentUser  = decoded;
    next();
  } catch (err) {
    return res.status(401).send({
      msg: 'Your session is not valid!'
    });
  }
}  