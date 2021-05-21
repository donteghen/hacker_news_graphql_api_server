async function user(parent, args, context){
    return await context.prisma.vote.findUnique({
        where : {
            id : parent.id
        }
    }).user()
}
async function link(parent, args, context){
    return await context.prisma.vote.findUnique({
        where : {
            id : parent.id
        }
    }).link()
}
module.exports = {user, link}