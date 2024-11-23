import { z } from 'zod';

/////////////////////////////////////////
// ANSWER SCHEMA
/////////////////////////////////////////

export const AnswerSchema = z.object({
  id: z.string(),
  body: z.string(),
  questionId: z.string(),
  userId: z.string(),
  isCorrect: z.boolean(),
  isJudging: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Answer = z.infer<typeof AnswerSchema>;

export default AnswerSchema;
