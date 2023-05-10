import { gql } from '@apollo/client';

export const CREATE_BOARD = gql`
  mutation createBoard(
    $title: String!
    $description: String
    $ownerId: ID!
    $projectId: String!
    $members: [ID]
  ) {
    createBoard(
      title: $title,
      description: $description,
      ownerId: $ownerId,
      projectId: $projectId,
      members: $members
    ) {
      _id
      title
      description
    }
  }
`;

export const UPDATE_BOARD = gql`
  mutation updateBoard(
    $_id: ID!
    $title: String
    $description: String
    $ownerId: ID
    $projectId: ID
    $members: [ID]
  ) {
    updateBoard(
      _id: $_id
      title: $title,
      description: $description,
      ownerId: $ownerId,
      projectId: $projectId,
      members: $members
    ) {
      _id
      title
      description
      project {
        _id
        name
      }
      members {
        _id
        firstname
        lastname
        email
      }
      columns {
        _id
        boardId
        title
        order
        category
      }
      tasks {
        _id
        title
        description
        priority
        columnId
        members {
          _id
          firstname
          lastname
          position
        }
        done
        order
        dueDate
      }
    }
  }
`;

export const DELETE_BOARD = gql`
  mutation deleteBoard($id: ID!) {
    deleteBoard(_id: $id) {
      _id
      title
    }
  }
`;
