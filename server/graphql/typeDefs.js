import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    projects: [Project]
    project(_id: ID!): Project
    tasks: [Task]
    task(_id: ID!): Task
    clients: [Client]
    client(_id: ID!): Client
    developers: [Developer]
    developer(_id: ID!): Developer
    events: [Event]
    event(_id: ID!): Event
  }

  input CompanyInput {
    name: String!
    website: String
    country: String!
    state: String!
    city: String!
  }

  type Mutation {
    createProject(
      name: String!,
      description: String!,
      repository: String,
      url: String,
      type: String!,
      status: String!,
      team: [ID],
      clientID: ID,
      technologies: [String]
    ): Project
    updateProject(
      _id: ID!, 
      name: String!,
      description: String!,
      repository: String,
      url: String,
      type: String!,
      status: String!,
      team: [ID],
      clientID: ID,
      technologies: [String]
    ): Project
    deleteProject(_id: ID!): Project

    createTask(
      title: String!,
      description: String,
      projectId: ID!,
      status: String!,
      date: String!
    ): Task
    updateTask(
      _id: ID!, 
      title: String!,
      description: String,
      projectId: ID!,
      status: String!,
      date: String!
    ): Task
    deleteTask(_id: ID!): Task
    # TODO: add company fields
    createClient(
      firstname: String!,
      lastname: String!,
      email: String!,
      phone: Int!,
      company: CompanyInput
    ): Client
    updateClient(
      _id: ID!,
      firstname: String!,
      lastname: String!,
      email: String!,
      phone: Int!,
      company: CompanyInput
    ): Client
    deleteClient(_id: ID!): Client

    createDeveloper(
      firstname: String!,
      lastname: String!,
      email: String!,
      phone: Int!,
      position: String!
    ): Developer
    updateDeveloper(
      _id: ID!,
      firstname: String!,
      lastname: String!,
      email: String!,
      phone: Int!,
      position: String!
    ): Developer
    deleteDeveloper(_id: ID!): Developer

    createEvent(
      title: String!,
      description: String!,
      date: String!,
      notify: String,
      projectId: ID
    ): Event
    updateEvent(
      _id: ID!,
      title: String!,
      description: String!,
      date: String!,
      notify: String,
      projectId: ID
    ): Event
    deleteEvent(_id: ID!): Event
  }

  type Client {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    phone: Int!
    company: Company
    createdAt: String
  }

  type Company {
    name: String!
    website: String
    country: String!
    state: String!
    city: String!
  }

  type Developer {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    phone: Int!
    position: String!
    createdAt: String
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    date: String!
    notify: String
    project: Project
    createdAt: String
  }

  type Project {
    _id: ID!
    name: String!
    description: String!
    repository: String
    url: String
    type: String!
    status: String!
    team: [Developer]
    client: Client
    technologies: [String]
    tasks: [Task]
    createdAt: String
  }

  type Task {
    _id: ID!
    title: String!
    description: String!
    project: Project!
    status: String!
    date: String!
    createdAt: String
  }
`;