import { gql } from "graphql-tag";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

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
      clientID: ID,
      tags: [String]
    ): Project
    updateProject(
      _id: ID!, 
      name: String!,
      description: String!,
      repository: String,
      url: String,
      type: String!,
      status: String!,
      team: [ID],
      clientID: ID,
      tags: [String]
    ): Project
    deleteProject(_id: ID!): Project
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
    tags: [String]
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
      clientID,
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
        clientID,
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
  },
  Project: {
    tasks: async (parent) => {
      return await Task.find({ projectId: parent._id });
    }
  },
}