"use server";

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { classificationDataSchema } from "./schemas/classification-data";

const taggingPrompt = ChatPromptTemplate.fromTemplate(
  `Extract the desired information from the following passage.

Only extract the properties mentioned in the 'Classification' function.

Passage:
{input}
`
);

export async function extractClassificationData(formData: FormData) {
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
  });
  const llmWihStructuredOutput = llm.withStructuredOutput(
    classificationDataSchema,
    { name: "extractor" }
  );
  formData.get("message");
  const prompt = await taggingPrompt.invoke({
    input: formData.get("message"),
  });
  const result = await llmWihStructuredOutput.invoke(prompt);

  return result;
}
