import { db } from './index.ts';
import { users } from './schema.ts';

export async function getOrCreateUser(uid: string, email: string, name?: string) {
  try {
    const result = await db.insert(users)
      .values({
        uid,
        email,
        name: name || 'Career Innovator',
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          name: name || 'Career Innovator',
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('getOrCreateUser database operation failed:', error);
    throw new Error('User registry sync failed.', { cause: error });
  }
}
