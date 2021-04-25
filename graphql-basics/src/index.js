import { GraphQLServer } from 'graphql-yoga'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'


const server = new GraphQLServer({
  typeDefs: 'graphql-basics/src/schema.graphql',
  resolvers: resolvers
})

server.start(()=> {
  console.log('The server is up!')
})