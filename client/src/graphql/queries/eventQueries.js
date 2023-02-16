import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query getEvents {
    events {
      _id
      title
      description
      start
      end
      project
      notify
    }
  }
`;
