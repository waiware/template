import { z } from 'zod';

export const AnswerScalarFieldEnumSchema = z.enum([
  'id',
  'body',
  'questionId',
  'userId',
  'isCorrect',
  'isJudging',
  'createdAt',
  'updatedAt',
]);

export default AnswerScalarFieldEnumSchema;
