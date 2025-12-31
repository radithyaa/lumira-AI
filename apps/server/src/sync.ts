import { auth } from "@lumira/auth";
import { db } from "@lumira/db";
import { userProfile } from "@lumira/db/schema/user-profile";
import { and, eq, gt } from "drizzle-orm";
import type { Context } from "hono";

interface UserProfile {
  id: string;
  name: string;
  age: number;
  interest: string;
  dream_job: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

export async function handlePull(c: Context) {
  const session = await auth.api.getSession({
    headers: Object.fromEntries(c.req.raw.headers.entries()),
  });

  if (!session?.user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const lastPulledAt = c.req.query("last_pulled_at");
  const lastPulledAtDate = lastPulledAt
    ? new Date(Number(lastPulledAt))
    : new Date(0);

  try {
    const serverChanges = await db.query.userProfile.findMany({
      where: and(
        eq(userProfile.userId, session.user.id),
        gt(userProfile.updatedAt, lastPulledAtDate)
      ),
    });

    return c.json({
      changes: {
        user_profiles: {
          created: lastPulledAt ? [] : serverChanges,
          updated: lastPulledAt ? serverChanges : [],
          deleted: [],
        },
      },
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Sync pull error:", error);
    return c.json({ error: "Failed to pull changes" }, 500);
  }
}

export async function handlePush(c: Context) {
  const session = await auth.api.getSession({
    headers: Object.fromEntries(c.req.raw.headers.entries()),
  });

  if (!session?.user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { changes } = await c.req.json();
  if (!changes.user_profiles) {
    return c.json({ success: true });
  }

  const clientChanges: UserProfile[] = changes.user_profiles.created.concat(
    changes.user_profiles.updated
  );

  try {
    for (const change of clientChanges) {
      await db
        .insert(userProfile)
        .values({
          id: change.id, // WatermelonDB ID from client
          name: change.name,
          age: change.age,
          interest: change.interest,
          dreamJob: change.dream_job,
          userId: session.user.id,
        })
        .onConflictDoUpdate({
          target: userProfile.id, // Upsert based on the client ID
          set: {
            name: change.name,
            age: change.age,
            interest: change.interest,
            dreamJob: change.dream_job,
            updatedAt: new Date(),
          },
        });
    }

    return c.json({ success: true });
  } catch (error) {
    console.error("Sync push error:", error);
    return c.json({ error: "Failed to push changes" }, 500);
  }
}
