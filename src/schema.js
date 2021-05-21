const typeDefs = `
type Query {
    info : String!
    feed : [Link!]!
    getAllUsers : [User!]!
    getUserById(id: ID!) : User!
}
type User {
    id : ID!
    name: String!
    email : String!
    password: String!
    links : [Link]
    
}
type Payload {
    user : User!
    token : String!
}
type Link {
    id : ID!
    description : String!
    url : String!
    postedBy : User
    votes : [Vote!]!
}
type Vote {
    id: ID!
    link: Link!
    user: User!
  }
type Mutation {
    post(description:String!, url:String!) : Link!
    deleteLink(id:ID!) : Link!
    updateLink(id:ID!, description : String, url : String) : Link!
    signUp(name:String!, email:String!, password:String!): Payload!
    signIn(email:String!, password:String!) : Payload!
    vote(linkId:ID!):Vote
}
type Subscription {
    newLink : Link
    newVote : Vote
}
`
module.exports = typeDefs