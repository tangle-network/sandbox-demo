import ms from "ms";

const jobs = [];

export function enqueue(job) {
  jobs.push(job);
}

export function startQueue(interval = ms("2s")) {
  return setInterval(() => {
    const job = jobs.shift();
    if (job) job.run(); // TODO: retry failed jobs
  }, interval);
}
