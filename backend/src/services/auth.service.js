import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/apiError.js";

//register user=========================================================

export const registerUser = async ({ name, email, password }) => {
  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      throw new ApiError(409, "User Already exists!");
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImage: user.profileImage,
    };
    
    const token = generateToken(user._id.toString());
    
    return { userResponse, token };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

//login user=========================================================

export const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    console.log(password);
    if (!user) {
      throw new ApiError(401, "User Not Found!");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      throw new ApiError(401, "Invalid Credentials!");
    }

    const token = generateToken(user._id.toString());

    const userObj = user.toObject();
    delete userObj.password;

    return {
      user: userObj,
      token,
    };
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};
