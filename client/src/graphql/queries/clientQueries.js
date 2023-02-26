import { gql } from '@apollo/client';

export const GET_CLIENTS = gql`
  query getClients {
    clients {
      _id
      firstname
      lastname
      email
      phone
    }
  }
`;

export const GET_CLIENTNAMES = gql`
  query getClientNames {
    clients {
      _id
      firstname
      lastname
    }
  }
`;
