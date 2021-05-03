import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import './prisma'

const resolvers = {
  User,
  Query,
  Mutation,
  Subscription,
  Post,
  Comment
}

const pubsub = new PubSub()

// This configuration is for graphql-yoga
const server = new GraphQLServer({
  typeDefs: 'graphql-prisma/src/schema.graphql',
  resolvers,
  context: {
    db,
    pubsub
  }
})

server.start(()=> {
  console.log('The server is up!')
})