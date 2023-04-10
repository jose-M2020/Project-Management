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
      category: String
    ): Column
    updateColumn(
      _id: ID!,
      title: String,
      boardId: ID,
      order: Int,
    ): Column
    updateColumnPosition(
      sourceColumnPosition: Int!,
      destinationColumnPosition: Int!,
      sourceColumnId: ID!,
      destinationColumnId: ID!
    ): [Column]
    deleteColumn(_id: ID!): Column
  }

  type Column {
    _id: ID!
    title: String!
    board: Board!
    order: Int!
    category: String
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
      order,
      category
    }) => {
      const column = new KanbanColumn({
        title,
        boardId,
        order,
        category
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
    updateColumnPosition: async (_, args) => {
      const updatedSourceColumn = await KanbanColumn.findByIdAndUpdate(
        args.sourceColumnId,
        { $set: {order: args.sourceColumnPosition} },
        { new: true }
      );

      const updateddestinationColumn = await KanbanColumn.findByIdAndUpdate(
        args.destinationColumnId,
        { $set: {order: args.destinationColumnPosition} },
        { new: true }
      );

      if (!updatedSourceColumn) throw new Error("Column not found");
        return [updatedSourceColumn, updateddestinationColumn];
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