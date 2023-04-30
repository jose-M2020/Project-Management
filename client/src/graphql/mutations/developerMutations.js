import { gql } from '@apollo/client';

const CREATE_DEV = gql`
  mutation createDeveloper(
    $firstname: String!,
    $lastname: String!,
    $email: String!,
    $phone: String!
    $position: String!
  ) {
    createDeveloper(
      firstname: $firstname,
      lastname: $lastname,
      email: $email,
      phone: $phone,
      position: $position
    ) {
      _id
      firstname
      lastname
      email
      phone
      position
    }
  }
`;

const UPDATE_DEV = gql`
  mutation updateDeveloper(
    $_id: ID!
    $firstname: String,
    $lastname: String,
    $email: String,
    $phone: String,
    $position: String
  ) {
    updateDeveloper(
      _id: $_id
      firstname: $firstname,
      lastname: $lastname,
      email: $email,
      phone: $phone,
      position: $position
    ) {
      _id
      firstname
      lastname
      email
      phone
      position
    }
  }
`;

const DELETE_DEV = gql`
  mutation deleteDeveloper($ids: [ID]!) {
    deleteDeveloper(ids: $ids) {
      _id
      firstname
      lastname
    }
  }
`;

export { CREATE_DEV, UPDATE_DEV, DELETE_DEV };