import { z } from "zod";

const formValuesSchema = z.object({
  message: z
    .string()
    .min(1, "Message can't be empty")
    .max(1000, "Message is too long"),
});

export { formValuesSchema };
export type FormValues = z.infer<typeof formValuesSchema>;
