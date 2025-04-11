import { z } from "zod";

const EnvSchema = z.object({
  API_URL: z.string(),
  CEPEA_URL: z.string(),
})

const ReactEnvs = {
  API_URL: process.env.REACT_APP_API_URL,
  CEPEA_URL: process.env.REACT_APP_CEPEA_URL,

}


export const envs = EnvSchema.parse(ReactEnvs)




