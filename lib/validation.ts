import { z } from "zod";

export const eventIdSchema = z.string().cuid().max(40);

export function parseEventId(value: FormDataEntryValue | null) {
  return eventIdSchema.parse(value);
}
