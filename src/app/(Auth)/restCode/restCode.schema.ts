import * as zod from "zod";

export const restCodeSchema = zod
  .object({
   
    resetCode: zod.string().nonempty('rest Code Required'),
    
  });
  
