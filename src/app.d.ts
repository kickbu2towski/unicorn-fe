import type { PrismaClient } from "@prisma/client";

declare global {
  namespace App {
		interface Locals {
			validate: import("@lucia-auth/sveltekit").Validate;
			validateUser: import("@lucia-auth/sveltekit").ValidateUser;
			setSession: import("@lucia-auth/sveltekit").SetSession;
		}
	}	
	namespace Lucia {
	type Auth = import("$lib/server/lucia").Auth;
	type UserAttributes = {
		username: string
		email: string	
		activated: boolean
	};
}
	var __prisma: PrismaClient
}
