import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, Message } from "ai";
import { qdrantClient, COLLECTION_NAME } from "@/lib/qdrant";
import { generateEmbedding } from "@/lib/ai/embedding";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Get the last user message to generate embedding
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

    // 1. Generate embedding for query
    const queryEmbedding = await generateEmbedding(userQuery);

    // 2. Search in Qdrant
    const searchResults = await qdrantClient.search(COLLECTION_NAME, {
        vector: queryEmbedding,
        limit: 5,
        score_threshold: 0.7, // Only relevant results
    });

    // 3. Construct Context
    const context = searchResults
        .map((result) => {
            const payload = result.payload as any;
            return `[Source: ${payload.source}]\n${payload.text}`;
        })
        .join("\n\n");

    // 4. System Prompt with Context
    const systemPrompt = `You are an expert legal assistant for the 2026 Elections.
  
  Use the following pieces of context to answer the user's question.
  If the answer is not in the context, say "Baseado en la normativa disponible, no cuento con información suficiente para responder."
  Always cite the source (using the Source provided in the context) where possible.
  
  Context:
  ${context}
  `;

    // 5. Generate Response with Streaming
    const result = await streamText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
}
