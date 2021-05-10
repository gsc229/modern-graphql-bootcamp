import { Prisma } from 'prisma-binding'

// Pirsma is a constructor function used to create a connection to prisma endpoints

const prisma = new Prisma({
  typeDefs: 'graphql-prisma/src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

export default prisma

// prisma.query prisma.mutation prisma.subscription prisma.exists


/* const createPostForUser = async (authorId, data) => {

  const userExists = await prisma.exists.User({
    id: authorId
  })

  if(!userExists) throw new Error("No user with that id")

  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{ id author { id name email posts { id title published } } }')

  return post.author
}

const updatePostForUser = async (postId, data) => {

  const postExists = await prisma.exists.Post({
    id: postId
  })
  
  if(!postExists) throw new Error("Something went wrong updating post.")

  const updatedPost = await prisma.mutation.updatePost({
    where: {
      id: postId
    },
    data
  }, '{ id author { id name email posts { id title body published } } }')

  return updatedPost.author
} */


/* createPostForUser("cko8wgxg3000h0942tyzbr4rq", {
    title: "Another one from Nancy",
    body: "This one will work after the user exists check.",
    published: true
  }
)
.then(data => {
  console.log(JSON.stringify({data}, null, 2))
})
.catch(error => {
  console.log(error.message)
  console.log(JSON.stringify({error: error.message}))
}) */

/* updatePostForUser("cko938u6p00he0942ha4w9kvs", {
  body: "Updating the last post from Nancy. "
})
.then(data => {
  console.log(JSON.stringify({ data }, null, 2))
})
.catch(error => {
  console.log({error: error.message})
}) */