export default {
  Message: {
    from: ({
      id
    }, _, {
      db
    }) => db.message({
      id
    }).from(),
    to: ({
      id
    }, _, {
      db
    }) => db.message({
      id
    }).to(),
    chatRoom: ({
      id
    }, _, {
      db
    }) => db.message({
      id
    }).chatRoom()
  }
};