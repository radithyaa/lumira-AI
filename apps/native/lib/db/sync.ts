import { synchronize } from "@nozbe/watermelondb/sync";
import { authClient } from "../auth-client";
import { database } from "./index";

let isSyncing = false;

export async function sync() {
  if (isSyncing) {
    console.log("[Sync] Sync already in progress, skipping.");
    return;
  }

  isSyncing = true;
  console.log("[Sync] Starting synchronization...");

  const cookies = authClient.getCookie();
  const headers = {
    Cookie: cookies,
  };
  const session = await authClient.getSession();
  if (!session) {
    console.log("No local session found, skipping sync for now.");
    return;
  }

  try {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        console.log("Pulling changes from server, lastPulledAt:", lastPulledAt);
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/api/sync?last_pulled_at=${
            lastPulledAt || 0
          }`,
          {
            headers,
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Sync pull failed:", response.status, errorText);
          throw new Error(`Failed to pull changes: ${errorText}`);
        }

        const { changes, timestamp } = await response.json();
        console.log("Pulled changes:", changes);
        return { changes, timestamp };
      },
      pushChanges: async ({ changes }) => {
        console.log("Pushing changes to server:", changes);
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/api/sync`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ changes }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Sync push failed:", response.status, errorText);
          throw new Error(`Failed to push changes: ${errorText}`);
        }
        console.log("Changes pushed successfully.");
      },
    });
    console.log("Synchronization complete!");
  } catch (error) {
    console.error("Synchronization encountered an error:", error);
  } finally {
    isSyncing = false;
    console.log("Sync completed.");
  }
}
