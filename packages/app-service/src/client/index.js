import ApolloClient from 'apollo-boost'
import { createHttpLink } from 'apollo-link-http';

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'include'
});

export const client = new ApolloClient({
  uri: 'https://eu1.prisma.sh/vlad-98d657/data-service/dev',
  link,
});
