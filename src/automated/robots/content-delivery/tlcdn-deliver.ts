import { z } from "zod"

// 🤖/tlcdn/deliver

export const tlcdnDeliverRobotSchema = z
  .object({ robot: z.literal("/tlcdn/deliver") })
  .describe(`caches and delivers files globally`)

export type TlcdnDeliverRobot = z.infer<typeof tlcdnDeliverRobotSchema>
