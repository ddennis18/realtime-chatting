import jwt from "jsonwebtoken";

export async function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(403)
      .send({ ok: false, messsage: "unauthorised no authorisation" });
  }

  //extract token "Bearer Token"
  const token = authHeader.split(" ")[1];

  //verify it
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      console.log(err)
      return res
        .status(403)
        .send({ ok: false, messsage: "unauthorised expired token" });
    }

    //so the user id would be in the req
    req.userId = data.userId;
    next();
  });
}
