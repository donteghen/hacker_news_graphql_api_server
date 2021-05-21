// async function newVotingSubscribe(parent, args, context){
//     return await context.pubsub.asyncIterator(["NEW_VOTE"])
// }

const newVote = {
    subscribe : async(parent, args, context) => {
        const asyncIterator = await  context.pubsub.asyncIterator(["NEW_VOTE"])
        return asyncIterator
    },
    resolve: payload => payload
}
// async function newLinkSubscribe(parent, args, context){
//     return await context.pubsub.asyncIterator(["NEW_LINK"])
// }
const newLink = {
    subscribe : async(parent, args, context) => {
        const asyncIterator = await context.pubsub.asyncIterator(["NEW_LINK"])
        return asyncIterator
    },
    resolve: payload => payload
}
module.exports = {
    newLink, newVote
}