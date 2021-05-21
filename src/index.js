 const {ApolloServer} = require('apollo-server')
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()
const {feed, getUserById, getAllUsers} = require('./resolvers/Query')
const {post, deleteLink, updateLink, signIn, signUp, vote} = require('./resolvers/Mutation')
const typeDefs = require('./schema')
const jwt_secret = require('../env/env');
const User = require('./resolvers/User')
const Link = require('./resolvers/Link');
const Vote = require('./resolvers/Vote');
const getUserIdFromToken = require('./utils/auth_hash')
const {PubSub } = require('apollo-server');
const Subscription = require('./resolvers/Subscription')
const pubsub = new PubSub();
console.log(Subscription)
const resolvers = {
    Query:{
        info: ()=> 'this is just testing info query ',
        feed,
        getAllUsers,
        getUserById 
    },
    Mutation:{
        signUp,
        signIn, 
        post,
        deleteLink,
        updateLink,
        vote
    }, 
    Subscription,
    Link,
    User,
    Vote,
    
}

const server =  new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
       return {
        ...req,
        pubsub,
        prisma,
        userId : req && req.headers.authorization ? getUserIdFromToken(req) : null
       }
    }
})
server.listen()
.then(({url}) => console.log('server running at' + url))