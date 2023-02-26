import { gql } from "graphql-tag";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Event from "../models/Event.js";
import Developer from "../models/Developer.js";
import Client from "../models/Client.js";

export const typeDefs = gql`
  extend type Query {
    projects: [Project]
    project(_id: ID!): Project
  }

  extend type Mutation {
    createProject(
      name: String!,
      description: String!,
      repository: String,
      url: String,
      type: String!,
      status: String,
      team: [ID],
      clientId: ID,
      tags: [String]
    ): Project
    updateProject(
      _id: ID!, 
      name: String!,
      description: String!,
      repository: String,
      url: String,
      type: String!,
      team: [ID],
      clientId: ID,
      tags: [String]
    ): Project
    deleteProject(_id: ID!): Project
    changeProjectStatus(
      _id: ID!, 
      status: String!
    ): Project
  }

  type Project {
    _id: ID!
    name: String!
    description: String!
    repository: String
    url: String
    type: String!
    status: String
    team: [Developer]
    client: Client
    clientId: ID
    tags: [String]!
    tasks: [Task]
    createdAt: String
  }
`;

export const resolvers = {
  Query: {
    projects: async () => {
      return await Project.find();
    },
    project: async (_, { _id }) => {
      return await Project.findById(_id);
    },
  },
  Mutation: {
    createProject: async (_, {
      name,
      description,
      repository,
      url,
      type,
      status,
      team,
      clientId,
      tags
    }) => {
      const project = new Project({
        name,
        description,
        repository,
        url,
        type,
        status,
        team,
        clientId,
        tags
      });
      const savedProject = await project.save();
      return savedProject;
    },
    updateProject: async (_, args) => {
      const updatedProject = await Project.findByIdAndUpdate(
        args._id,
        args,
        { new: true }
      );
      if (!updatedProject) throw new Error("Project not found");
      return updatedProject;
    },
    deleteProject: async (_, { _id }) => {
      const deletedProject = await Project.findByIdAndDelete(_id);
      if (!deletedProject) throw new Error("Project not found");
      
      await Task.deleteMany({projectId: _id})
      await Event.deleteMany({projectId: _id})
      
      return deletedProject;
    },
    changeProjectStatus: async (_, {_id, status}) => {
      const updatedProject = await Project.findByIdAndUpdate(
        _id,
        { $set: { status } },
        { new: true }
      );
      if (!updatedProject) throw new Error("Project not found");
      return updatedProject;
    },
  },
  Project: {
    tasks: async (parent) => {
      return await Task.find({ projectId: parent._id });
    },
    team: async (parent) => {
      return await Developer.find({ _id: parent.team });
    },
    client: async (parent) => {
      return await Client.findOne({ _id: parent?.clientId });
    }
  },
}