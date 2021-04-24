// The Five Scalar Types: String, Boolean, Int, Float, ID 
// Non-Scalar Types: Objects and Arrays

// Type Defs (schema):
export const typeDefs = `
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