import "./env";
import { prisma } from "../generated/prisma-client";
import "./passport";
import { GraphQLServer } from "graphql-yoga";
import morgan from "morgan";
import schema from "./schema";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

const PORT = process.env.PORT || 8001;
const { ngrok, logger } =
  process.env.NODE_ENV !== "production"
    ? {
        ngrok: require("ngrok"),
        logger: morgan("dev"),
      }
    : {
        ngrok: false,
        logger: morgan("tiny"),
      };

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({
    db: prisma,
    request,
    isAuthenticated,
  }),
});

server.express.use(logger);
server.express.use(authenticateJwt);

server.start(
  {
    port: PORT,
  },
  async ({ port, endpoint, subscriptions, playground }) => {
    console.log(`Server running on port http://localhost:${port}`);

    if (ngrok) {
      let url;
      try {
        url = await ngrok.connect(port);
        console.log(`Server running with ngrok ${url}`);
        console.table({ endpoint, subscriptions, playground });
      } catch (e) {
        return logger.error(e);
      }
    }
  },
);
