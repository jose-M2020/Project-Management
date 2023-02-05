import { gql } from '@apollo/client';

export const GET_DEVS = gql`
  query getProjects {
    developers {
      _id
      firstname
      lastname
    }
  }
`;

export const GET_DEVSNAME = gql`
  query getProjects {
    developers {
      _id
      firstname
      lastname
    }
  }
`;

export const GET_DEV = gql`
  query getProject($id: ID!) {
    developers(id: $id) {
      id
      name
      description
      status
    }
  }
`;
