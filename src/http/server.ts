import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

// Declare a route
app.get("/", (request, reply) => ({
  hello: ":)",
}));

// Run the server!
try {
  app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
