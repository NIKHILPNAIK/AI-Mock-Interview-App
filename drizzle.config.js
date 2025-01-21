import { defineConfig } from "drizzle-kit";


export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  dbCredentials: {
    url:'postgresql://ai-interview-mocker_owner:yUpgz7FaN9kx@ep-misty-salad-a5n2twk0.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require'
  }
});
