const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    employees: [Employee]!
    employee(id: ID!): Employee
    searchEmployees(query: String!): [Employee]!
  }

  type Mutation {
    addEmployee(
      first_name: String!,
      last_name: String!,
      email: String,
      gender: String,
      salary: Float!
    ): Employee!
    updateEmployee(
      id: ID!,
      first_name: String,
      last_name: String,
      email: String,
      gender: String,
      salary: Float
    ): UpdateEmployeeResponse!
    deleteEmployee(id: ID!): Employee!
  }

  type UpdateEmployeeResponse {
    status: Boolean!
    message: String!
  }
`;

module.exports = typeDefs;
