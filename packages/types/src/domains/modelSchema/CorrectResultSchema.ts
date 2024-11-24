import { z } from 'zod';

/////////////////////////////////////////
// CORRECT RESULT SCHEMA
/////////////////////////////////////////

export const CorrectResultSchema = z.object({
  id: z.string(),
  questionId: z.string(),
  userId: z.string(),
  elapsedSeconds: z.number().int(),
  numberOfPosts: z.number().int(),
  answeId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CorrectResult = z.infer<typeof CorrectResultSchema>;

export default CorrectResultSchema;
