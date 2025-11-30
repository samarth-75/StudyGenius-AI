import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";

dotenv.config();

export const githubModelClient = ModelClient(
  process.env.GITHUB_ENDPOINT,
  new AzureKeyCredential(process.env.GITHUB_TOKEN)
);

export const GITHUB_MODEL = process.env.GITHUB_MODEL || "openai/gpt-4.1-mini";