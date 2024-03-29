const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    text: String
    breweryId: ID
    breweryName: String
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    comments: [Comment]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addComment(
      text: String!
      breweryId: ID!
      breweryName: String!
      userId: ID!
    ): Comment
  }
`;

module.exports = typeDefs;
