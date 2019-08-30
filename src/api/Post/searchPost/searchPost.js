export default {
  Query: {
    searchPost: async (_, args, {
      db
    }) => db.posts({
      where: {
        OR: [{
          location_starts_with: args.term
        }, {
          caption_starts_with: args.term
        }]
      }
    })
  }
};