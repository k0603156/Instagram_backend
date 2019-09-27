export default {
  Comment: {
    user: ({
      id
    }, _, {
      db
    }) => db.comment({
      id
    }).user(),
    post: ({
      id
    }, _, {
      db
    }) => db.comment({
      id
    }).post()
  }
};