const { ApolloServer, gql } = require('apollo-server');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

const resolvers = {
  Query,
  Mutation,
};

const typeDefs = gql`
    type Query {
        info(param: String!): String!
        users: [User!]!
        user(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, surname: String!, email: String!, password: String!): User!
        deleteUser(id: ID!): User
        updateUser(id: ID!, name: String, surname: String) : User
        signup(email: String!, password: String!, name: String!, surname: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
    }

    type AuthPayload {
        token: String
        user: User
    }

    type User {
        id: ID!
        name: String
        surname: String
    }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
