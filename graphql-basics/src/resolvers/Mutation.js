import { v4 as uuidV4 } from 'uuid'

const Mutation = {
  createUser(parent, args, {db}, info){
    const emailTaken = db.users.some(user => user.email === args.data.email)

    if(emailTaken) throw new Error('Email taken')

    const newUser = {
      id: uuidV4(),
      ...args.data
    }

    db.users.push(newUser)
    return newUser

  }, 
  deleteUser(parent, args, {db}, info){
    const userIndex = db.users.findIndex(user => user.id === args.id)
    if (userIndex === -1) throw new Error("User with that id does not exist.")

    const deletedUser = db.users.splice(userIndex, 1)[0]
    db.posts = db.posts.filter(post => post.author !== deletedUser.id)
    comments = comments.filter(comment => comment.author !== deletedUser.id)

    return deletedUser
  },
  updateUser(parent, {id, data}, {db}, info){
    const user = db.users.find(user => user.id === id)

    if(!user) throw new Error("User not found")

    if(typeof data.email === "string") {
      const emailTaken = db.users.some(user => user.email === data.email)
      if(emailTaken) throw new Error("That email is being used by another user")
      user.email = data.email
    }

    if(typeof data.name === "string") user.name = data.name

    if(typeof data.age !== undefined) user.age = data.age

    return user

  },
  createPost(parent, args, { db, pubsub }, info){

    const userExists = db.users.some(user => user.id === args.data.author)
    
    if(!userExists) throw new Error("Invalid user id")
    
    const post = {
      id: uuidV4(),
      ...args.data
    }

    db.posts.push(post)
    if(args.data.published) pubsub.publish('post', { 
      post: {
        mutation: 'CREATED',
        data: post
      } 
    })

    return post
  },
  updatePost(parent, {id, data}, {db, pubsub}, info){
    const post = db.posts.find(post => post.id === id)
    const originalPost = { ...post }

    if(!post) throw new Error("No post found with that id")

    if(typeof data.body === "string") post.body = data.body

    if(typeof data.title === "string") post.title = data.title

    if(typeof data.published === "boolean"){
      post.published = data.published

      if(originalPost.published && !post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: originalPost
          }
        })
      } else if(!originalPost.published && post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'CREATED',
            data: post
          }
        })
      } else if(post.published) {
        pubsub.publish('post', {
          post: {
            mutation: 'UPDATED',
            data: post
          }
        })
      }
    }

    return post

  },
  deletePost(parent, args, {db, pubsub}, info){
    const postIndex = db.posts.findIndex(post => post.id === args.id)

    if(postIndex === -1) throw new Error("Couldn't find a post with that id")

    const deletedPost = db.posts.splice(postIndex, 1)[0]

    db.comments = db.comments.filter(comment => comment.post !== deletedPost.id)

    if(deletedPost.published) pubsub.publish('post', { 
      post: {
        mutation: 'DELETED',
        data: deletedPost
      }
     })
    
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