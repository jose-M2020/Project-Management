import { gql } from "graphql-tag";
import Client from "../models/Client.js";

export const typeDefs = gql`
  extend type Query {
    clients: [Client]
    client(_id: ID!): Client
  }
  
  extend type Mutation {
    # TODO: add company fields
    createClient(
      firstname: String!,
      lastname: String!,
      email: String!,
      phone: String!,
      # company: CompanyInput
      name: String!,
      website: String,
      country: String!,
      state: String!,
      city: String!,
    ): Client
    updateClient(
      _id: ID!,
      firstname: String!,
      lastname: String!,
      email: String!,
      phone: String!,
      # company: CompanyInput
      name: String!,
      website: String,
      country: String!,
      state: String!,
      city: String!,
    ): Client
    deleteClient(ids: [ID]!): Client
  }

  type Client {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    phone: String!
    company: Company
    createdAt: String
  }

  type Company {
    name: String!
    website: String
    country: String!
    state: String!
    city: String!
  }

  input CompanyInput {
    name: String!
    website: String
    country: String!
    state: String!
    city: String!
  }
`;

export const resolvers = {
  Query: {
    clients: async () => {
	    return await Client.find();
    },
    client: async (_, { _id }) => {
      return await Client.findById(_id);
    }
  },
  
  Mutation: {
    createClient: async (_, {
      firstname,
      lastname,
      email,
      phone,
      name,
      website,
      country,
      state,
      city
    }) => {
      const client = new Client({
        firstname,
        lastname,
        email,
        phone,
        company: {
          name,
          website,
          country,
          state,
          city
        }
      });
      const savedClient = client.save();
      return savedClient;
    },
    updateClient: async (_, args) => {
      const updatedClient = await Client.findByIdAndUpdate(args._id, args, {
      new: true,
      });
      if (!updatedClient) throw new Error("Client not found");
        return updatedClient;
    },
    deleteClient: async (_, { ids }) => {
      const deletedClient = await Client.deleteMany({
        _id: { $in: ids }
      });

      if (!deletedClient) throw new Error("Client not found");
      return deletedClient;
    }
  },
}