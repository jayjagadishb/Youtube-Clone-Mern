import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    //here it checks the id given by user and the id stored in cookie
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body, // this will set the new updated data given by user
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your own account!"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    //here it checks the id given by user and the id stored in cookie
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your own account!"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id }, // here we are storing the user id of the users whom we have subscribed
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 }, // here we are counting the number of users we have subscribed
    });
    res.status(200).json("Subscription successful.");
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id }, // here we are storing the user id of the users whom we have subscribed
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 }, // here we are counting the number of users we have subscribed
    });
    res.status(200).json("Unsubscription successful.");
  } catch (err) {
    next(err);
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;

  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id }, //addToSet is used instead of push because it will prevent from duplicate entry or multiple same id entry
      $pull: { dislikes: id },
    });
    res.status(200).json("the video has been liked.");
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
  // const id = req.user.id;
  // const videoId = req.params.videoId;
  try {
    const id = req.user.id;
    const videoId = req.params.videoId;
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("the video has been Disliked.");
  } catch (err) {
    next(err);
  }
};
