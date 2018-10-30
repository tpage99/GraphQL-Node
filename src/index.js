const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
    Query: {
        info: () => 'This is the API of a Hackernews Clone',
        feed: () => (root, args, context, info) => {
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

//3 added comment
const server = new GraphQLServer ({
    typeDefs: './src/schema.graphql',
    resolvers,
})
 
server.start(() => console.log('Server is up and running on http://localhost:4000'))