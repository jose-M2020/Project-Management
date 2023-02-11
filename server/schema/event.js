import { gql } from "graphql-tag";
import Event from "../models/Event.js";

export const typeDefs = gql`
  extend type Query {
    events: [Event]
    event(_id: ID!): Event
  }

  extend type Mutation {
    createEvent(
      title: String!,
      description: String!,
      date: String!,
      notify: String,
      projectId: ID
    ): Event
    updateEvent(
      _id: ID!,
      title: String!,
      description: String!,
      date: String!,
      notify: String,
      projectId: ID
    ): Event
    deleteEvent(_id: ID!): Event
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    date: String!
    notify: String
    project: Project
    createdAt: String
  }
`;


export const resolvers = {
  Query: {
    events: async () => {
      return await Event.find();
    },
    event: async (_, { _id }) => {
      return await Event.findById(_id);
    }
  },
  Mutation: {
    createEvent: async (_, {
      title,
      description,
      date,
      notify,
      projectId
    }) => {
      const event = new Event({
        title,
        description,
        date,
        notify,
        projectId
      });
      const savedEvent = event.save();
      return savedEvent;
    },
    updateEvent: async (_, args) => {
      const updatedEvent = await Event.findByIdAndUpdate(args._id, args, {
      new: true,
      });
      if (!updatedEvent) throw new Error("Event not found");
      return updatedEvent;
    },
    deleteEvent: async (_, { _id }) => {
      const deletedEvent = await Event.findByIdAndDelete(_id);
      if (!deletedEvent) throw new Error("Event not found");
      return deletedEvent;
    },
  }
}