import { z } from "zod"

// 🤖/edgly/deliver

export const edglyDeliverRobotSchema = z
  .object({ robot: z.literal("/edgly/deliver") })
  .describe(`caches and delivers files globally`)

export type EdglyDeliverRobot = z.infer<typeof edglyDeliverRobotSchema>
