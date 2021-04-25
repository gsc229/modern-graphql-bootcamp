import { GraphQLServer } from 'graphql-yoga'
import db from './db'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'


const resolvers = {
  User,
  Query,
  Mutation,
  Post,
  Comment
}

// This configuration is for graphql-yoga
const server = new GraphQLServer({
  typeDefs: 'graphql-basics/src/schema.graphql',
  resolvers,
  context: {
    db
  }
})

server.start(()=> {
  console.log('The server is up!')
})