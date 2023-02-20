const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type LoginResponse {
    status: Boolean!
    user: User!
    message: String!
  }

  type SignupResponse {
    status: Boolean!
    user: User!
    message: String!
  }

  type Query {
    login(username: String!, password: String!): LoginResponse!
    user(id: ID!): User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): SignupResponse!
  }
`;

module.exports = typeDefs;
