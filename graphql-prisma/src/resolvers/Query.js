const Query = {

  users(parent, args, { db, prisma }, info){
    const opArgs = {}

    if(args.query){
      opArgs.where = {
        OR: [
          {name_contains: args.query},
          {email_contains: args.query}
        ]
      }
    }
    // the second parameter can take null, string or object --> you can throw the info object to the query.
    return prisma.query.users(opArgs, info)
  },

  posts(parent, args, { db, prisma }, info){

    const opArgs = {}

    if(args.query){
      opArgs.where = {
        OR: [
          { title_contains: args.query },
          { body_contains: args.query }
        ]
      }
    }

    return prisma.query.posts(opArgs, info)
  },

  comments(parent, args, { db , prisma}, info){

    const opArgs = {}

    if(args.query){
      opArgs.where = {
        text_contains: args.query
      }
    }


    return prisma.query.comments(opArgs, info)
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