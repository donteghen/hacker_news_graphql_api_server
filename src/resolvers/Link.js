function postedBy(parent, agrs, context) {
    return context.prisma.link.findUnique({
        where :{
            id : parent.id
        }
    }).postedBy()
}
function votes(parent, args, context){
    return context.prisma.link.findUnique({
        wher :{
            id : parent.id
        }
    }).votes()
}
module.exports = {postedBy, votes}
