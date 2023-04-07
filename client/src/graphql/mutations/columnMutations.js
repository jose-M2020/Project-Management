import { gql } from '@apollo/client';

export const CREATE_COLUMN = gql`
  mutation createColumn(
    $title: String!
    $boardId: ID!
    $order: Int!
  ) {
    createColumn(
      title: $title,
      boardId: $boardId,
      order: $order,
    ) {
      _id
      title
      order
    }
  }
`;

export const UPDATE_COLUMN = gql`
  mutation updateColumn(
    $_id: ID!
    $title: String!
    $boardId: ID!
    $order: Int!
  ) {
    updateColumn(
      _id: $_id
      title: $title,
      boardId: $boardId,
      order: $order,
    ) {
      _id
      title
      order
    }
  }
`;

export const DELETE_COLUMN = gql`
  mutation deleteColumn($id: ID!) {
    deleteColumn(_id: $id) {
      _id
      title
    }
  }
`;
