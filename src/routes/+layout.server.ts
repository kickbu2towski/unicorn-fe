// src/routes/+layout.server.ts
import { handleServerSession } from "@lucia-auth/sveltekit";

export const load = handleServerSession();