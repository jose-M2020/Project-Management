import { gql } from "graphql-tag";
import Developer from "../models/Developer.js";

export const typeDefs = gql`
  extend type Query {
    developers: [Developer]
    developer(_id: ID!): Developer
  }

  extend type Mutation {
    createDeveloper(
      firstname: String!,
      lastname: String!,
      email: String!,
      phone: Int!,
      position: String!
    ): Developer
    updateDeveloper(
      _id: ID!,
      firstname: String!,
      lastname: String!,
      email: String!,
      phone: Int!,
      position: String!
    ): Developer
    deleteDeveloper(_id: ID!): Developer
  }

  type Developer {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    phone: Int!
    position: String!
    createdAt: String
  }
`;

export const resolvers = {
  Query: {
    developers: async () => {
      return await Developer.find();
    },
    developer: async (_, { _id }) => {
      return await Developer.findById(_id);
    }
  },
  Mutation: {
    createDeveloper: async (_, {
      firstname,
      lastname,
      email,
      phone,
      position
    }) => {
      const dev = new Developer({
        firstname,
          lastname,
          email,
          phone,
        position
      });
      const savedDev = dev.save();
      return savedDev;
    },
    updateDeveloper: async (_, args) => {
      const updatedDev = await Developer.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedDev) throw new Error("Developer not found");
      return updatedDev;
    },
    deleteDeveloper: async (_, { _id }) => {
      const deletedDev = await Developer.findByIdAndDelete(_id);
      if (!deletedDev) throw new Error("Developer not found");
      return deletedDev;
    },
  },
}