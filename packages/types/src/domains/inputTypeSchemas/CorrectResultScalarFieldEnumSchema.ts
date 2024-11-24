import { z } from 'zod';

export const CorrectResultScalarFieldEnumSchema = z.enum([
  'id',
  'questionId',
  'userId',
  'elapsedSeconds',
  'numberOfPosts',
  'answeId',
  'createdAt',
  'updatedAt',
]);

export default CorrectResultScalarFieldEnumSchema;
