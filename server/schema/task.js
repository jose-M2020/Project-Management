import { gql } from "graphql-tag";
import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const typeDefs = gql`
  extend type Query {
    tasks: [Task]
    task(_id: ID!): Task
  }

  extend type Mutation {
    createTask(
      title: String!,
      description: String,
      projectId: ID,
      status: String!,
      priority: String,
      date: String
    ): Task
    updateTask(
      _id: ID!, 
      title: String,
      description: String,
      projectId: ID,
      status: String,
      date: String
    ): Task
    deleteTask(_id: ID!): Task
  }

  type Task {
    _id: ID!
    title: String!
    description: String
    project: Project
    projectId: String
    status: String!
    priority: String!
    date: String
    createdAt: String
  }
`;


export const resolvers = {
  Query: {
    tasks: async () => {
      return await Task.find();
    },
    task: async (_, { _id }) => {
      return await Task.findById(_id);
    },
  },
  Mutation: {
    createTask: async (_, {
      title,
      description,
      projectId,
      status,
      priority,
      date
    }) => {
	    const projectFound = await Project.findById(projectId);
      if (projectId && !projectFound) {
        throw new Error("Project not found");
      }

      const task = new Task({
        title,
        description,
        projectId,
        status,
        priority,
        date
      });
      const savedTask = task.save();
      return savedTask;
    },
    updateTask: async (_, args) => {
      const updatedTask = await Task.findByIdAndUpdate(
        args._id,
        { $set: args },
        { new: true, }
      );

      if (!updatedTask) throw new Error("Task not found");
        return updatedTask;
    },
    deleteTask: async (_, { _id }) => {
      const deletedTask = await Task.findByIdAndDelete(_id);
      if (!deletedTask) throw new Error("Task not found");
      return deletedTask;
    },   
  },
  Task: {
    project: async (parent) => {
      return await Project.findById(parent.projectId);
    }
  }
}