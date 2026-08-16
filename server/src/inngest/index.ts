import { inngest } from "./client.js";

export const processSource = inngest.createFunction(
    { id: "hello-world", triggers: [{ event: "test/hello.world" }] },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
)

// Create an empty array where we'll export future Inngest functions
export const functions = [processSource];