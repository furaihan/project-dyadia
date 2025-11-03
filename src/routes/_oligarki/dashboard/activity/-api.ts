import { createServerFn } from "@tanstack/react-start";
import z from "zod";

export const fetchActivities = createServerFn({ method: "GET" })
  .inputValidator((anggotaDewanId: string) => z.uuid().parse(anggotaDewanId))
  .handler(async ({ data }) => {
    const anggotaDewanId = data;

    console.info(`Fetching activities for AnggotaDewan ID: ${anggotaDewanId}`);

    
  });