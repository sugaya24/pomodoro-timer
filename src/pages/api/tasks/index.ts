import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const tasks = await prisma.task.findMany();
  res.status(200).json(tasks);
}
