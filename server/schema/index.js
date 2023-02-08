import { gql } from "graphql-tag";
import {
    typeDefs as Project, 
    resolvers as ProjectResolvers
} from './project.js'
import {
    typeDefs as Task, 
    resolvers as TaskResolvers
} from './task.js'
import {
    typeDefs as Client, 
    resolvers as ClientResolvers
} from './client.js'
import {
    typeDefs as Developer, 
    resolvers as DeveloperResolvers
} from './developer.js'
import {
    typeDefs as Event, 
    resolvers as EventResolvers
} from './event.js'

const rootTypeDefs = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

export const resolvers = [
  ProjectResolvers,
  TaskResolvers,
  ClientResolvers,
  DeveloperResolvers,
  EventResolvers
]

export const typeDefs = [
  rootTypeDefs,
  Project,
  Task,
  Client,
  Developer,
  Event
]