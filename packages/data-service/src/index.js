const { GraphQLServer } = require('graphql-yoga');
const remove = require('lodash.remove');

let users = [{
  id: 'user-0',
  name: 'Juan',
  surname: 'Torres'
}];

let idCount = users.length;

const resolvers = {
  Query: {
    info: (_, {param}) => `Appointment ${param ? param : ''}`,
    feed: () => users,
    user: (_, {id}) => users.find(user => user.id === id)
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = {
        id: `user-${idCount++}`,
        name: args.name,
        surname: args.surname,
      };
      users.push(user);
      return user
    },
    updateUserInfo: (parent, arg) => {
      const userToUpdate = users.find(user => user.id === arg.id);
      return {
        ...userToUpdate,
        name: arg.name || userToUpdate.name,
        surname: arg.surname || userToUpdate.surname,
      };
    },
    deleteUser: (parent, arg) => {
      remove(users, {
        id: arg.id
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log(`Running on 4000`));
