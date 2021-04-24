import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuidV4 } from 'uuid'
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
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    createComment(text: String!, author: String!, post: ID!): Comment!
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
      console.log({args})
      if(args.query){
        console.log(`There was a query: ${JSON.stringify(args)}`)
        return users.filter(user => {
          if(user.email.toLowerCase() === args.query.toLowerCase()) return user

          if(user.name.toLowerCase().includes(args.query.toLowerCase())) return user

          if(user.age === args.query) return user

        })
      }
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
  Mutation: {
    createUser(parent, args, ctx, info){
      console.log({args})
      const emailTaken = users.some(user => user.email === args.email)

      if(emailTaken) throw new Error('Email taken')

      const newUser = {
        id: uuidV4(),
        name: args.name,
        email: args.email,
        age: args.age
      }

      users.push(newUser)
      return newUser

    }, 
    createPost(parent, args, ctx, info){

      const userExists = users.some(user => user.id === args.author)
      
      if(!userExists) throw new Error("Invalid user id")
      
      const post = {
        id: uuidV4(),
        ...args
      }

      posts.push(post)

      return post
    },
    createComment(parent, args, ctx, info){
      const userExists = users.some(user => user.id === args.author)
      const postExists = posts.find(post => post.id === args.post)

      if(!userExists) throw new Error("Invalid user id")
      if(!postExists) throw new Error("Invalid post id")
      if(!postExists.published) throw new Error("Can't comment on posts that aren't published")

      const comment = {
        id: uuidV4(),
        ...args
      }

      comments.push(comment)
      return comment
    }
  },
  Post: {
    author(parent, args, ctx, info){
      return users.find(user => user.id === parent.author)
    },
    comments(parent, args, ctx, info){
      return comments.filter(comment => comment.post === parent.id)
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




