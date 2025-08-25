export const config = (() => {
  const PORT = process.env.PORT ?? 8000;
  const MONOLITH_URL = process.env.MONOLITH_URL;
  const MOVIES_SERVICE_URL = process.env.MOVIES_SERVICE_URL;
  const EVENTS_SERVICE_URL = process.env.EVENTS_SERVICE_URL;
  const GRADUAL_MIGRATION = process.env.GRADUAL_MIGRATION === "true";
  const MOVIES_MIGRATION_PERCENT = Number(process.env.MOVIES_MIGRATION_PERCENT) || 0;

  if (!MONOLITH_URL || (GRADUAL_MIGRATION && (!MOVIES_SERVICE_URL || !EVENTS_SERVICE_URL))) {
    throw new Error("Missing required environment variables");
  }

  return {
    PORT,
    MONOLITH_URL,
    MOVIES_SERVICE_URL,
    EVENTS_SERVICE_URL,
    GRADUAL_MIGRATION,
    MOVIES_MIGRATION_PERCENT,
  };
})();
