import { gql } from "graphql-tag";
import Event from "../models/Event.js";
import Project from "../models/Project.js";

export const typeDefs = gql`
  extend type Query {
    events: [Event]
    event(_id: ID!): Event
  }

  extend type Mutation {
    createEvent(
      title: String!,
      description: String,
      start: String!,
      end: String!,
      # date: String!,
      notify: Boolean,
      projectId: ID
    ): Event
    updateEvent(
      _id: ID!,
      title: String!,
      description: String!,
      start: String!,
      end: String!,
      # date: String!,
      notify: String,
      projectId: ID
    ): Event
    deleteEvent(_id: ID!): Event
  }

  type Event {
    _id: ID!
    title: String!
    description: String
    start: String!
    end: String!
    date: String
    notify: Boolean
    project: Project
    projectId: ID
    createdAt: String
  }
`;


export const resolvers = {
  Query: {
    events: async () => {
      const currentDate = new Date().toJSON().slice(0, 10); //Event.find({ start: { $gte: currentDate } })
      
      // TODO: find events from now on and return object with all events and events currently
      return await Event.find()
                        .sort({start: -1});
    },
    event: async (_, { _id }) => {
      return await Event.findById(_id);
    }
  },
  
  Mutation: {
    createEvent: async (_, {
      title,
      description,
      start,
      end,
      date,
      notify,
      projectId
    }) => {
      const event = new Event({
        title,
        description,
        start,
        end,
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
  },

  Event: {
    project: async (parent) => {
      return (parent?.projectId) && (await Project.findOne({ _id: parent?.projectId }));
    },
  }
}