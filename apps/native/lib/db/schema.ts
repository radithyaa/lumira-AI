import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "user_profiles",
      columns: [
        { name: "name", type: "string" },
        { name: "age", type: "number" },
        { name: "interest", type: "string" },
        { name: "dream_job", type: "string" },
      ],
    }),
  ],
});
