module.exports = {
  config: {
    PORT: process.env.PORT || 8080,
    KAFKA_BROKERS: process.env.KAFKA_BROKERS || "kafka:9092",
  },
};
