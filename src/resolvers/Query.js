const feed = async(_, args, context) => await context.prisma.link.findMany({
    include:{
        postedBy : true
    }
});

const getAllUsers = async (_, args, context, info) => await context.prisma.user.findMany({
    include:{
        links : true
    }
});

const getUserById = async (_, args, context, info) => await context.prisma.user.findUnique({
    where : {
        id : Number(args.id)
    },
    include:{
        links : true
    }
})

module.exports = {
    feed,
    getAllUsers, 
    getUserById
}