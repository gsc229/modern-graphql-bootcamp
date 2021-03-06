// Demo User Data:
const users = [
  {
    id: '1',
    name: 'Greg',
    email: 'greg@mail.com',
    age: 37
  },
  {
    id: '2',
    name: 'Bob',
    email: 'bob@mail.com',
    age: 54
  },
  {
    id: '3',
    name: 'Jenny',
    email: 'jenny@mail.com',
    age: 31
  }
]

// Demo Posts Data:
const posts = [
  {
    id: '1',
    title: 'This is post one',
    body: 'Posting this for the first time.',
    published: true,
    author: '1'
  },
  {
    id: '2', 
    title: 'Post 2',
    body: 'I like pizza',
    published: true,
    author: '2'
  },
  {
    id: '3',
    title: 'Post 3',
    body: 'I like hot dogs',
    published: false,
    author: '3'
  }
]

const comments = [
  {
    id: '1',
    text: "This is a comment by Greg on Bob's post",
    author: '1',
    post: '2'
  }, 
  {
    id: '2',
    text: "This is a comment by Bob on Jenny's post",
    author: '2',
    post: '3'
  },
  {
    id: '3', 
    text: "This is a comment b Jenny on Greg's post.",
    author: '3',
    post: '1'
  }

]

const db = {
  users,
  posts,
  comments
}

export default db