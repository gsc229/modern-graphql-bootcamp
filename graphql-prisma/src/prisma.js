import { Prisma } from 'prisma-binding'

// Pirsma is a constructor function used to create a connection to prisma endpoints

const prisma = new Prisma({
  typeDefs: 'graphql-prisma/src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

//1. Create a new post
//2. Fetch all of the info abou the user
const createPostForUser = async (authorId, data) => {

  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{ id }')

  

  const user = await prisma.query.users({
    where: {
      id: authorId
    }
  }, '{ id name email posts { id title published } }')

  return user

}

const updatePostForUser = async (postId, data) => {

  const updatedPost = await prisma.mutation.updatePost({
    where: {
      id: postId
    },
    data
  }, '{ id author { id } }')

  if(!updatedPost) return new Error("Something went wrong updating post.")

  const user = await prisma.query.users({
    where: {
      id: updatedPost.author.id
    }
  }, '{ id name email posts { id title body published } }')

  return user
}

updatePostForUser( "cko91wj2t00f209424tu72cfr" ,{
  title: "Nancy likes pizza",
  body: "In my last post I said hot dogs. I change my mind. It's pizza.",
  published: false
})
.then(updatedInfo => {
  console.log(JSON.stringify({updatedInfo}, null, 2))
})
.catch(error => {
  console.log({error})
})