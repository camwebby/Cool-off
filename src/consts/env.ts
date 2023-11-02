export const serverSideEnv = {
  AUTH_KEY: process.env.AUTH_KEY || "",
  CLIENT_ID: process.env.CLIENT_ID || "",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "",
  CALLBACK_URI: process.env.REDIRECT_URI || "",
} as const;
