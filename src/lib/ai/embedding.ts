import { openai } from "@ai-sdk/openai";
import { embed, embedMany } from "ai";

const embeddingModel = openai.embedding("text-embedding-3-large");

export const generateEmbedding = async (value: string): Promise<number[]> => {
    const input = value.replaceAll("\\n", " ");
    const { embedding } = await embed({
        model: embeddingModel,
        value: input,
    });
    return embedding;
};

export const generateEmbeddings = async (
    values: string[]
): Promise<number[][]> => {
    const { embeddings } = await embedMany({
        model: embeddingModel,
        values: values,
    });
    return embeddings;
};
