import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
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

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(_id: $id) {
      _id
    }
  }
`;

export const UPDATE_PROJECT = gql`
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

export const CHANGE_STATUS = gql`
  mutation changeProjectStatus(
    $_id: ID!
    $status: String!
  ) {
    changeProjectStatus(
      _id: $_id
      status: $status
    ) {
      _id
      name
      status
    }
  }
`;
