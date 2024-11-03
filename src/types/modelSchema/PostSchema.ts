import { z } from 'zod';
import { PostTypeSchema } from '../inputTypeSchemas/PostTypeSchema';

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  postType: PostTypeSchema,
  id: z.string(),
  body: z.string(),
  questionId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Post = z.infer<typeof PostSchema>;

export default PostSchema;
