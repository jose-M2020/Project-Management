import { gql } from "graphql-tag";
import KanbanColumn from "../models/KanbanColumn.js";
import KanbanBoard from "../models/KanbanBoard.js";
import Task from "../models/Task.js";

export const typeDefs = gql`
  extend type Query {
    columns: [Column]
    column(_id: ID!): Column
  }
  
  extend type Mutation {
    createColumn(
      title: String!,
      boardId: ID!,
      order: Int!,
    ): Column
    updateColumn(
      _id: ID!,
      title: String!,
      boardId: ID!,
      order: Int!,
    ): Column
    deleteColumn(_id: ID!): Column
  }

  type Column {
    _id: ID!
    title: String!
    board: Board!
    order: Int!
    tasks: [Task]
    createdAt: String
  }
`;

export const resolvers = {
  Query: {
    columns: async () => {
	    return await KanbanColumn.find();
    },
    column: async (_, { _id }) => {
      return await KanbanColumn.findById(_id);
    }
  },
  Mutation: {
    createColumn: async (_, {
      title,
      boardId,
      order
    }) => {
      const column = new KanbanColumn({
        title,
        boardId,
        order
      });
      const savedColumn = column.save();
      return savedColumn;
    },
    updateColumn: async (_, args) => {
      const updatedColumn = await KanbanColumn.findByIdAndUpdate(
        args._id,
        { $set: args },
        { new: true }
      );
      if (!updatedColumn) throw new Error("Column not found");
        return updatedColumn;
    },
    deleteColumn: async (_, { _id }) => {
      const deletedBoard = await KanbanColumn.findByIdAndDelete(_id);
      if (!deletedBoard) throw new Error("Column not found");
      return deletedBoard;
    }
  },
  Column: {
    board: async (parent) => {
      return await KanbanBoard.findOne({ _id: parent?.boardId });
    },
    tasks: async (parent) => {
      return await Task.find({ columnId: parent?._id });
    },
  }
}