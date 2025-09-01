import { z } from "zod";

const serverSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
});

export const env = {
  ...serverSchema.parse(process.env),
};
