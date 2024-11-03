import { z } from 'zod';

export const QuestionScalarFieldEnumSchema = z.enum(['id', 'title', 'body', 'createdAt', 'updatedAt']);

export default QuestionScalarFieldEnumSchema;
