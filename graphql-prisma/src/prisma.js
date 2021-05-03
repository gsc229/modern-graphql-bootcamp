import { Prisma } from 'prisma-binding'

// Pirsma is a constructor function used to create a connection to prisma endpoints

const prisma = new Prisma({
  typeDefs: 'graphql-prisma/src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

/* prisma.query.users(null, '{ id name email posts { id title body }}')
.then(data => {
  console.log(JSON.stringify({ data }, null, 2))
}) */


/* prisma.query.comments(null, '{ id text author { id name } }')
.then( commentsData => {
  console.log(JSON.stringify({commentsData}, null, 2))
})
 */

/* prisma.mutation.createPost({
  data: {
    title: "This is a graphQL POST by Nancy",
    body: "My name is Nancy and this is my first POST",
    published: true,
    author: {
      connect: {
        id: "cko8wgxg3000h0942tyzbr4rq"
      }
    }
  }
}, "{ id title body published }")
.then(newPost => {
  console.log(JSON.stringify({newPost}, null, 2))
  return prisma.query.users(null, '{ id name email posts { id title body }}')
})
.then(data => {
  console.log(JSON.stringify({ data }, null, 2))
}) */

prisma.mutation.updatePost({
  data: {
    title: "This is a SECOND graphQL POST by Nancy",
    body: "This is acutally Nancy's second POST.",
    published: true
  },
  where: {
    id: "cko90vu0700db0942vnlms8jh"
  }
}, "{ id title body published }")
.then(updatedPost => {
  console.log(JSON.stringify({updatedPost}, null, 2))
  return prisma.query.posts(null, '{ id title body }')
})
.then(data => {
  console.log(JSON.stringify({ data }, null, 2))
})