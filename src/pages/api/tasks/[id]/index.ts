import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id, task } = req.body;
    const updatedTask = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: task.title,
      },
    });
    res.status(200).json(updatedTask);
  } else {
    res.status(400).json({});
  }
}
