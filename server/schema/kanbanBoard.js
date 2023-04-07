import { gql } from "graphql-tag";
import KanbanBoard from "../models/KanbanBoard.js";
import KanbanColumn from "../models/KanbanColumn.js";
import Developer from "../models/Developer.js";
import Project from "../models/Project.js";

export const typeDefs = gql`
  extend type Query {
    boards: [Board]
    board(_id: ID!): Board
    boardByProject(projectId: ID!): Board
  }
  
  extend type Mutation {
    createBoard(
      title: String!,
      description: String,
      ownerId: ID!,
      projectId: ID!,
      members: [ID],
    ): Board
    updateBoard(
      _id: ID!,
      title: String!,
      description: String,
      ownerId: ID!,
      projectId: ID!,
      members: [ID],
    ): Board
    deleteBoard(_id: ID!): Board
  }

  type Board {
    _id: ID!
    title: String!
    description: String!
    owner: Developer!
    project: Project
    members: [Developer]
    columns: [Column]
    createdAt: String
  }
`;

export const resolvers = {
  Query: {
    boards: async () => {
	    return await KanbanBoard.find();
    },
    board: async (_, { _id }) => {
      return await KanbanBoard.findById(_id);
    },
    boardByProject: async (_, { projectId }) => {
      return await KanbanBoard.findOne({ projectId });
    }
  },
  Mutation: {
    createBoard: async (_, {
      title,
      description,
      ownerId,
      projectId,
      members
    }) => {
      const board = new KanbanBoard({
        title,
        description,
        ownerId,
        projectId,
        members
      });
      const savedBoard = board.save();
      return savedBoard;
    },
    updateBoard: async (_, args) => {
      const updatedBoard = await KanbanBoard.findByIdAndUpdate(
        args._id,
        { $set: args },
        { new: true }
      );
      if (!updatedBoard) throw new Error("Board not found");
        return updatedBoard;
    },
    deleteBoard: async (_, { _id }) => {
      const deletedBoard = await KanbanBoard.findByIdAndDelete(_id);
      if (!deletedBoard) throw new Error("Board not found");
      return deletedBoard;
    }
  },
  Board: {
    owner: async (parent) => {
      return await Developer.findOne({ _id: parent?.ownerId });
    },
    project: async (parent) => {
      return await Project.findOne({ _id: parent?.projectId });
    },
    members: async (parent) => {
      return await Developer.find({ _id: parent?.members });
    },
    columns: async (parent) => {
      return await KanbanColumn.find({ boardId: parent?._id });
    },
  }
}