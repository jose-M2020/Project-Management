import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query getTasks {
    tasks {
      _id
      title
      description
      project{
        _id
        name
      }
      priority
      column {
        _id
        title
      }
      members {
        _id
        firstname
        lastname
      }
      order
      dueDate
    }
  }
`;
