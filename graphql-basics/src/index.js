import { GraphQLServer } from 'graphql-yoga'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'



const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
})

server.start(()=> {
  console.log('The server is up!')
})




