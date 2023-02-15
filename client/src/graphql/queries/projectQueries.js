import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query getProjects {
    projects {
      _id
      name,
      description,
      status,
      tags,
      createdAt
    }
  }
`;

export const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(_id: $id) {
      _id
      name
      description
      repository
      url
      type
      status
      team{
        _id
        firstname
        lastname
      }
      client{
        _id
        firstname
        lastname
      }
      clientId
      tags
      tasks{
        _id
        title
      }
      createdAt
    }
  }
`;
