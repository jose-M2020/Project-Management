import { gql } from '@apollo/client';

export const CREATE_CLIENT = gql`
  mutation createClient(
    $firstname: String!,
    $lastname: String!,
    $email: String!,
    $phone: String!,
    $name: String!,
    $country: String!,
    $state: String!,
    $city: String!,
    $website: String,
  ) {
    createClient(
      firstname: $firstname,
      lastname: $lastname,
      email: $email,
      phone: $phone,
      name: $name,
      website: $website,
      country: $country,
      state: $state,
      city: $city,
    ) {
      _id
      firstname
      lastname
      email
      phone
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient(
    $_id: ID!
    $firstname: String!,
    $lastname: String!,
    $email: String!
    $phone: String!
  ) {
    updateClient(
      _id: $_id
      firstname: $firstname,
      lastname: $lastname,
      email: $email,
      phone: $phone,
    ) {
      _id
      firstname
      lastname
      email
      phone
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($ids: [ID]!) {
    deleteClient(ids: $ids) {
      id
    }
  }
`;
