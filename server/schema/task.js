import { gql } from "graphql-tag";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import KanbanColumn from "../models/KanbanColumn.js";

export const typeDefs = gql`
  extend type Query {
    tasks: [Task]
    task(_id: ID!): Task
  }

  extend type Mutation {
    createTask(
      title: String!,
      description: String,
      projectId: ID!,
      done: Boolean!,
      priority: String,
      columnId: ID!,
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
      sourceColumnId: ID!,
      destinationColumnId: ID!,
    ): Task
    deleteTask(_id: ID!): Task
  }

  type Task {
    _id: ID!
    title: String!
    description: String
    project: Project
    projectId: String
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
      done,
      priority,
      columnId, 
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
        done,
        priority: 'Low',
        columnId, 
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
        sourceColumnId,
        destinationColumnId
      } = args;
      // console.log(args)
      try {
        const tasks = await Task.find({columnId: destinationColumnId, order: { $gt: newPosition }})
        console.log(tasks)
        // if (sourceColumnId !== destinationColumnId) {
        //   for (const key in sourceList) {
        //     await Task.findByIdAndUpdate(
        //       sourceList[key]._id,
        //       {
        //         $set: {
        //           columnId: sourceColumnId,
        //           order: key
        //         }
        //       }
        //     )
        //   }
        // }

        // for (const key in destinationList) {
        //   await Task.findByIdAndUpdate(
        //     destinationList[key]._id,
        //     {
        //       $set: {
        //         columnId: destinationColumnId,
        //         order: key
        //       }
        //     }
        //   )
        // }
        // return('updated');
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