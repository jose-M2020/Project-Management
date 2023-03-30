import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation createTask(
    $title: String!
    $description: String
    $projectId: ID
    $status: String!
    $priority: String
    $date: String
  ) {
    createTask(
      title: $title,
      description: $description,
      projectId: $projectId,
      status: $status,
      priority: $priority,
      date: $date,
    ) {
      _id
      title
      description
      project{
        _id
        name
      }
      status
      priority
      date
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask(
    $_id: ID!
    $title: String
    $description: String
    $projectId: ID
    $status: String
    $priority: String
    $date: String
  ) {
    updateTask(
      _id: $_id
      title: $title,
      description: $description,
      projectId: $projectId,
      status: $status,
      priority: $priority,
      date: $date,
    ) {
      _id
      title
      status
      priority
      project{
        _id
      }
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(_id: $id) {
      _id
      title
    }
  }
`;
