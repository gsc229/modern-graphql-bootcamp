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
  createComment(parent, args, {db, pubsub}, info){
    const userExists = db.users.some(user => user.id === args.data.author)
    const postExists = db.posts.find(post => post.id === args.data.post)

    if(!userExists) throw new Error("Invalid user id")
    if(!postExists) throw new Error("Invalid post id")
    if(!postExists.published) throw new Error("Can't comment on posts that aren't published")

    const comment = {
      id: uuidV4(),
      ...args.data
    }

    db.comments.push(comment)
    pubsub.publish(`comment ${ args.data.post }`, { 
      comment: {
        mutation: 'CREATED',
        data: comment
      }
     })

    return comment
  },
  updateComment(parent, { id, data }, {db, pubsub}, info){
    const comment = db.comments.find(comment => comment.id === id)

    if(!comment) throw new Error("No comment found with that id")

    if(typeof data.text === "string") comment.text = data.text

    pubsub.publish(`comment ${ comment.post }`, {
      comment: {
        mutation: 'UPDATED',
        data: comment
      }
    })

    return comment
  },
  deleteComment(parent, args, { db, pubsub }, info){
    const commentIndex = db.comments.findIndex(comment => comment.id === args.id)

    if(commentIndex === -1) throw new Error("Couln't find a comment with that id")

    const deletedComment = db.comments.splice(commentIndex, 1)[0]

    pubsub.publish(`comment ${ deletedComment.post }`, {
      comment: {
        mutation: 'DELETED',
        data: deletedComment
      }
    })

    return deletedComment

  }
}

export default Mutation