const { GraphQLServer } = require('graphql-yoga')

//1
const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Mutation {
  post(url: String!, description: String!): Link!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }]
 
  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: (root, args, context, info) => {
        return context.db.query.links({}, info)
      },
    },
    Mutation: {
      post: (root, args, context, info) => {
        return context.db.mutation.createLink({
          data: {
            url: args.url,
            description: args.description,
          },
        }, info)
      },
    },
  }

const server = new GraphQLServer ({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log('Server is up and running on http://localhost:4000'))