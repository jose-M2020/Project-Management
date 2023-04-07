import { gql } from '@apollo/client';

export const GET_DEVS = gql`
  query getDevelopers {
    developers {
      _id
      firstname
      lastname
      email,
      phone
      position
    }
  }
`;

export const GET_DEVNAMES = gql`
  query getDeveloperNames {
    developers {
      _id
      firstname
      lastname
    }
  }
`;

export const GET_DEV = gql`
  query getDeveloper($id: ID!) {
    developer(_id: $id) {
      _id
      name
      description
      status
    }
  }
`;
