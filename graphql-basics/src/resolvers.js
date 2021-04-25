import { v4 as uuidV4 } from 'uuid'


// Resolvers:
export const resolvers = {
  Query: {
    add(parent, args, {db}, info) {
      return `${args.a} + ${args.b} = ${args.a + args.b}`
    },
    addArray(parent, args, {db}, info){
      return args.numbers.reduce((accum, curr) => {return accum + curr}, 0)
    },
    grades(parent, args, {db}, info){
      return [99, 80, 93]
    },
    greeting(parent, args, {db}, info){
      if(args.name) return `Hello! My name is ${args.name} and I am a ${args.position}`
      return 'Hi there. Wish I knew your name!'
    },
    users(parent, args, {db}, info){
      console.log({args})
      if(args.query){
        console.log(`There was a query: ${JSON.stringify(args)}`)
        return db.users.filter(user => {
          if(user.email.toLowerCase() === args.query.toLowerCase()) return user

          if(user.name.toLowerCase().includes(args.query.toLowerCase())) return user

          if(user.age === args.query) return user

        })
      }
      return db.users
    },
    posts(parent, args, {db}, info){
      console.log({args})
      if(args.query){
        return posts.filter(post => post.title.includes(args.query) || post.body.includes(args.query))
      }
      return db.posts
    },
    comments(parent, args, {db}, info){
      return db.comments.filter(comment => comment.text.includes(args.query))
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

      comments = comments.filter(comment => comment.post !== deletedPost.id)
      console.log({comments, deletedPost, id: args.id})
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

      comments.push(comment)
      return comment
    },
    deleteComment(parent, args, {db}, info){
      const commentIndex = comments.findIndex(comment => comment.id === args.id)

      if(commentIndex === -1) throw new Error("Couln't find a comment with that id")

      const deletedComment = comments.splice(commentIndex, 1)[0]

      console.log({deletedComment})
      console.log({comments})
      return deletedComment

    }
  },
  Post: {
    author(parent, args, {db}, info){
      return db.users.find(user => user.id === parent.author)
    },
    comments(parent, args, {db}, info){
      return comments.filter(comment => comment.post === parent.id)
    }
  },
  User: {
    posts(parent, args, {db}, info){
      return db.posts.filter(post => post.author === parent.id)
    },
    comments(parent, args, {db}, info){
      return comments.filter(comment => comment.author === parent.id)
    }
  },
  Comment: {
    author(parent, args, {db}, info){ 
      return db.users.find(user => user.id === parent.author)
    },
    post(parent, args, {db}, info){
      return db.posts.find(post => post.id === parent.post)
    }
  }
}