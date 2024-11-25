import { z } from 'zod';

export const CorrectResultScalarFieldEnumSchema = z.enum([
  'id',
  'questionId',
  'userId',
  'elapsedSeconds',
  'numberOfPosts',
  'answerId',
  'createdAt',
  'updatedAt',
]);

export default CorrectResultScalarFieldEnumSchema;
