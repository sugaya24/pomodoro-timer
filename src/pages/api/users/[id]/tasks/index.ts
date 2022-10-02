import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (typeof id === "string") {
    const tasks = await prisma.task.findMany({
      where: {
        author: {
          uid: id,
        },
      },
    });
    res.status(200).json({ tasks });
  } else {
    res.status(400).json({});
  }
}
