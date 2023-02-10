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

export const GET_DEVSNAME = gql`
  query getDevelopers {
    developers {
      _id
      firstname
      lastname
    }
  }
`;

export const GET_DEV = gql`
  query getDeveloper($id: ID!) {
    developers(id: $id) {
      id
      name
      description
      status
    }
  }
`;
