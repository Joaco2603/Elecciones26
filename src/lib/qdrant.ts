import { QdrantClient } from "@qdrant/js-client-rest";

if (!process.env.QDRANT_URL) {
    throw new Error("QDRANT_URL environment variable is not defined");
}

if (!process.env.QDRANT_API_KEY) {
    throw new Error("QDRANT_API_KEY environment variable is not defined");
}

export const qdrantClient = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
});

export const COLLECTION_NAME = "elecciones26_docs";
