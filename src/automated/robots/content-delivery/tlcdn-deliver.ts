import { z } from "zod"

// 🤖/tlcdn/deliver

export const tlcdn_deliver_robot_schema = z
  .object({ robot: z.literal("/tlcdn/deliver") })
  .describe("undefined")

export type TlcdnDeliverRobot = z.infer<typeof tlcdn_deliver_robot_schema>
