const Query = {

  users(parent, args, { db, prisma }, info){
    // the second parameter can take null, string or object --> you can throw the info object to the query.
    console.log("QUERY: ", prisma.query)
    return prisma.query.users(null, info)

    /* console.log({args, prisma})
    if(args.query){
      console.log(`There was a query: ${JSON.stringify(args)}`)
      return db.users.filter(user => {
        if(user.email.toLowerCase() === args.query.toLowerCase()) return user

        if(user.name.toLowerCase().includes(args.query.toLowerCase())) return user

        if(user.age === args.query) return user

      })
    }
    return db.users */
  },
  posts(parent, args, { db, prisma }, info){
    console.log("=============================== HERE ARE THE POSTS: =========================== \n", JSON.stringify(prisma, null, 2))
    //console.log(JSON.stringify({ prisma, info }, null, 2))
    return prisma.query.posts(null, info)
    /* if(args.query){
      return posts.filter(post => post.title.includes(args.query) || post.body.includes(args.query))
    }
    return db.posts */
  },
  comments(parent, args, { db , prisma}, info){
    return prisma.comments(null, info)
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