const { prisma } = require('../generated/prisma-client');

function info(_, { param }) {
  return `Appointment ${param || ''}`
}

function users(parent, args, context, info) {
  return context.prisma.users()
}

function user(root, args) {
  return prisma.user({ id: args.id });
}

module.exports = {
  users,
  user,
  info,
};
