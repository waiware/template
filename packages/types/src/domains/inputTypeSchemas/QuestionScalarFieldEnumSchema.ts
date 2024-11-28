import { z } from 'zod';

export const QuestionScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'body',
  'answer',
  'publishedAt',
  'createdAt',
  'updatedAt',
]);

export default QuestionScalarFieldEnumSchema;
