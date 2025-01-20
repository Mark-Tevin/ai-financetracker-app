import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// globalThis.prisma: global variable that ensures Prisma client instance is
// reused accross hot reloads during development. Without this, each time
// the app reloads, a new instance of the Prisma client would be created, 
// potentially causing connection issues.