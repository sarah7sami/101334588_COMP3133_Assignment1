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
  }

  type Mutation {
    addEmployee(
      first_name: String!,
      last_name: String!,
      email: String,
      gender: String,
      salary: Float!
    ): AddEmployeeResponse!
    updateEmployee(
      id: ID!,
      first_name: String,
      last_name: String,
      email: String,
      gender: String,
      salary: Float
    ): UpdateEmployeeResponse!
    deleteEmployee(id: ID!): DeleteEmployeeResponse!
  }
  
  type AddEmployeeResponse {
    status: Boolean!
    message: String!
  }
  
  type UpdateEmployeeResponse {
    status: Boolean!
    message: String!
  }
  
  type DeleteEmployeeResponse {
    status: Boolean!
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
    message: String!
  }
`;

module.exports = typeDefs;
