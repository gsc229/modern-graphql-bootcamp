const Query = {
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
}

export default Query