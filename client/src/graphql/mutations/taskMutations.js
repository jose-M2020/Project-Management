import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation createTask(
    $title: String!,
    $description: String,
    $projectId: ID!,
    $done: Boolean!,
    $priority: String,
    $boardId: ID!,
    $columnId: ID!,
    $order: Int!,
    $dueDate: String
  ) {
    createTask(
      title: $title,
      description: $description,
      projectId: $projectId,
      done: $done,
      priority: $priority,
      boardId: $boardId,
      columnId: $columnId,
      order: $order,
      dueDate: $dueDate
    ) {
      _id
      title
      description
      project {
        _id
        name
      }
      column {
        _id
      }
      done
      priority
      order
      dueDate
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

export const UPDATE_TASKPOSITION = gql`
  mutation updateTaskPosition(
    $_id: ID!,
    $newPosition: Int!,
    $columnId: ID!
  ) {
    updateTaskPosition(
      _id: $_id,
      newPosition: $newPosition,
      columnId: $columnId,
    ) {
      title
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
