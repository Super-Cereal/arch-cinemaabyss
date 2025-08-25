const fastify = require("fastify")({ logger: true });
const { config } = require("./config");

fastify.all("/*", async (request, reply) => {
  const randomPercent = Math.random() * 100;

  let fullUrl = config.MOVIES_SERVICE_URL + request.url;

  if (request.url.startsWith("/api/movies") && randomPercent > config.MOVIES_MIGRATION_PERCENT) {
    host = config.MOVIES_SERVICE_URL + request.url;
  }

  fastify.log.info(`Proxying request ${request.url} to ${fullUrl}`);

  return reply.from(fullUrl);
});

fastify.listen({ port: config.PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`Api Gateway listening on ${address}`);
});
