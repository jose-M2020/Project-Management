import { gql } from "graphql-tag";
import KanbanColumn from "../models/KanbanColumn.js";
import KanbanBoard from "../models/KanbanBoard.js";
import Task from "../models/Task.js";
import recalcItemsPos from "../helpers/recalcItemsPos.js";
import isTooClose from "../helpers/isTooClose.js";

export const typeDefs = gql`
  extend type Query {
    columns: [Column]
    column(_id: ID!): Column
  }
  
  extend type Mutation {
    createColumn(
      title: String!,
      boardId: ID!,
      order: Float!,
      category: String
    ): Column
    updateColumn(
      _id: ID!,
      title: String,
      boardId: ID,
      order: Float,
    ): Column
    updateColumnPosition(
      _id: ID!,
      boardId: ID!,
      order: Float!,
    ): Column
    deleteColumn(_id: ID!): Column
  }

  type Column {
    _id: ID!
    title: String!
    boardId: ID!
    board: Board!
    order: Float!
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
      const { _id, boardId, order } = args

      try {
        const updatedColumn = KanbanColumn.findByIdAndUpdate(_id, {
          $set: {
            order
          }
        })

        if (!updatedColumn) throw new Error("Column not found");

        if (isTooClose(order)) {
          const columns = await recalcItemsPos({ boardId }, KanbanColumn);
          return columns;
        }

        return updatedColumn;
      } catch (err) {
        throw new Error(err);
      }
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