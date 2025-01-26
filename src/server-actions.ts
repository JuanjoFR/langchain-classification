"use server";

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";

export async function getData() {
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
  });

  const taggingPrompt = ChatPromptTemplate.fromTemplate(
    `Extract the desired information from the following passage.
  
  Only extract the properties mentioned in the 'Classification' function.
  
  Passage:
  {input}
  `
  );
  const classificationSchema = z.object({
    sentiment: z.string().describe("The sentiment of the text"),
    aggressiveness: z
      .number()
      .int()
      .describe("How aggressive the text is on a scale from 1 to 10"),
    language: z.string().describe("The language the text is written in"),
  });

  // Name is optional, but gives the models more clues as to what your schema represents
  const llmWihStructuredOutput = llm.withStructuredOutput(
    classificationSchema,
    {
      name: "extractor",
    }
  );

  const prompt1 = await taggingPrompt.invoke({
    input:
      "Estoy increiblemente contento de haberte conocido! Creo que seremos muy buenos amigos!",
  });
  const result = await llmWihStructuredOutput.invoke(prompt1);

  return result;
}
