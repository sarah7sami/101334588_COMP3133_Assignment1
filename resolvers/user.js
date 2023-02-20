const UserModel = require("../models/User.js");

const userResolvers = {
  Query: {
    login: async (_, args) => {
      try {
        const user = await UserModel.findOne({ username: args.username });
        if (!user) {
          throw new Error("User does not exist");
        }
        const isMatch = await user.validatePassword(args.password);
        if (!isMatch) {
          throw new Error("Invalid password");
        }
        return {
          status: true,
          user,
          message: "User logged in successfully",
        };
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    signup: async (_, args) => {
      try {
        const existingUser = await UserModel.findOne({
          $or: [{ email: args.email }, { username: args.username }],
        });
        if (existingUser) {
          throw new Error("User already exists with that email or username");
        } else {
          const user = new UserModel(args);
          const savedUser = await user.save();
          return {
            status: true,
            user: savedUser,
            message: "User registered successfully",
          };
        }
      } catch (err) {
        throw err;
      }
    },
  },  
};

module.exports = userResolvers;
