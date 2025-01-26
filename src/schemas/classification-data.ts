import { z } from "zod";

const classificationDataSchema = z.object({
  sentiment: z
    .enum(["happy", "neutral", "sad"])
    .describe("The sentiment of the text"),
  aggressiveness: z
    .number()
    .int()
    // .min(1)
    // .max(5)
    .describe(
      "describes how aggressive the statement is, the higher the number the more aggressive"
    ),
  language: z
    .enum(["spanish", "english", "french", "german", "italian"])
    .describe("The language the text is written in"),
});

export { classificationDataSchema };
export type ClassificationData = z.infer<typeof classificationDataSchema>;
