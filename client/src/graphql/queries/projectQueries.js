import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query getProjects {
    projects {
      _id
      name,
      description,
      status,
      tags,
      createdAt,
      type,
      members{
        firstname,
        lastname
      }
      logo
      budget
      duration
      # tasks{
      #   _id,
      #   status
      # }
    }
  }
`;

export const GET_PROJECTNAMES = gql`
  query getProjectNames {
    projects {
      _id,
      name
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
      members{
        _id
        firstname
        lastname
        position
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
      duration
      createdAt
    }
  }
`;

export const GET_PROJECTOVERVIEW = gql`
  query getProjectOverview($id: ID!) {
    project(_id: $id) {
      _id
      name
      description
      type
      status
      createdAt
    }
  }
`;

export const GET_COMPANYLOCATIONS = gql`
  query getCompanyLocations {
    projects {
      client{
        company{
          name
          website
          country
          state
          city
        }
      }
      createdAt
    }
  }
`;
