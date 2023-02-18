import { gql } from '@apollo/client';

export const CREATE_EVENT = gql`
  mutation createEvent(
    $title: String!
    $description: String
    $start: String!
    $end: String!
    $projectId: ID
    $notify: Boolean
  ) {
    createEvent(
      title: $title,
      description: $description,
      start: $start,
      end: $end,
      projectId: $projectId,
      notify: $notify,
    ) {
      _id
      title
      description
      start
      end
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
