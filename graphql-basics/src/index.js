import { GraphQLServer } from 'graphql-yoga'

// The Five Scalar Types: String, Boolean, Int, Float, ID 
// Non-Scalar Types: Objects and Arrays

// Type Defs (schema):
const typeDefs = `
  type Query {
    add(a: Float!, b: Float!): String
    addArray(numbers: [Float!]!): Float!
    greeting(name: String, position: String): String
    grades: [Int!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
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
  }
}

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
})

server.start(()=> {
  console.log('The server is up!')
})




