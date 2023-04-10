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
    $id: ID!
    $title: String
    $boardId: ID
    $order: Int
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
    $sourceColumnPosition: Int!,
    $destinationColumnPosition: Int!,
    $sourceColumnId: ID!,
    $destinationColumnId: ID!
  ) {
    updateColumnPosition(
      sourceColumnPosition: $sourceColumnPosition,
      destinationColumnPosition: $destinationColumnPosition,
      sourceColumnId: $sourceColumnId,
      destinationColumnId: $destinationColumnId
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
