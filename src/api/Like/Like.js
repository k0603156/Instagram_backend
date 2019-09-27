export default {
  Like: {
    post: ({
      id
    }, _, {
      db
    }) => db.like({
      id
    }).post(),
    user: ({
      id
    }, _, {
      db
    }) => db.like({
      id
    }).user()
  }
};