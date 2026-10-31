import { createServer } from "../packages/api/src/server.js";
import { startQueue } from "../packages/worker/src/queue.js";
import { banner } from "../packages/cli/src/main.js";
import { parseFlags } from "../packages/cli/src/flags.js";

const flags = parseFlags(process.argv.slice(2));
startQueue();
createServer().listen(flags.port ?? 3000, () => console.log(banner(flags.port ?? 3000)));
