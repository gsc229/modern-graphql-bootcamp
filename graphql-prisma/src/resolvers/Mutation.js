import { v4 as uuidV4 } from 'uuid'

const Mutation = {
  async createUser(parent, args, { prisma }, info){

    const newUser = await prisma.mutation.createUser({ data: args.data })

    return newUser

  }, 
  async deleteUser(parent, args, { prisma }, info){

    const deletedUser = await prisma.mutation.deleteUser({ where: { id: args.id } }, info)

    return deletedUser
  },
  async updateUser(parent, args, { prisma }, info){

    const updatedUser = await prisma.mutation.updateUser({
      where: {
        id: args.id
      },
      data: args.data
    }, info)

    return updatedUser

  },
  async createPost(parent, args, { prisma }, info){

    const newPost = await prisma.mutation.createPost({ 
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: args.data.author
          }
        }
      }
    }, info)

    return newPost
  },
  async updatePost(parent, args, { prisma }, info){

    const updatedPost = await prisma.mutation.updatePost({
      where: {
        id: args.id
      },
      data: args.data
    }, info)

    return updatedPost
  },
  async deletePost(parent, args, { prisma }, info){

    const deletedPost = await prisma.mutation.deletePost({
      where: {
        id: args.id
      }
    }, info)

    return deletedPost
  },
  async createComment(parent, args, { prisma }, info){

    const newComment = await prisma.mutation.createComment({
      data: {
        text: args.data.text,
        author: {
          connect: {
            id: args.data.author
          }
        },
        post: {
          connect: {
            id: args.data.post
          }
        }
      }
    }, info)

    return newComment

  },
  async updateComment(parent, args, { prisma }, info){

    const updtedComment = await prisma.mutation.updateComment({
      where: {
        id: args.id
      },
      data: args.data
    }, info)

    return updtedComment

  },
  async deleteComment(parent, args, {  prisma  }, info){

    const deletedComment = await prisma.mutation.deleteComment({
      where: {
        id: args.id
      }
    }, info)

    return deletedComment
    
  }
}

export default Mutation