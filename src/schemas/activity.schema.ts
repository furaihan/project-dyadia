import { z } from "zod";

// Schema for creating an Activity (request body validation)
export const createActivitySchema = z.object({
	activityName: z.string().min(1).max(255),
	description: z.string().min(1).max(2000).optional(),
	location: z.string().min(1).max(255),
	// Accepts ISO date strings and will coerce to a Date object
	date: z.coerce.date(),
	// UUID referencing AnggotaDewan.idAnggota
	anggotaDewanId: z.uuid(),
});

export type CreateActivityInput = z.infer<typeof createActivitySchema>;
