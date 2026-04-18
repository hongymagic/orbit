/**
 * Database integration slot.
 *
 * Today: reads from the static mocks under `src/data/*`. The public
 * interface (`getDeployments`, `getServices`, etc.) mirrors the shape a
 * real DB client would expose, so swapping to Drizzle / Prisma / Kysely
 * is a drop-in replacement — product code keeps working.
 *
 * How to wire Drizzle + libSQL (Turso-compatible):
 *
 *   1. bun add drizzle-orm @libsql/client
 *      bun add -D drizzle-kit
 *   2. Set DATABASE_URL in .env.local (e.g. file:./orbit.db or libsql://...).
 *   3. Add a schema file at src/integrations/db/schema.ts defining
 *      `deployments` and `services` tables.
 *   4. Replace the mock readers below with Drizzle queries:
 *
 *      import { drizzle } from "drizzle-orm/libsql";
 *      import { createClient } from "@libsql/client";
 *      import * as schema from "./schema";
 *      const client = createClient({ url: env.DATABASE_URL! });
 *      export const db = drizzle(client, { schema });
 *      export const getDeployments = () => db.select().from(schema.deployments);
 *
 *   5. `bunx drizzle-kit push` to create tables; seed from src/data/*.
 */

import { deployments as deploymentsMock, type Deployment } from "@/data/deployments";
import { services as servicesMock, type Service } from "@/data/services";
import { activityToday } from "@/data/activity";
import type { ActivityEvent } from "@/components/data/activity";

export type { Deployment, Service, ActivityEvent };

export async function getDeployments(): Promise<readonly Deployment[]> {
  return deploymentsMock;
}

export async function getDeployment(id: string): Promise<Deployment | null> {
  return deploymentsMock.find((d) => d.id === id) ?? null;
}

export async function getServices(): Promise<readonly Service[]> {
  return servicesMock;
}

export async function getActivity(): Promise<readonly ActivityEvent[]> {
  return activityToday;
}
