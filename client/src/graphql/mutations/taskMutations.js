import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation createTask(
    $title: String!
    $description: String
    $projectId: ID
    $notify: Boolean
  ) {
    createTask(
      title: $title,
      description: $description,
      projectId: $projectId,
      notify: $notify,
    ) {
      _id
      title
      description
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(_id: $id) {
      _id
      title
    }
  }
`;
