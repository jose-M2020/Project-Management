import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query getEvents($projectId: ID) {
    events(projectId: $projectId) {
      _id
      title
      description
      start
      end
      project{
        _id
        name
      }
      notify
    }
  }
`;
