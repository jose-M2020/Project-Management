import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from 'express';
import http from "http";
import cors from 'cors';

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
