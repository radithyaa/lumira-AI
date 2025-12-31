import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import UserProfile from "./models/UserProfile";
import { mySchema } from "./schema";

const adapter = new SQLiteAdapter({
  schema: mySchema,
  dbName: "lumira",
  // jsi: true, // `jsi` is usually not needed when using react-native-sqlite-storage directly
  onSetUpError: (error) => {
    // Database startup error
    console.error("Database setup error", error);
  },
  // Use `react-native-sqlite-storage` directly
  // If `react-native-sqlite-storage` is globally linked/polyfilled, `jsi` might be more appropriate.
  // For now, let's assume `react-native-sqlite-storage` provides the necessary global.
});

export const database = new Database({
  adapter,
  modelClasses: [UserProfile],
});

export type AppDatabase = typeof database;
