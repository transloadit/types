import { z } from "zod"

// 🤖/edgly/deliver

export const edgly_deliver_robot_schema = z
  .object({ robot: z.literal("/edgly/deliver") })
  .describe(`caches and delivers files globally`)

export type EdglyDeliverRobot = z.infer<typeof edgly_deliver_robot_schema>
