const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwt_secret = require('../../env/env')
const signUp =  async(parent, args, context, info) => {
    const hashedPassword =  await bcrypt.hash(args.password, 8)
    const user  = await context.prisma.user.create({
        data : {
            name:args.name,
            email:args.email,
            password:hashedPassword
        }
    });
    const token = jwt.sign({userId : user.id}, jwt_secret);
    return {user, token}
}
const signIn =  async(parent, args, context, info) => {
    const user  = await context.prisma.user.findUnique({
        where :{
            email : args.email
        }
    });
    if(!user){
        throw new Error('No matching user found')
    }
    const valid = await bcrypt.compare(args.password, user.password);
    if(!valid){
        throw new Error('Password is incorrect')
    }
    const token =  jwt.sign({userId : user.id}, jwt_secret);
    return {user, token}
}

const post = async(parent, args, context, info) => {
    const {userId} = context
    const link  = await context.prisma.link.create({
        data : {
            description:args.description,
            url:args.url,
            postedBy : { connect: { id : userId } }
        },
        include:{
            postedBy : true
        }
    });
    context.pubsub.publish('NEW_LINK', link)
    return link
}
const deleteLink = async (_, args, context, info) =>{
    const {userId} = context;
    if(userId){
        const deleteLink = await context.prisma.link.delete({
            where: {
                id: Number(args.id),
                },
                include:{
                    postedBy : true
                }
            })
           return deleteLink
    }
}
const updateLink = async (_, args, context, info) => {
    const {userId} = context;
    if(userId){
        const updatedLink = await context.prisma.link.update({
            where :{   
            id:Number(args.id),

        },
        data:{
            description : args.description,
            url: args.url
        },
       
    })
    return updatedLink
    }
    
}
const vote = async(parent, args, context, info) =>{
    const {userId} = context;
    const voteCheck = await context.prisma.vote.findUnique({
        where:{
            linkId_userId :{
                userId : Number(userId),
                linkId : Number(args.linkId)
            }
        }
    })
    if(voteCheck){
        throw new Error('Already voted for this link')
    }
    const newVote = await context.prisma.vote.create({
        data : {
            user : {
                connect : {
                    id : userId
                }
            },
            link : {
                connect : {
                    id : Number(args.linkId)
                }
            }, 
        },
        include :{
            user : true, link : true
        }
    });
    context.pubsub.publish('NEW_VOTE', newVote)
    return newVote
}
module.exports = {
 post, deleteLink, updateLink, signIn, signUp, vote
}