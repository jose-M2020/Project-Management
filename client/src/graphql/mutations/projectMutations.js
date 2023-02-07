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
    $clientID: ID,
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
      clientID: $clientID,
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
    deleteProject(id: $id) {
      id
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: ProjectStatusUpdate!
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };