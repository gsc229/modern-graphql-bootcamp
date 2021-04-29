import { Prisma } from 'prisma-binding'

// Pirsma is a constructor function used to create a connection to prisma endpoints

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

prisma.query.users(null, '{ id name email }')
.then(data => {
  console.log({ data })
})