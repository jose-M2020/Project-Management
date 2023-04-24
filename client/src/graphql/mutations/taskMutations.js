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
    $order: Float!,
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
      columnId
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
    $members: [ID]
    $projectId: ID
    $done: Boolean,
    $priority: String,
    $columnId: ID,
    $order: Float,
    $dueDate: String
  ) {
    updateTask(
      _id: $_id
      title: $title,
      description: $description,
      members: $members,
      projectId: $projectId,
      done: $done,
      priority: $priority,
      columnId: $columnId,
      order: $order,
      dueDate: $dueDate,
    ) {
      _id
      title
      description
      projectId
      done
      priority
      columnId
      order
      dueDate
      members {
        _id
        firstname
        lastname
        position
      }
    }
  }
`;

export const UPDATE_TASKPOSITION = gql`
  mutation updateTaskPosition(
    $_id: ID!,
    $newPosition: Float!,
    $columnId: ID!
    $done: Boolean!
  ) {
    updateTaskPosition(
      _id: $_id,
      newPosition: $newPosition,
      columnId: $columnId,
      done: $done
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
