import { initBotId } from "botid/client/core";

/* Vercel BotID runs an invisible check in the browser and attaches proof to
   requests to these routes; /api/contact verifies it with checkBotId(). */
initBotId({
  protect: [{ path: "/api/contact", method: "POST" }],
});
