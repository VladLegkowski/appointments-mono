const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');


async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  }
}

function createUser(root, args, context) {
  // const userId = getUserId(context)
  return context.prisma.createUser({
    name: args.name,
    surname: args.surname,
  })
}

async function updateUser(parent, args, context) {
  return context.prisma.updateUser({
    where: { id: args.id },
    data: {
      email: args.email,
      name: args.name,
      surname: args.surname
    }
  });
}

async function deleteUser(root, args, context) {
  return context.prisma.deleteUser({ id: args.id });
}

module.exports = {
  signup,
  login,
  createUser,
  updateUser,
  deleteUser,
};
