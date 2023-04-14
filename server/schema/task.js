import { gql } from "graphql-tag";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import KanbanColumn from "../models/KanbanColumn.js";
import isTooClose from "../helpers/isTooClose.js";
import recalcItemsPos from "../helpers/recalcItemsPos.js";

export const typeDefs = gql`
  extend type Query {
    tasks: [Task]
    task(_id: ID!): Task
  }

  extend type Mutation {
    createTask(
      title: String!,
      description: String,
      boardId: ID!,
      projectId: ID!,
      columnId: ID!,
      done: Boolean!,
      priority: String,
      order: Int!,
      dueDate: String
    ): Task
    updateTask(
      _id: ID!, 
      title: String,
      description: String,
      projectId: ID,
      done: Boolean,
      priority: String,
      columnId: ID,
      order: Int,
      dueDate: String
    ): Task
    updateTaskPosition(
      _id: ID!,
      newPosition: Int!,
      columnId: ID!,
      boardId: ID,
      done: Boolean!
    ): Task
    deleteTask(_id: ID!): Task
  }

  type Task {
    _id: ID!
    title: String!
    description: String
    project: Project
    projectId: ID
    columnId: ID
    done: Boolean
    priority: String!
    column: Column
    members: [Developer]
    order: Int!
    dueDate: String
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
      boardId,
      columnId,
      done,
      priority,
      order,
      dueDate,
    }) => {
	    const projectFound = await Project.findById(projectId);
      if (projectId && !projectFound) {
        throw new Error("Project not found");
      }

      const task = new Task({
        title,
        description,
        projectId,
        boardId,
        columnId,
        done,
        priority: 'Low',
        order,
        dueDate,
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
    updateTaskPosition: async (_, args) => {
      const {
        _id,
        newPosition,
        columnId,
        done,
      } = args;

      try {
        const updatedTask = Task.findByIdAndUpdate(_id, {
          $set: {
            order: newPosition,
            columnId,
            done
          }
        })

        if (isTooClose(newPosition)) {
          const tasks = await recalcItemsPos({ columnId }, Task);
          return tasks;
        }

        return updatedTask;
      } catch (err) {
        throw new Error(err);
      }
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
    },
    column: async (parent) => {
      return await KanbanColumn.findById(parent.columnId);
    }
  }
}