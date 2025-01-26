"use server";

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { classificationSchema } from "./schemas";

const taggingPrompt = ChatPromptTemplate.fromTemplate(
  `Extract the desired information from the following passage.

Only extract the properties mentioned in the 'Classification' function.

Passage:
{input}
`
);

export async function extractClassificationData() {
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
  });
  const llmWihStructuredOutput = llm.withStructuredOutput(
    classificationSchema,
    { name: "extractor" }
  );
  const prompt = await taggingPrompt.invoke({
    input:
      "Estoy increiblemente contento de haberte conocido! Creo que seremos muy buenos amigos!",
  });
  const result = await llmWihStructuredOutput.invoke(prompt);

  return result;
}
