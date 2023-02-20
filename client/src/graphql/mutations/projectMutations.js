import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $description: String!
    $repository: String,
    $url: String,
    $type: String!,
    $status: String,
    $team: [ID],
    $clientId: ID,
    $tags: [String]
  ) {
    createProject(
      name: $name,
      description: $description,
      repository: $repository,
      url: $url,
      type: $type,
      status: $status,
      team: $team,
      clientId: $clientId,
      tags: $tags
    ) {
      _id
      name
      description
      status
    }
  }
`;

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(_id: $id) {
      _id
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $_id: ID!
    $name: String!
    $description: String!
    $repository: String,
    $url: String,
    $type: String!,
    $team: [ID],
    $clientId: ID,
    $tags: [String]
  ) {
    updateProject(
      _id: $_id
      name: $name
      description: $description
      repository: $repository
      url: $url
      type: $type
      team: $team
      clientId: $clientId
      tags: $tags
    ) {
      _id
      name
      description
      status
      client {
        _id
        firstname
        lastname
        email
        phone
      }
    }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };