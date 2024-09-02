import { NextResponse } from "next/server";
import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage } from "@langchain/core/messages";
import { vectorStore } from "@/lib/vectorStore";

const llm = new ChatAnthropic({
  model: "claude-3-haiku-20240307",
  temperature: 0,
  maxTokens: undefined,
  maxRetries: 2,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    // Perform a similarity search with the vector store
    const results = await vectorStore.similaritySearch(prompt, 5);

    // Combine the retrieved documents into a single context for the prompt
    const context = results
      .map((result: any) => result.metadata.content)
      .join("\n");

    // Incorporate the context into the prompt for the language model
    const fullPrompt = `Context: ${context}\n\nQuestion: ${prompt}`;

    // Invoke the language model with the prompt
    const response = await llm.invoke([
      new HumanMessage({ content: fullPrompt }),
    ]);

    return NextResponse.json({ text: response.content });
  } catch (error: any) {
    console.error("Error during AI completion:", error);

    let errorMessage = "Failed to generate text";
    let errorType = "general_error";

    // Check if the error is an instance of a specific error type
    if (error instanceof Error) {
      if (error.message.includes("rate limit")) {
        errorMessage = "Rate limit exceeded. Please try again later.";
        errorType = "rate_limit";
      } else if (error.message.includes("usage limit")) {
        errorMessage =
          "Usage limit reached. You can add your own API key to continue using the app.";
        errorType = "usage_limit";
      } else {
        // Other specific checks or default handling
        errorMessage = `An unexpected error occurred: ${error.message}`;
      }
    }

    return NextResponse.json(
      { error: errorMessage, errorType },
      { status: 500 }
    );
  }
}
