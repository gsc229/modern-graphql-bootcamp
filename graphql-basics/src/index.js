import { GraphQLServer } from 'graphql-yoga'
import { resolvers } from './resolvers'
import db from './db'

// This configuration is for graphql-yoga
const server = new GraphQLServer({
  typeDefs: 'graphql-basics/src/schema.graphql',
  resolvers: resolvers,
  context: {
    db
  }
})

server.start(()=> {
  console.log('The server is up!')
})