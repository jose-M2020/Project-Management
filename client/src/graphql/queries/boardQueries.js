import { gql } from '@apollo/client';

export const GET_BOARDS = gql`
  query getBoards {
    boards {
      _id
      title
      description
    }
  }
`;

export const GET_BOARDBYPROJECT = gql`
  query getBoardByProject($projectId: ID!) {
    boardByProject(projectId: $projectId) {
      _id
      title
      description
      # owner {
      #   _id
      #   firstname
      #   lastname
      # }
      project {
        _id
        name
      }
      members {
        _id
        firstname
        lastname
      }
      columns {
        _id
        title
        order
        tasks {
          _id
          title
          description
          priority
          members {
            _id
            firstname
            lastname
          }
          order
          dueDate
        }
      }
    }
  }
`;
