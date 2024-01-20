const { AuthenticationError } = require("apollo-server-express");
const { User, Comment } = require("../models");
const { signToken } = require("../../server/utils/auth");

// Map resolvers to query on typedefs
const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("comments");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("comments");
    },
    comments: async () => {
      return Comment.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  // Map mutations to mutations on typedefs
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addComment: async (parent, { text, breweryId, breweryName }, context) => {
      console.log("Received data:1", context);
      if (context.user) {
        console.log("Received data2:", text, breweryId, breweryName);
        const comment = await Comment.create({
          text,
          breweryId,
          breweryName,
          user: context.user.username,
        });

        //await User.findOneAndUpdate(
        // { _id: context.user._id },
        // { $addToSet: { comments: comment._id } }
        //);

        return { comment };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
