import { myFunction } from './graphql-basics/src/index'
import { subtract } from './graphql-basics/src/math'
import add from './graphql-basics/src/math'

console.log("My config")

const arrow = () => {
  console.log("This is an arrow function")
}

arrow()

myFunction()

subtract(1, 1)
add(5, 5)