import { env } from "./lib/env/env.js";
import { createServer } from "./lib/server/fastify.js";

async function main() {
  try {
    const server = await createServer();
    
    await server.listen({ 
      port: env.PORT, 
      host: "0.0.0.0" 
    });

    console.log(`🚀 Server ready at http://localhost:${env.PORT}`);
    console.log(`📡 tRPC endpoint: http://localhost:${env.PORT}/trpc`);

    // Handle graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n👋 Received ${signal}, gracefully shutting down...`);
      try {
        await server.close();
        console.log("✅ Server closed successfully");
        process.exit(0);
      } catch (error) {
        console.error("❌ Error during shutdown:", error);
        process.exit(1);
      }
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("❌ Unhandled error:", error);
  process.exit(1);
});
