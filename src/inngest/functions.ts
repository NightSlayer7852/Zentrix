import { inngest } from "./client";
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const generate = inngest.createFunction(
    { id: "generate" },
    { event: "demo/generate" },
    async ({ event }) => {
        const { text } = await generateText({
            model: google('gemini-2.5-flash'),
            prompt: 'Write a vegetarian lasagna recipe for 4 people.',
        });
        return text;
    },
);