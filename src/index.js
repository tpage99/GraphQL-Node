const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

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
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://us1.prisma.sh/taylor-page-9d8665/how-to-graphql-demo/dev',
            secret: 'mysecret123',
            debug: true,
        }),
    }),
})

server.start(() => console.log('Server is up and running on http://localhost:4000'))