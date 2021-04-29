import { Prisma } from 'prisma-binding'

// Pirsma is a constructor function used to create a connection to prisma endpoints

const prisma = new Prisma({
  typeDefs: 'graphql-prisma/src/generated/prisma.graph.ql',
  endpoint: process.env.ENDPOINT
})