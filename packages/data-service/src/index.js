const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {

  Query: {

    info: (_, { param }) => `Appointment ${param || ''}`,

    users: (root, args, context) => {
      return context.prisma.users()
    },

    user: async (root, args) => {
      return prisma.user({ id: args.id });

    }
  },
  Mutation: {

    createUser: (root, args, context) => {
      return context.prisma.createUser({
        name: args.name,
        surname: args.surname,
      })
    },

    updateUser: async (parent, args, context) => {
      return context.prisma.updateUser({
        where: { id: args.id },
        data: {
          email: args.email,
          name: args.name,
          surname: args.surname
        }
      });
    },

    deleteUser: async (root, args, context) => {
      return await context.prisma.deleteUser({ id: args.id });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
});

server.start(() => console.log('Running on 4000'));
