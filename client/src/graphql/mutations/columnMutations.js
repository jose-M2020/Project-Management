import { gql } from '@apollo/client';

export const CREATE_COLUMN = gql`
  mutation createColumn(
    $title: String!
    $boardId: ID!
    $order: Float!
  ) {
    createColumn(
      title: $title,
      boardId: $boardId,
      order: $order,
    ) {
      _id
      title
      boardId
      order
      category
    }
  }
`;

export const UPDATE_COLUMN = gql`
  mutation updateColumn(
    $id: ID!
    $title: String
    $boardId: ID
    $order: Float
  ) {
    updateColumn(
      _id: $id
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

export const UPDATE_COLUMNPOSITION = gql`
  mutation updateColumnPosition(
    $_id: ID!,
    $boardId: ID!,
    $order: Float!,
  ) {
    updateColumnPosition(
      _id: $_id,
      boardId: $boardId,
      order: $order,
    ) {
      _id
      title
      order
      category
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
