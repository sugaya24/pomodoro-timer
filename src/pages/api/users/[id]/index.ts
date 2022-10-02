import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    let id;
    if (!req.query.id) {
      res.status(404).json({});
      return;
    }
    if (typeof req.query.id === "string") {
      id = req.query.id;
    } else {
      id = req.query.id[0];
    }
    try {
      const user = await prisma.user.findUnique({ where: { uid: id } });
      res.status(200).json({ user });
    } catch {
      res.status(404).json({});
    }
  } else {
    res.status(400).json({});
  }
}
