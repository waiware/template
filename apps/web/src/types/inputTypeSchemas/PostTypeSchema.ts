import { z } from 'zod';

export const PostTypeSchema = z.enum(['USER','BOT']);

export type PostTypeType = `${z.infer<typeof PostTypeSchema>}`

export default PostTypeSchema;
