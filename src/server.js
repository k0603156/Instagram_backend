import "./env";
import {
  prisma
} from "../generated/prisma-client";
import "./passport";
import {
  GraphQLServer
} from 'graphql-yoga';
import logger from 'morgan';
import schema from "./schema";
import {
  authenticateJwt
} from './passport';
import {
  isAuthenticated
} from "./middlewares";

const PORT = process.env.PORT || 8001;

const server = new GraphQLServer({
  schema,
  context: ({
    request
  }) => ({
    db: prisma,
    request,
    isAuthenticated
  })
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);

server.start({
  port: PORT
}, () => console.log(`Server running on port http://localhost:${PORT}`));