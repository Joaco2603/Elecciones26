export const chunkText = (text: string, maxTokens: number = 1000, overlap: number = 100): string[] => {
    // Simple character-based split for now, assuming ~4 chars per token roughly
    // In a real scenario, use tiktoken or similar if strict token count is needed
    const chunkSize = maxTokens * 4;
    const overlapSize = overlap * 4;

    const chunks: string[] = [];
    let startIndex = 0;

    while (startIndex < text.length) {
        const endIndex = Math.min(startIndex + chunkSize, text.length);
        const chunk = text.slice(startIndex, endIndex);
        chunks.push(chunk);

        if (endIndex === text.length) break;

        startIndex += chunkSize - overlapSize;
    }

    return chunks;
};
