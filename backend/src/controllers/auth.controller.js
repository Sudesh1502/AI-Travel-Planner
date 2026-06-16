import { loginUser, registerUser } from "../services/auth.service.js";

//register user=========================================================

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const { userResponse , token } = await registerUser({
      name,
      email,
      password,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(201)
      .json({ success: true, message: "User Registered!", userResponse });
  } catch (error) {
    next(error)
  }
};

//login user=========================================================

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser({
      email,
      password,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "User LoggedIn!", user });
  } catch (error) {
    next(error)
  }
};


export const logout = (
  req,
  res
) => {

  res.clearCookie("token");

  res.json({
    success: true,
    message:
      "Logged out successfully",
  });
};

//get-user===================================================================

export const getUser = async(req, res, next) => {
  try {
    const user = req.user;

    return res.status(200).json({success:true, message:"User Fetched.", data:user});
  } catch (error) {
    next(error);
  }
}