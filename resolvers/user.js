const UserModel = require("../models/User.js");

const userResolvers = {
  Mutation: {
    signup: async (_, args) => {
      try {
        const user = new UserModel(args);
        const existingUser = await UserModel.findOne({
          $or: [{ email: args.email }, { username: args.username }],
        });
        if (existingUser) {
          throw new Error("User already exists with that email or username");
        } else {
          const savedUser = await user.save();
          return {
            status: true,
            email: savedUser.email,
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
