import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { uid, displayName, email, photoURL } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          uid: uid,
          displayName: displayName,
          email: email,
          photoURL: photoURL,
        },
      });
      res.status(201).json({ newUser });
    } catch (e) {
      res.status(400).json({});
    }
  }
}
