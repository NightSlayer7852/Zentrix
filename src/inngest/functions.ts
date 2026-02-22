import { inngest } from "./client";
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import firecrawl from "../lib/firecrawl";

const URL_REGEX = /https?:\/\/[^\s]+/g;

export const generate = inngest.createFunction(
    { id: "generate" },
    { event: "demo/generate" },
    async ({ event, step }) => {

        const prompt = event.data?.prompt;

        if (!prompt || typeof prompt !== "string") {
            throw new Error("Prompt is required");
        }

        const urls = await step.run("extract-urls", async () => {
            const matches = prompt.match(URL_REGEX);
            return matches ?? [];
        }) as string[];

        const scrapedContent = await step.run("scrape-urls", async () => {
            const results = await Promise.all(
                urls.map(async (url) => {
                    const result = await firecrawl.scrape(url, { formats: ['markdown'] });
                    return result.markdown ?? null;
                })
            );
            return results.filter(Boolean).join("\n\n");
        });

        const finalPrompt = scrapedContent
            ? `Context:\n${scrapedContent}\n\n${prompt}`
            : prompt;

        await step.run("generate-response", async () => {
            return await generateText({
                model: google('gemini-2.5-flash'),
                prompt: finalPrompt,
            });
        });
    }
);
