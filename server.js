// server.js
require('dotenv').config()

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Allow cross-origin requests
app.use(cors());

// Load typeDefs and resolvers using graphql-tools
const typesArray = loadFilesSync(path.join(__dirname, './schemas'));
const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'));
const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);

// Create an Apollo server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo server
async function startApolloServer() {
  await server.start();

  // Apply the Apollo server middleware to the Express app
  server.applyMiddleware({ app });

  // Create a HTTP server instance
  const httpServer = http.createServer(app);

  // Set the HTTP server to listen on the provided port
  httpServer.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
  });
}

startApolloServer();
