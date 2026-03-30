import { isMatch } from "date-fns";
import { z } from "zod";
import { isValidYear } from "@/app/_utils/monthYearFilter";

export const generateAiReportSchema = z.object({
  month: z.string().refine((value) => isMatch(value, "MM")),
  year: z.string().refine((value) => isValidYear(value)),
});

export type GenerateAiReportSchema = z.infer<typeof generateAiReportSchema>;
