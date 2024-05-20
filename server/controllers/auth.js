import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    //10 being the number of rounds used to generate the salt. Then, it hashes the password (req.body.password) using bcrypt.hashSync() with the generated salt.
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //{...req.body}: This part spreads all the properties of req.body into a new object. So, if req.body contains properties name, email, and password, the spread syntax will include all of them in the new object.
    //password: hash: This part adds a new property password to the new object and sets its value to the hash variable. The hash variable contains the hashed version of the password obtained through bcrypt.
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save(); //new user data have been saved
    res.status(200).send("User has been created!");
  } catch (err) {
    //Instead of handling the error directly within the catch block, the next(err) statement is used. This passes the err object to the next middleware function that is capable of handling errors.
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password); //here we compare the password given by user and the password saved in db
    if (!isCorrect) return next(createError(404, "Wrong Credentials!"));

    //cookie is sent to user
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc; // this is done to remove the password so that user wont get it in response

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    //Instead of handling the error directly within the catch block, the next(err) statement is used. This passes the err object to the next middleware function that is capable of handling errors.
    next(err);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // user having google account
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      //user dont have google account
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
