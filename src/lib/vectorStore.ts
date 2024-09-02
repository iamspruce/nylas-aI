import { Prisma, Document } from "@prisma/client";
import { PrismaVectorStore } from "@langchain/community/vectorstores/prisma";
import { prisma } from "./prisma";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";

export const embeddingModel = new HuggingFaceTransformersEmbeddings({
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
