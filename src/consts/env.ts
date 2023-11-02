export const serverSideEnv = {
  AUTH_KEY: process.env.AUTH_KEY || "",
  CLIENT_SECRET: process.env.CLIENT_SECRET || "",
} as const;

export const clientSideEnv = {
  CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID || "",
  CALLBACK_URI: process.env.NEXT_PUBLIC_REDIRECT_URI || "",
} as const;
