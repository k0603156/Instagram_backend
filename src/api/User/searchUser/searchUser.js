export default {
  Query: {
    searchUser: async (_, args, {
      db
    }) => db.users({
      where: {
        OR: [{
            userName_contains: args.term
          },
          {
            firstName_contains: args.term
          },
          {
            lastName_contains: args.term
          }
        ]
      }
    })
  }
}