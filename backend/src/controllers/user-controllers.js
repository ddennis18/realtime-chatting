import { createUser } from "../services/user-services.js";

export async function createUserController(req, res, next) {
  try {
    const { fullname, username } = req.body || {};

    const result = await createUser({ fullname, username });

    if (result.error) return res.status(400).send({ message: result.message });

    const newUser = result.data;

    res
      .status(200)
      .send({ message: "User Created Successfuly", user: newUser });
  } catch (error) {
    //server error
    next(error);
  }
}
