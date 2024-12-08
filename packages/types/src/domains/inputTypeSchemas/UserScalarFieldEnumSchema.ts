import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export default UserScalarFieldEnumSchema;
