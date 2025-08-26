"use strict";

const fastify = require("fastify")({ logger: true });
const { config } = require("./config.js");

fastify.register(require("@fastify/kafka"), {
  producer: {
    "metadata.broker.list": config.KAFKA_BROKERS,
    "fetch.wait.max.ms": 10,
    "fetch.error.backoff.ms": 50,
  },
  consumer: {
    "metadata.broker.list": config.KAFKA_BROKERS,
    "group.id": "events-service",
    "fetch.wait.max.ms": 10,
    "fetch.error.backoff.ms": 50,
    "auto.offset.reset": "earliest",
  },
});

fastify.get("/api/events/health", async (_, reply) => {
  reply.send({ status: true });
});

fastify.post("/api/events/movie", async (request, reply) => {
  const { body } = request;

  if (!body.movie_id || !body.title || !body.action) {
    reply.status(400).send({ error: "No movie_id or title or action" });
  }

  fastify.kafka.push({
    topic: "movie-events",
    payload: JSON.stringify(body),
    key: body.movie_id,
  });

  reply.status(201).send({ status: "success" });
});

fastify.post("/api/events/user", async (request, reply) => {
  const { body } = request;

  if (!body.user_id || !body.action || !body.timestamp) {
    reply.status(400).send({ error: "No user_id or action or timestamp" });
  }

  fastify.kafka.push({
    topic: "user-events",
    payload: JSON.stringify(body),
    key: body.user_id,
  });

  reply.status(201).send({ status: "success" });
});

fastify.post("/api/events/payment", async (request, reply) => {
  const { body } = request;

  if (
    !body.payment_id ||
    !body.user_id ||
    !body.amount ||
    !body.status ||
    !body.timestamp
  ) {
    reply.status(400).send({
      error: "No payment_id or user_id or amount or status or timestamp",
    });
  }

  fastify.kafka.push({
    topic: "payment-events",
    payload: JSON.stringify(body),
    key: body.payment_id,
  });

  reply.status(201).send({ status: "success" });
});

fastify.listen({ port: config.PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`Api Gateway listening on ${address}`);

  fastify.kafka.subscribe(["movie-events", "user-events", "payment-events"]);

  fastify.kafka.on("movie-events", (msg, commit) => {
    console.log(msg.value.toString());
    commit();
  });

  fastify.kafka.on("user-events", (msg, commit) => {
    console.log(msg.value.toString());
    commit();
  });

  fastify.kafka.on("payment-events", (msg, commit) => {
    console.log(msg.value.toString());
    commit();
  });
});
