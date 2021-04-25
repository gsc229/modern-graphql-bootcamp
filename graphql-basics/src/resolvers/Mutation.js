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
  createPost(parent, args, {db}, info){

    const userExists = db.users.some(user => user.id === args.data.author)
    
    if(!userExists) throw new Error("Invalid user id")
    
    const post = {
      id: uuidV4(),
      ...args.data
    }

    db.posts.push(post)

    return post
  },
  deletePost(parent, args, {db}, info){
    const postIndex = db.posts.findIndex(post => post.id === args.id)

    if(postIndex === -1) throw new Error("Couldn't find a post with that id")

    const deletedPost = db.posts.splice(postIndex, 1)[0]

    db.comments = db.comments.filter(comment => comment.post !== deletedPost.id)
    return deletedPost
  },
  createComment(parent, args, {db}, info){
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
    return comment
  },
  deleteComment(parent, args, {db}, info){
    const commentIndex = comments.findIndex(comment => comment.id === args.id)

    if(commentIndex === -1) throw new Error("Couln't find a comment with that id")

    const deletedComment = comments.splice(commentIndex, 1)[0]

    return deletedComment

  }
}

export default Mutation