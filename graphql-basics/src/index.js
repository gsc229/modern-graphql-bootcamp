import { GraphQLServer } from 'graphql-yoga'
import { users, posts, comments } from './data'

// The Five Scalar Types: String, Boolean, Int, Float, ID 
// Non-Scalar Types: Objects and Arrays

// Type Defs (schema):
const typeDefs = `
  type Query {
    add(a: Float!, b: Float!): String
    addArray(numbers: [Float!]!): Float!
    greeting(name: String, position: String): String
    grades: [Int!]!
    users: [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

// Resolvers:
const resolvers = {
  Query: {
    add(parent, args, ctx, info) {
      console.log({parent, args, ctx, info})
      return `${args.a} + ${args.b} = ${args.a + args.b}`
    },
    addArray(parent, args, ctx, info){
      return args.numbers.reduce((accum, curr) => {return accum + curr}, 0)
    },
    grades(parent, args, ctx, info){
      return [99, 80, 93]
    },
    greeting(parent, args, ctx, info){
      if(args.name) return `Hello! My name is ${args.name} and I am a ${args.position}`
      return 'Hi there. Wish I knew your name!'
    },
    users(parent, args, ctx, info){
      return users
    },
    posts(parent, args, ctx, info){
      console.log({args})
      if(args.query){
        return posts.filter(post => post.title.includes(args.query) || post.body.includes(args.query))
      }
      return posts
    },
    comments(parent, args, ctx, info){
      return comments.filter(comment => comment.text.includes(args.query))
    },
    me() {
      return {
        id: '123098',
        name: 'Mike',
        email: 'mike@example.com',
        age: 28
      }
    },
    post() {
      return {
        id: '092',
        title: 'GraphQL 101',
        body: 'This is a good resource',
        published: false
      }
    }
  },
  Post: {
    author(parent, args, ctx, info){
      return users.find(user => user.id === parent.author)
    },
    comments(parent, args, ctx, info){
      return comments.find(comment => comment.post === parent.id)
    }
  },
  User: {
    posts(parent, args, ctx, info){
      return posts.filter(post => post.author === parent.id)
    },
    comments(parent, args, ctx, info){
      return comments.filter(comment => comment.author === parent.id)
    }
  },
  Comment: {
    author(parent, args, ctx, info){
      console.log({parent, args})
      return users.find(user => user.id === parent.author)
    },
    post(parent, args, ctx, info){
      return posts.find(post => post.id === parent.post)
    }
  }
}

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
})

server.start(()=> {
  console.log('The server is up!')
})




