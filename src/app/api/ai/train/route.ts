import { NextRequest, NextResponse } from "next/server";
import { Prisma, Document } from "@prisma/client";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { prisma } from "@/lib/prisma";

// Initialize Hugging Face embedding model
const embeddingModel = new HuggingFaceTransformersEmbeddings({
  model: "Xenova/all-MiniLM-L6-v2",
});

export const vectorStore = PrismaVectorStore.withModel<Document>(prisma).create(
  embeddingModel,
  {
    prisma: Prisma,
    tableName: "Document",
    vectorColumnName: "vector",
    columns: {
      id: PrismaVectorStore.IdColumn,
      content: PrismaVectorStore.ContentColumn,
    },
  }
);

// Function to fetch dataset from Hugging Face
async function fetchDataset(url: string) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch dataset");
  }
  const data = await response.json();
  return data;
}

// Function to generate embeddings
async function generateEmbeddings(texts: string[]) {
  const embeddings = await embeddingModel.embedDocuments(texts);
  return embeddings;
}

// Function to store embeddings in Prisma vector store
async function storeEmbeddings(texts: string[], embeddings: number[][]) {
  await vectorStore.addModels(
    await prisma.$transaction(
      texts.map((content) => prisma.document.create({ data: { content } }))
    )
  );
}

export async function POST(request: NextRequest) {
  try {
    const { datasetUrl } = await request.json();

    if (!datasetUrl) {
      return NextResponse.json(
        { error: "Dataset URL is required" },
        { status: 400 }
      );
    }

    // Fetch the dataset
    const dataset = await fetchDataset(datasetUrl);

    // Extract texts from the dataset
    const texts = dataset.rows.map((item: any) => item.row.text);

    // Generate embeddings for the texts
    const embeddings = await generateEmbeddings(texts);

    // Store embeddings in Prisma vector store
    await storeEmbeddings(texts, embeddings);

    return NextResponse.json({
      message: "Dataset processed and stored successfully",
    });
  } catch (error: any) {
    console.error("Error during dataset processing:", error);

    return NextResponse.json(
      { error: "Failed to process and store dataset" },
      { status: 500 }
    );
  }
}
