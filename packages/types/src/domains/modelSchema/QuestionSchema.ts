import { z } from 'zod';

/////////////////////////////////////////
// QUESTION SCHEMA
/////////////////////////////////////////

export const QuestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  answer: z.string(),
  publishedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Question = z.infer<typeof QuestionSchema>;

export default QuestionSchema;
