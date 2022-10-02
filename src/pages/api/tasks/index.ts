import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
    } catch {
      res.status(400).json({});
    }
  } else if (req.method === "POST") {
    const { title, uid } = req.body;
    const newTask = await prisma.task.create({
      data: {
        title: title,
        count: 0,
        active: false,
        author: {
          connect: {
            uid: uid,
          },
        },
      },
    });
    res.status(201).json({ newTask });
  } else {
    res.status(400).json({});
  }
}
