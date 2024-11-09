import { z } from 'zod';

export const PostScalarFieldEnumSchema = z.enum([
  'id',
  'body',
  'questionId',
  'userId',
  'postType',
  'createdAt',
  'updatedAt',
]);

export default PostScalarFieldEnumSchema;
