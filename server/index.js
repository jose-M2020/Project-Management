import { startApolloServer } from "./app.js";
// import { typeDefs } from "./graphql/typeDefs.js";
// import { resolvers } from "./graphql/resolvers.js";
import connectDB from "./config/db.js";
import { resolvers, typeDefs } from "./schema/index.js";

connectDB();

startApolloServer(typeDefs, resolvers);