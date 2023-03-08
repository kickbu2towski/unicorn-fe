import lucia from "lucia-auth";
import prismaAdapater from "@lucia-auth/adapter-prisma";
import { google } from "@lucia-auth/oauth/providers";
import { dev } from "$app/environment";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } from "$env/static/private";
import { prisma } from "./prisma";

export const auth = lucia({
	adapter: prismaAdapater(prisma),
	env: dev ? "DEV" : "PROD",
  transformUserData: (userData) => ({
    userId: userData.id,
    username: userData.username, 
    email: userData.email,
    activated: userData.activated, 
  })
});

export const googleAuth = google(auth, {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: GOOGLE_REDIRECT_URI ,
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'openid',
  ]
});

export type Auth = typeof auth;