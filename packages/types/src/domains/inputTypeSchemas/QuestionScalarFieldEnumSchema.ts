import { z } from 'zod';

export const QuestionScalarFieldEnumSchema = z.enum(['id', 'title', 'body', 'answer', 'createdAt', 'updatedAt']);

export default QuestionScalarFieldEnumSchema;
