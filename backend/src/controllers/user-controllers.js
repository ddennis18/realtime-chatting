import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createUser,
  generateAccessToken,
  generateRefreshToken,
  getUserById,
  getUserByUsername,
  searchUsers,
} from "../services/user-services.js";

export async function createUserController(req, res, next) {
  try {
    const { fullname, username, password } = req.body || {};

    if (!username || !password || !fullname) {
      return res.status(400).send({ message: "Invalid Data" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createUser({
      fullname,
      username,
      password: hashedPassword,
    });

    if (result.error) return res.status(400).send({ message: result.message });

    const newUser = result.data;
    newUser.password = undefined;

    const refreshToken = await generateRefreshToken({ userId: newUser._id });

    const accessToken = await generateAccessToken({ userId: newUser._id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).send({
      message: "User Created Successfuly",
      user: newUser,
      accessToken,
    });
  } catch (error) {
    //server error
    next(error);
  }
}

export async function loginUserController(req, res, next) {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).send({ message: "Invalid Data" });
    }

    const result = await getUserByUsername(username, { withPassword: true });

    if (result.error) return res.status(400).send({ message: result.message });

    const user = result.data;

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    const refreshToken = await generateRefreshToken({ userId: user._id });

    const accessToken = await generateAccessToken({ userId: user._id });
    console.log(accessToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.password = undefined;
    res.status(201).send({
      message: "User Retrieved Successfuly",
      user,
      accessToken,
    });
  } catch (error) {
    //server error
    next(error);
  }
}

export async function refreshTokenController(req, res, next) {
  //this function sends a new token when the access token expires
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      return res.status(401).send({ ok: false, messsage: "unauthorised" });
    }

    //verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const result = await getUserById(decoded.userId);

    if (result.error) {
      return res.status(400).send({ ok: false, messsage: result.message });
    }

    const user = result.data;

    const accessToken = await generateAccessToken({ userId: user.id });

    return res.status(200).send({
      ok: true,
      accessToken,
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutUserController(req, res, next) {
  try {
    //delete the refreshToken on the backend
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).send({ messsage: "logged out successfully" });
  } catch (error) {
    next(error);
  }
}

export async function getUserController(req, res, next) {
  try {
    const userId = req.userId;

    const result = await getUserById(userId);

    if (result.error) return res.status(400).send({ message: result.message });

    const user = result.data;

    res.status(200).send({ message: "User Retrievd Successfully", user });
  } catch (error) {
    next(error);
  }
}

export async function searchUsersController(req, res, next) {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).send({ message: "Query parameter required" });
    }

    const result = await searchUsers(q);

    if (result.error) {
      return res.status(400).send({ message: result.message });
    }

    res.status(200).send({
      message: "Users retrieved successfully",
      users: result.data,
    });
  } catch (error) {
    next(error);
  }
}
