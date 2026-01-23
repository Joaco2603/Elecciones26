import { config } from "dotenv";
import { resolve } from "path";
import fs from "fs/promises";
import path from "path";
import { qdrantClient, COLLECTION_NAME } from "../src/lib/qdrant";
import { generateEmbeddings } from "../src/lib/ai/embedding";
import { chunkText } from "../src/lib/utils/chunking";
import pdf from "pdf-parse";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const DOCS_DIR = path.join(process.cwd(), "docs");

async function ingest() {
    console.log("Starting ingestion...");

    // Ensure collection exists
    const collections = await qdrantClient.getCollections();
    const exists = collections.collections.some((c) => c.name === COLLECTION_NAME);

    if (!exists) {
        console.log(`Creating collection: ${COLLECTION_NAME}`);
        await qdrantClient.createCollection(COLLECTION_NAME, {
            vectors: {
                size: 3072, // text-embedding-3-large default
                distance: "Cosine",
            },
        });
    }

    try {
        const files = await fs.readdir(DOCS_DIR);

        for (const file of files) {
            const filePath = path.join(DOCS_DIR, file);
            const stat = await fs.stat(filePath);

            if (stat.isDirectory()) continue;

            console.log(`Processing file: ${file}`);

            let text = "";

            if (file.endsWith(".pdf")) {
                const dataBuffer = await fs.readFile(filePath);
                const data = await pdf(dataBuffer);
                text = data.text;
            } else if (file.endsWith(".txt") || file.endsWith(".md")) {
                text = await fs.readFile(filePath, "utf-8");
            } else {
                console.warn(`Unsupported file type: ${file}`);
                continue;
            }

            const chunks = chunkText(text);
            console.log(`Generated ${chunks.length} chunks for ${file}`);

            const vectors = await generateEmbeddings(chunks);

            const points = chunks.map((chunk, i) => ({
                id: crypto.randomUUID(),
                vector: vectors[i],
                payload: {
                    text: chunk,
                    source: file,
                    page: i + 1, // Rough approximation
                },
            }));

            await qdrantClient.upsert(COLLECTION_NAME, {
                wait: true,
                points: points,
            });

            console.log(`Upserted ${points.length} points for ${file}`);
        }
        console.log("Ingestion complete.");
    } catch (error) {
        console.error("Error during ingestion:", error);
        if ((error as any).code === 'ENOENT') {
            console.error(`Directory not found: ${DOCS_DIR}. Please create it and add documents.`);
        }
    }
}

ingest();
