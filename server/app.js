import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from 'express';
import http from "http";
// const colors = require('colors');
import cors from 'cors';

// const { graphqlHTTP } = require('express-graphql');
// const schema = require('./schema/schema');

// const connectDB = require('./config/db');

// const port = process.env.PORT || 5000;
// const app = express();
// connectDB();

// app.use(cors());
// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema,
//     graphiql: process.env.NODE_ENV === 'development',
//   })
// );

// app.listen(port, console.log(`Server running on port ${port}`));


export async function startApolloServer(typeDefs, resolvers) {
  const port = process.env.PORT;
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  await new Promise((resolve) => httpServer.listen({ port }, resolve));
  console.log(`Server running on port ${port}`);
}
