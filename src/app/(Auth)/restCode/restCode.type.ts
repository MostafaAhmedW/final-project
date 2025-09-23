import * as zod from "zod";
import { restCodeSchema } from "./restCode.schema";

export type RestCodeFormType = zod.infer<typeof restCodeSchema>;